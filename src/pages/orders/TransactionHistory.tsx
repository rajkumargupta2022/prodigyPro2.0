import NavBar from "../../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { postRequestSimple } from "../../services/Api/HandleApi";
import { endPoints, imageUrl } from "../../services/utils/urls";
import Paginations from "../../components/Pagination";
import {
  transactionHistoryKeys,
  transactionHistoryRes,
} from "../data-interfaces/orders";
import { fetchAdminUser } from "../../services/user/adminUser";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import { TransactionSkeletonCard } from "./Skeleton";


const TransactionHistory = () => {
  const navigate = useNavigate();

  // Get query parameters from URL
  const [searchParams] = useSearchParams();

  const accordProductCode = searchParams.get("accord_product_code");
  const folioNumber = searchParams.get("folio_number");

  const [transactionHistoryList, setTransactionHistoryList] = useState<
    transactionHistoryKeys[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  /*
   * Example URL:
   *
   * /transaction-history?accord_product_code=1131&folio_number=35661069/33
   *
   * accordProductCode = "1131"
   * folioNumber = "35661069/33"
   */

  useEffect(() => {
    if (accordProductCode && folioNumber) {
      fetchTransactionHistory();
    }
  }, [page, accordProductCode, folioNumber]);

  const fetchTransactionHistory = async () => {
    try {
      setLoading(true);
      const adminUser = fetchAdminUser();

      const reqBody = {
        ucc: adminUser.ucc,
        accord_product_code: Number(accordProductCode),
        folio_number: folioNumber,
      };

      const res = await postRequestSimple<transactionHistoryRes>(
        endPoints.getTransactionHistory,
        reqBody
      );

      if (res.success) {
        setLimit(res.data.length);
        setTransactionHistoryList(res.data);
      } else {
        setTransactionHistoryList([]);
      }
    } catch (err) {
      console.error("Transaction history error:", err);
      setTransactionHistoryList([]);
    } finally {
      setLoading(false);
    }
  };

  const detailPage = (item: transactionHistoryKeys) => {
    if (item.transaction_type === "SIP") {
      navigate("/transaction-details", {
        state: item,
      });
    } else if (item.transaction_type === "PURCHASE") {
      navigate("/purchase-details", {
        state: item,
      });
    } else if (item.transaction_type === "SWP") {
      navigate("/swp-order", {
        state: item,
      });
    }
    else if (item.transaction_type === "STP Out" || item.transaction_type === "STP In") {
      navigate("/stp-orders-details", {
        state: {...item,from:"transactions",accord_product_code:item.accord_product_code,folio_number:item.folio_number},
      });
    }
    else if (item.transaction_type === "SWITCH Out" || item.transaction_type === "SWITCH In") {
   
      navigate("/switch-orders-details", {
        state: {accord_product_code:item.accord_product_code, folio_number:item.folio_number,transaction_id:item?.transaction_id, from:"transactions"},
      });
    } else if (item.transaction_type === "REDEMPTION") {
      navigate("/redemption-details", {
        state: item,
      });
    }
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

          {/* Heading */}
          <div className="row">
            <div className="col">
              <h4>Transaction History</h4>
            </div>
          </div>
        </div>

        {/* ── Skeleton Loader ── */}
        {loading && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <TransactionSkeletonCard key={i} />
            ))}
          </>
        )}

        {/* Transaction List */}
        {!loading && transactionHistoryList.length > 0 ? (
          transactionHistoryList.map((item) => {
            return (
              <div
                key={`${item.folio_number}-${item.scheme_name}`}
                className="p-4 m-4 shadow-sm bg-white border-0 rounded-4 mb-3 crPointer"
                onClick={() => detailPage(item)}
              >
                <div className="row justify-content-between">
                  {/* Scheme Details */}
                  <div className="col-lg-8 col-md-8 col-12 py-2">
                    <div className="d-flex">
                      <img
                        src={`${imageUrl}${item?.accord_amc_code}.png`}
                        alt={item.scheme_name || "Scheme"}
                        className="rounded me-2"
                        style={{
                          width: 40,
                          height: 40,
                        }}
                      />

                      <div
                        className="ms-2"
                        style={{
                          flex: 4,
                        }}
                      >
                        <h6 className="mb-0">
                          {item.scheme_name}
                        </h6>

                        <span className="text-secondary small">
                          Folio:{" "}
                          <span className="fw-semibold">
                            {item.folio_number || "N/A"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Type */}
                  <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">
                    <span className="success-badge">
                      {item.transaction_type === "SIP"
                        ? "SIP"
                        : item.transaction_type === "PURCHASE"
                          ? "One-time"
                          : item.transaction_type}
                    </span>
                  </div>
                </div>

                <hr className="text-secondary mt-2 mb-2" />

                {/* Transaction Information */}
                <div className="d-flex justify-content-between">
                  {/* Last Order */}
                  <div>
                    <span className="text-secondary small">
                      Last Order
                    </span>

                    <br />

                    <span className="fw-semibold">
                      {dateInStringNumber(item.order_date)}
                    </span>
                  </div>

                  {/* Next SIP */}
                  <div>
                    {item?.next_sip_date ? (
                      <>
                        <span className="text-secondary small">
                          Next SIP
                        </span>

                        <br />

                        <span className="fw-semibold">
                          {dateInStringNumber(item.next_sip_date)}
                        </span>
                      </>
                    ) : null}
                  </div>

                  {/* Amount */}
                  <div>
                    <span className="text-secondary small">
                      Amount
                    </span>

                    <br />

                    <span className="fw-semibold">
                      ₹
                      {item.installment_amount ||
                        item.redemption_amount ||
                        item.order_amount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          !loading && (
            <div className="text-center py-5">
              No data available
            </div>
          )
        )}

        {/* Pagination */}
        {!loading && transactionHistoryList.length > 9 && (
          <Paginations
            totalRecords={transactionHistoryList.length}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
          />
        )}
      </div>
    </>
  );
};

export default TransactionHistory;
