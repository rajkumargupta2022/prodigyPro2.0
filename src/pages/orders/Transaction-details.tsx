import { ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { fetchAdminUser } from "../../services/user/adminUser";
import { postRequest } from "../../services/Api/HandleApi";
import { endPoints, imageUrl } from "../../services/utils/urls";
import {
  transactionDetailsRes,
  transactionDetailsKeys,
  installmentHistoryRes,
  installmentHistoryKeys,
} from "../data-interfaces/orders";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import { getValueInSort } from "../../services/calculation/percentageCalculate";
import InfiniteScrollFooter from "../../components/InfiniteScrollFooter";

const INSTALLMENT_LIMIT = 10;

function TransactionDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const [orderDetail, setOrderDetail] = useState<transactionDetailsKeys | null>(null);
  const [installments, setInstallments] = useState<installmentHistoryKeys[]>([]);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [installmentLoading, setInstallmentLoading] = useState<boolean>(false);
  const [installmentPage, setInstallmentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetching = useRef<boolean>(false);

  // ── Fetch transaction detail on mount ──
  useEffect(() => {
    const state = location.state;
    if (state?.accord_product_code && state?.folio_number) {
      fetchOrderDetails();
    } else {
      navigate("/transaction-history");
    }
  }, []);

  const fetchOrderDetails = async () => {
    const adminUser = fetchAdminUser();
    if (!adminUser?.ucc) return;
    const data = location.state;
    try {
      setDetailLoading(true);
      const reqBody = {
        ucc: adminUser.ucc,
        transaction_id: data?.transaction_id || "",
        accord_product_code: data?.accord_product_code,
        transaction_type: data?.transaction_type || "",
      };
      const res = await postRequest<transactionDetailsRes>(
        endPoints.getTransactionDetails,
        reqBody
      );
      if (res.success) {
        setOrderDetail(res.data);
        // If has_installment, kick off first installment page
        if (res.data?.has_installment) {
          fetchInstallments(1, res.data);
        }
      }
    } catch {
      setOrderDetail(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const fetchInstallments = async (
    pageNumber: number,
    detail: transactionDetailsKeys | null = orderDetail
  ) => {
    if (isFetching.current) return;
    isFetching.current = true;
    const adminUser = fetchAdminUser();
    const data = location.state;
    const src = detail ?? orderDetail;
    if (!adminUser?.ucc || !src) {
      isFetching.current = false;
      return;
    }
    try {
      if (pageNumber > 1) setInstallmentLoading(true);
      const reqBody = {
        ucc: adminUser.ucc,
        installment_id: data?.transaction_id || "",
        accord_product_code: data?.accord_product_code,
        transaction_type: data?.transaction_type || "",
        page: pageNumber,
        limit: INSTALLMENT_LIMIT,
        NATURE: detail?.NATURE || "",
        DESC: detail?.DESC || "",
        folio: data?.folio_number || "",
      };
      const res = await postRequest<installmentHistoryRes>(
        endPoints.getInstallments,
        reqBody
      );
      if (res.success) {
        const incoming = res.data ?? [];
        setInstallments((prev) =>
          pageNumber === 1 ? incoming : [...prev, ...incoming]
        );
        setHasMore(incoming.length === INSTALLMENT_LIMIT);
      } else {
        setHasMore(false);
      }
    } catch {
      setHasMore(false);
    } finally {
      setInstallmentLoading(false);
      isFetching.current = false;
    }
  };

  // IntersectionObserver for installment infinite scroll
  useEffect(() => {
    const sentinel = loaderRef.current;
    if (!sentinel || !orderDetail?.has_installment) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching.current) {
          const nextPage = installmentPage + 1;
          setInstallmentPage(nextPage);
          fetchInstallments(nextPage);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, installmentPage, orderDetail]);

  const goToInstallmentDetail = (installment_id: string) => {
    navigate("/installment-details", {
      state: {
        installment_id,
        folio_number: orderDetail?.folio_number,
        accord_product_code: orderDetail?.accord_product_code,
        transaction_id: location.state?.transaction_id,
      },
    });
  };

  function getOrdinal(num: number | string) {
    const n = Number(num);
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  const state = location.state;

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h4>
        <ArrowLeft className="crPointer" size={20} onClick={() => navigate(-1)} />
        Transaction Details
      </h4>
      <hr className="fw-light text-secondary" />

      {/* ── Scheme header ── */}
      <div className="d-flex mb-3 align-items-center">
        <img
          src={imageUrl + (state?.accord_amc_code || orderDetail?.accord_amc_code) + ".png"}
          alt="scheme logo"
          height={40}
          width={40}
          className="rounded"
        />
        <span className="fw-bold ms-2">
          {state?.scheme_name || orderDetail?.scheme_name}
        </span>
      </div>

      {/* ── Loading skeleton for detail ── */}
      {detailLoading && (
        <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
          <div className="placeholder-glow">
            <span className="placeholder col-6 mb-2" />
            <span className="placeholder col-8 mb-2" />
            <span className="placeholder col-5" />
          </div>
        </div>
      )}

      {/* ── Transaction Summary Card ── */}
      {!detailLoading && orderDetail && (
        <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-3">
          <span className="fw-bold">Transaction Summary</span>

          <div className="d-flex justify-content-between mb-2 mt-3">
            <span className="text-secondary">TRANSACTION TYPE</span>
            <span className="value-font2">{orderDetail.transaction_type || "—"}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">FOLIO NUMBER</span>
            <span className="value-font2">{orderDetail.folio_number || "N/A"}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">AMOUNT</span>
            <span className="value-font2">
              ₹{getValueInSort(Number(orderDetail.transaction_amount))}
            </span>
          </div>

          {orderDetail.transaction_units !== null && (
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">UNITS</span>
              <span className="value-font2">{orderDetail.transaction_units}</span>
            </div>
          )}

          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">LAST TRANSACTION DATE</span>
            <span className="value-font2">
              {dateInStringNumber(orderDetail.last_transaction_date)}
            </span>
          </div>

          {orderDetail.start_date && (
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">START DATE</span>
              <span className="value-font2">{dateInStringNumber(orderDetail.start_date)}</span>
            </div>
          )}

          {orderDetail.end_date && (
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">END DATE</span>
              <span className="value-font2">{dateInStringNumber(orderDetail.end_date)}</span>
            </div>
          )}

          {orderDetail.next_installment_date && (
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">NEXT INSTALLMENT DATE</span>
              <span className="value-font2">
                {dateInStringNumber(orderDetail.next_installment_date)}
              </span>
            </div>
          )}

          {orderDetail.bank_name && (
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">BANK</span>
              <span className="value-font2">
                {orderDetail.bank_name}{" "}
                {orderDetail.bank_acc_no ? `(${orderDetail.bank_acc_no})` : ""}
              </span>
            </div>
          )}

          {orderDetail.transaction_nav_price > 0 && (
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">NAV</span>
              <span className="value-font2">
                ₹{orderDetail.transaction_nav_price} &nbsp;
                <span className="text-muted small">
                  ({dateInStringNumber(orderDetail.transaction_nav_date)})
                </span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── Installments Section (only if has_installment) ── */}
      {!detailLoading && orderDetail?.has_installment && (
        <>
          <h6 className="fw-bold mt-3 mb-2">Installments</h6>

          {installments.map((item, i) => (
            <div
              key={`${item.installment_id}-${i}`}
              className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2 crPointer"
              onClick={() => goToInstallmentDetail(item.installment_id)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h6 style={{ margin: 0 }}>
                  {getOrdinal(item.installment_no)} Installment
                </h6>
              </div>
              <hr className="fw-light text-secondary" />

              <div className="d-flex justify-content-between">
                <div>
                  <span className="text-secondary">Date</span>
                  <br />
                  <span className="value-font2">
                    {dateInStringNumber(item.installment_date)}
                  </span>
                </div>

                <div>
                  <span className="text-secondary">Units</span>
                  <br />
                  <span className="value-font2">{item.installment_units ?? "—"}</span>
                </div>

                <div>
                  <span className="text-secondary">Amount</span>
                  <br />
                  <span className="value-font2">
                    ₹{getValueInSort(Number(item.installment_amount))}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Infinite scroll footer for installments */}
          <InfiniteScrollFooter
            loading={installmentLoading}
            hasMore={hasMore}
            itemCount={installments.length}
            loaderRef={loaderRef}
            endMessage=""
          />
        </>
      )}

      {/* ── No installments placeholder ── */}
      {!detailLoading && orderDetail && !orderDetail.has_installment && (
        <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
          <span className="text-secondary">No installments for this transaction.</span>
        </div>
      )}
    </main>
  );
}

export default TransactionDetails;