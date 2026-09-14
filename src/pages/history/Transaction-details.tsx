import { ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAdminUser } from "../../services/user/adminUser";
import { postRequest } from "../../services/Api/HandleApi";
import { endPoints, imageUrl } from "../../services/utils/urls";
import {
  transactionDetailsRes,
  transactionDetailsKeys,
  transactionHistoryKeys,
} from "../data-interfaces/orders";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import InvetmentConfirmation from "../../components/InvestmentConfirmation";
import { schemeDeatilDataKeys, schemeDetailType } from "../data-interfaces/transact";
import { errorToast } from "../../services/utils/toast";
import { uccMsg, UccStatusEnum } from "../data/ucc-data";
import { daysAdded } from "../../services/dates/dateFormater";
import { keys, transactionTypeKeys } from "../../services/utils/keys";



function TransactionDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const [orderDetail, setOrderDetail] = useState<transactionDetailsKeys | null>(null);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);

  // Invest More modal state
  const [openInvestPopup, setOpenInvestPopup] = useState<boolean>(false);
  const [schemeList, setSchemeList] = useState<schemeDeatilDataKeys[]>([]);
  const [sipDateList, setSipDateList] = useState<number[]>([]);
  const [schemeLoading, setSchemeLoading] = useState<boolean>(false);

  // ── Fetch transaction detail on mount ──
  useEffect(() => {
    const state = location.state as transactionHistoryKeys;
    if (state?.accord_product_code && state?.folio_number) {
      fetchOrderDetails();
    } else {
      navigate("/transaction-history");
    }
  }, []);

  const fetchOrderDetails = async () => {
  const adminUser = fetchAdminUser();
    if (!adminUser?.ucc) return;
    const data = location.state as transactionHistoryKeys;
    try {
      setDetailLoading(true);
      const reqBody = {
        ucc: adminUser.ucc,
        transaction_id: data?.transaction_id || "",
        accord_product_code: data?.accord_product_code,
        // transaction_type: data?.transaction_type || "",
        last_transaction_date: data?.transaction_date || "",
        transaction_units: data?.transaction_units || 0,
        folio: data?.folio_number || "",
      };
      const res = await postRequest<transactionDetailsRes>(
        endPoints.getTransactionDetails,
        reqBody
      );
      if (res.success) {
        setOrderDetail(res.data);
      }
    } catch {
      setOrderDetail(null);
    } finally {
      setDetailLoading(false);
    }
  };

  // ── Check if transaction type is SIP or PURCHASE ──
  const isSipOrPurchase = (): boolean => {
    const txType = (orderDetail?.transaction_type || (location.state as transactionHistoryKeys)?.transaction_type || "").toUpperCase();
    return txType === "SIP" || txType === "PURCHASE";
  };

  // ── Fetch scheme details for Invest More ──
  const fetchSchemeDetails = async () => {
    const productCode = orderDetail?.accord_product_code || (location.state as transactionHistoryKeys)?.accord_product_code;
    if (!productCode) return;

    try {
      setSchemeLoading(true);
      const res = await postRequest<schemeDetailType>(
        endPoints.getSchemeDetails,
        { productcode: productCode }
      );

      if (res?.data && res.data.length > 0) {
        const updated = res.data.map((obj) => ({
          ...obj,
          firstSIPToday: true,
          to_date: "",
          from_date: "",
          mandateId: "",
          amount: 0,
          totalAmount: 0,
          start_date: daysAdded(7, obj.sipDateList),
        }));
        setSchemeList(updated);
        setSipDateList(res.data[0].sipDateList || []);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setSchemeLoading(false);
    }
  };

  // ── Handle Invest More button click ──
  const handleInvestMore = async () => {
    const uccStatus = localStorage.getItem("uccStatus");
    if (uccStatus !== UccStatusEnum.ACTIVE) {
      errorToast(uccMsg.uccUpdateMsg);
      return;
    }

    const success = await fetchSchemeDetails();
    if (success) {
      setOpenInvestPopup(true);
    } else {
      errorToast("Unable to fetch scheme details. Please try again.");
    }
  };

  const state = location.state;

  const fundDetails = (item: transactionDetailsKeys) => {
    navigate("/fund-details?productcode=" + item?.accord_product_code, { state: { ...item, fromPortfolio: false } })
  }

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h4>
        <ArrowLeft className="crPointer" size={20} onClick={() => navigate(-1)} />
        Transaction Details
      </h4>
      <hr className="fw-light text-secondary" />

      {/* ── Scheme header ── */}
      <div className="d-flex mb-3 align-items-center" onClick={() => fundDetails(orderDetail as transactionDetailsKeys)}>
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

          {orderDetail?.transaction_amount && (
            <div className="d-flex justify-content-between mb-2 mt-3">
              <span className="text-secondary">TRANSACTION VALUE</span>
              <span className="value-font2">
                {orderDetail.transaction_amount}
              </span>
            </div>
          )}

          {orderDetail?.transaction_type && (
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">TRANSACTION TYPE</span>
              <span className="value-font2">
                {/* {(orderDetail?.transaction_type?.toLocaleLowerCase()) === keys?.purchase ? keys.oneTime : orderDetail?.transaction_type} */}
                 {transactionTypeKeys[orderDetail?.transaction_type as keyof typeof transactionTypeKeys]
                                        ?? orderDetail?.transaction_type}
              </span>
            </div>
          )}

          {orderDetail?.transaction_id && (
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">TRANSACTION ID</span>
              <span className="value-font2">
                {orderDetail.transaction_id}
              </span>
            </div>
          )}

          {orderDetail?.transaction_date && (
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">TRANSACTION DATE</span>
              <span className="value-font2">
                {dateInStringNumber(orderDetail?.transaction_date)}
              </span>
            </div>
          )}

          {orderDetail?.bank_name && (
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">BANK NAME</span>
              <span className="value-font2">
                {orderDetail.bank_name
                  ?.toLowerCase()
                  ?.split(" ")
                  ?.map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  ?.join(" ")}
                {orderDetail?.bank_acc_no &&
                  ` ****${orderDetail.bank_acc_no.slice(-4)}`}
              </span>
            </div>
          )}


       

          
       

          {orderDetail?.transaction_nav_price > 0 && (
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">NAV PRICE</span>
              <span className="value-font2">
                ₹{orderDetail.transaction_nav_price}
              </span>
            </div>
          )}

          {orderDetail?.transaction_nav_date && (
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">NAV DATE</span>
              <span className="value-font2">
                {dateInStringNumber(orderDetail.transaction_nav_date)}
              </span>
            </div>
          )}
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">
                FOLIO NUMBER
              </span>
              <span className="value-font2">
                {orderDetail.folio_number||"N/A"}
              </span>
            </div>
        </div>
      )}

      {/* ── Invest More Button — only shown for SIP or PURCHASE ── */}
      {!detailLoading && orderDetail && isSipOrPurchase() && (
        <div className="text-end">
          <button
            type="button"
            className="customButton px-3 mt-1"
            onClick={handleInvestMore}
            disabled={schemeLoading}
          >
            {schemeLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Loading...
              </>
            ) : (
              "Invest More"
            )}
          </button>
        </div>
      )}

      {/* ── Investment Confirmation Modal ── */}
      {schemeList.length > 0 && (
        <InvetmentConfirmation
          show={openInvestPopup}
          setShow={setOpenInvestPopup}
          schemeList={schemeList}
          setSchemeList={setSchemeList}
          sipDateList={sipDateList}
          from={"portfolio"}
          transactionType={orderDetail?.transaction_type || (location.state as transactionHistoryKeys)?.transaction_type}
        />
      )}
    </main>
  );
}

export default TransactionDetails;