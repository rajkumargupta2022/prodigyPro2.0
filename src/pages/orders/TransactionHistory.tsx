import NavBar from "../../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { postRequestSimple } from "../../services/Api/HandleApi";
import { endPoints, imageUrl } from "../../services/utils/urls";
import {
  transactionHistoryKeys,
  transactionHistoryRes,
} from "../data-interfaces/orders";
import { fetchAdminUser } from "../../services/user/adminUser";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import { TransactionSkeletonCard } from "./Skeleton";
import InfiniteScrollFooter from "../../components/InfiniteScrollFooter";
import PortfolioEmpty from "../PortfolioEmpty";
import emptyImg from "../../assets/img/empty-img.svg"

const LIMIT = 10;

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
    const title: string = "You Have No Investments Yet";
  const body: string = "Start investing today to build your portfolio and achieve your financial goals.";
  const btnName = "Explore Funds";
  const btnUrl = "/all-mutual-funds"

  const accordProductCode = searchParams.get("accord_product_code");
  const folioNumber = searchParams.get("folio_number");

  const [transactionHistoryList, setTransactionHistoryList] = useState<
    transactionHistoryKeys[]
  >([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // sentinel ref for IntersectionObserver
  const loaderRef = useRef<HTMLDivElement | null>(null);
  // guard: don't fire while already fetching
  const isFetching = useRef<boolean>(false);

  const fetchTransactionHistory = useCallback(
    async (pageNumber: number) => {
      if (isFetching.current) return;
      isFetching.current = true;

      if (pageNumber === 1) setInitialLoading(true);
      else setLoadingMore(true);

      try {
        const adminUser = fetchAdminUser();
        const reqBody = {
          ucc: adminUser.ucc,
          accord_product_code: Number(accordProductCode),
          folio_number: folioNumber,
          page: pageNumber,
          limit: LIMIT,
        };

        const res = await postRequestSimple<transactionHistoryRes>(
          endPoints.getTransactionHistory,
          reqBody
        );

        if (res.success) {
          const incoming = res.data ?? [];
          setTransactionHistoryList((prev) =>
            pageNumber === 1 ? incoming : [...prev, ...incoming]
          );
          // if we got fewer records than limit, no more pages
          setHasMore(incoming.length === LIMIT);
        } else {
          if (pageNumber === 1) setTransactionHistoryList([]);
          setHasMore(false);
        }
      } catch (err) {
        if (pageNumber === 1) setTransactionHistoryList([]);
        setHasMore(false);
      } finally {
        if (pageNumber === 1) setInitialLoading(false);
        else setLoadingMore(false);
        isFetching.current = false;
      }
    },
    [accordProductCode, folioNumber]
  );


  useEffect(() => {
    if (accordProductCode && folioNumber) {
      setPage(1);
      setHasMore(true);
      setTransactionHistoryList([]);
      fetchTransactionHistory(1);
    }
  }, [accordProductCode, folioNumber]);


  useEffect(() => {
    if (page > 1) {
      fetchTransactionHistory(page);
    }
  }, [page]);


  useEffect(() => {
    const sentinel = loaderRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching.current) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore]);

  const detailPage = (item: transactionHistoryKeys) => {
    navigate("/transaction-details", {
      state: item,
    });
  };

  return (
    <>
      <NavBar />

      <div className="container pt-2">
        <div className="personal_form_container">
          {/* Breadcrumb */}
          <div className="d-flex my-3">
            <h6
              className="logoBlueColor crPointer"
              onClick={() => navigate("/dashboard")}
            >
              Home{" "}
              <small className="greyColor">
                <ChevronRight className="fs12px bold" /> Transaction History
              </small>
            </h6>
          </div>

        </div>

        {/* ── Initial Skeleton Loader ── */}
        {initialLoading && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <TransactionSkeletonCard key={i} />
            ))}
          </>
        )}

        {/* ── Transaction List ── */}
        {!initialLoading && transactionHistoryList.length > 0 &&
          transactionHistoryList.map((item, idx) => (
         <div
  key={`${item.transaction_id}-${idx}`}
  className="p-4 m-4 shadow-sm bg-white border-0 rounded-4 mb-3 crPointer"
  onClick={() => detailPage(item)}
>
  {/* Scheme Details */}
  <div className="row justify-content-between">
    <div className="col-lg-8 col-md-8 col-12 py-2">
      <div className="d-flex">
        {item?.accord_amc_code && (
          <img
            src={`${imageUrl}${item.accord_amc_code}.png`}
            alt={item.scheme_name || "Scheme"}
            className="rounded me-2"
            style={{ width: 40, height: 40 }}
          />
        )}

        <div className="ms-2" style={{ flex: 4 }}>
          {item?.scheme_name && (
            <h6 className="mb-0">{item.scheme_name}</h6>
          )}

          {item?.folio_number && (
            <span className="text-secondary small">
              Folio:{" "}
              <span className="fw-semibold">
                {item.folio_number}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>

    {/* Transaction Type */}
    {item?.transaction_type && (
      <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">
        <span className="success-badge">
          {item.transaction_type === "PURCHASE"
            ? "One-time"
            : item.transaction_type}
        </span>
      </div>
    )}
  </div>

  {/* Transaction Info */}
  {(item?.last_transaction_date ||
    item?.next_installment_date ||
    item?.transaction_amount !== null &&
      item?.transaction_amount !== undefined) && (
    <>
      <hr className="text-secondary mt-2 mb-2" />

      <div className="d-flex justify-content-between">
        {/* Last Order Date */}
        {item?.last_transaction_date && (
          <div>
            <span className="text-secondary small">
              Last Order
            </span>
            <br />
            <span className="fw-semibold">
              {dateInStringNumber(item.last_transaction_date)}
            </span>
          </div>
        )}

        {/* Next Installment Date */}
        {item?.next_installment_date && (
          <div>
            <span className="text-secondary small">
              Next {item?.transaction_type || "Installment"}
            </span>
            <br />
            <span className="fw-semibold">
              {dateInStringNumber(item.next_installment_date)}
            </span>
          </div>
        )}

        {/* Amount */}
        {item?.transaction_amount !== null &&
          item?.transaction_amount !== undefined && (
            <div>
              <span className="text-secondary small">
                Amount
              </span>
              <br />
              <span className="fw-semibold">
                ₹{Number(item.transaction_amount).toLocaleString("en-IN")}
              </span>
            </div>
          )}
      </div>
    </>
  )}
</div>
          ))
        }

        {/* ── No data ── */}
        {!initialLoading && transactionHistoryList.length === 0 && (
         <PortfolioEmpty images={emptyImg} title={title} body={body} btnName={btnName} btnUrl={btnUrl} />
        )}

        {/* ── Infinite Scroll Footer (spinner + sentinel) ── */}
        <InfiniteScrollFooter
          loading={loadingMore}
          initialLoading={initialLoading}
          hasMore={hasMore}
          itemCount={transactionHistoryList.length}
          loaderRef={loaderRef}
          endMessage=""
        />
      </div>
    </>
  );
};

export default TransactionHistory;
