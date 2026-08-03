import { ArrowDown, ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAdminUser } from "../../services/user/adminUser";
import { postRequest } from "../../services/Api/HandleApi";
import { endPoints, imageUrl } from "../../services/utils/urls";
import { cancelSIPRes, sipOrderDetailKey, sipOrderDetailRes } from "../data-interfaces/orders";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import { getValueInSort } from "../../services/calculation/percentageCalculate";
// import PortfolioEmpty from "../PortfolioEmpty";
import { errorToast, successToast } from "../../services/utils/toast";


function STPOrderDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(50)
  const [orderDetail, setOrderDetail] = useState<any | null>(null);
  useEffect(() => {
    setLimit(50)
    if (location.state?.source_scheme?.accord_product_code || location.state?.accord_product_code) {
      fetchOrderDetails()
    } else {
      navigate("/dashboard")
    }
  }, [page])

  const fetchOrderDetails = async (pageNumber: number = page) => {
    const adminUser = fetchAdminUser()
    if (adminUser?.ucc) {
      let data = location.state
      try {
        const reqBody = {
          ucc: adminUser?.ucc,
          folio_number: data?.folio_number || location.state?.folio_number,
          accord_product_code: data?.accord_product_code || location.state?.accord_product_code,
          page: pageNumber,
          limit
        }
        const res = await postRequest<sipOrderDetailRes>(endPoints.getStpOrdersDetails, reqBody)
        if (res.success) {
          setOrderDetail(res.data)
        } else {
          setOrderDetail(location.state)
        }
      } catch (err) {
        console.log("err", location.state)
        setOrderDetail(location.state)
        setOrderDetail(null)
      } finally {
        setOrderDetail(location.state)
      }
    }

  }

  const getNextOrPreviousPage = (value: number) => {
    const newPage = page + value;
    if (newPage < 1) return;
    if (value > 0 && (orderDetail?.installments?.length ?? 0) < limit) return;

    setPage(newPage);
    fetchOrderDetails(newPage);
  };

  const orderTimeLine = (installment_id: string) => {
    navigate("/order-timeline", { state: { installment_id, folio_number: orderDetail?.folio_number, accord_product_code: orderDetail?.accord_product_code } })
  }
  function getOrdinal(num: number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = num % 100;
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  const cancelSTP = async () => {
    try {
      const adminUser = fetchAdminUser()
      const reqBody = {
        ucc: adminUser?.ucc,
        items: [location.state?.transaction_id]
      }
      const res = await postRequest<cancelSIPRes>(endPoints.cancelStpOrder, reqBody)
      if (res.success) {
        successToast(res.message)
      } else {
        errorToast(res.message)
      }

    } catch (err) {
      errorToast(err)
    }
  }
  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h4>
        <ArrowLeft className="crPointer" size={20} onClick={() => navigate(-1)} />
        {location.state?.from === "orders" ? "STP Order Details" : "STP Transaction Details"}
      </h4>
      <hr className="fw-light text-secondary " />

      {/* <div className="d-flex mb-3 align-items-center justify-content-between"> */}
        <div className="d-flex mb-1 align-items-center">
          <img src={imageUrl + orderDetail?.source_scheme?.accord_amc_code + ".png"} height={40} width={40} className="rounded" alt="image not found" />
          <span className="fw-bold ms-2">{orderDetail?.source_scheme?.scheme_name}</span>
        </div>
        <div className=" align-items-center mb-1">
          <div className='rounded-4 lightTrxBtnSTP p-1'><ArrowDown /> STP </div>
        </div>
        <div className="d-flex  mb-3 align-items-center">
          <img src={imageUrl + orderDetail?.target_scheme?.accord_amc_code + ".png"} height={40} width={40} className="rounded" alt="image not found" />
          <span className="fw-bold ms-2">{orderDetail?.target_scheme?.scheme_name}</span>
        </div>

        {location.state?.from !== "orders" && location.state?.status === "ACTIVE" && (
          <button className="btn btn-danger" onClick={cancelSTP}>
            Cancel STP
          </button>
        )}
      {/* </div> */}
      {(orderDetail?.installments?.length ?? 0) > 0 ?
        <>


          <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
            <span className="fw-bold">{location.state?.from === "orders" ? "STP Details" : "Transaction Details"}</span>
            <div className="d-flex justify-content-between mb-2 mt-3">
              <span className="text-secondary">STATUS</span>
              <span className="value-font2">{location.state?.status || "Active"}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">FOLIO NUMBER</span>
              <span className="value-font2">{location.state?.folio_number || "N/A"}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">SIP REGISTERED ON</span>
              <span className="value-font2">{dateInStringNumber(location.state?.sip_start_date)}</span>
            </div>
            {/* <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">SIP</span>
              <span className="value-font2">₹{orderDetail?.installment_amount || 0}</span>
            </div> 
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">AMOUNT INVESTED</span>
              <span className="value-font2">₹{orderDetail?.total_invested || 0}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">TOTAL UNITS</span>
              <span className="value-font2">{orderDetail?.total_units || 0}</span>
            </div>
             <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">NEXT SIP</span>
              <span className="value-font2">{dateInStringNumber(location?.state?.next_sip_date)}</span>
            </div> */}
          </div>
          {(orderDetail?.installments?.length ?? 0) > 0 ? orderDetail?.installments.map((item: any, i: number) => {
            return <div
              className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2 crPointer" key={i}
              onClick={() => orderTimeLine(item.installment_id)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 style={{ margin: 0 }}>{getOrdinal(item.installment)} STP Instalment</h6>
                </div>
                {/* <span className="success-badge">Sucessful</span> */}
              </div>
              <hr className="fw-light text-secondary" />

              <div className="d-flex justify-content-between">
                <div>
                  <span className="text-secondary">STP Date</span>
                  <br />
                  <span className="value-font2">{dateInStringNumber(item.installment_date)}</span>
                </div>

                <div>
                  <span className="text-secondary">Units</span>
                  <br />
                  <span className="value-font2">
                    {item.units_allocated}
                  </span>
                </div>

                <div>
                  <span className="text-secondary">Amount</span>
                  <br />
                  <span className="value-font2">₹{getValueInSort(Number(item?.installment_amount))}</span>
                </div>
              </div>
            </div>
          })

            : ""}
          {(orderDetail?.installments?.length ?? 0) > 0 && (
            <div className="d-flex justify-content-end gap-2 my-2">
              <button
                className="nav-btn"
                disabled={page === 1}
                onClick={() => getNextOrPreviousPage(-1)}
              >
                &laquo; Previous
              </button>

              <button
                className="nav-btn"
                disabled={(orderDetail?.installments?.length ?? 0) < limit}
                onClick={() => getNextOrPreviousPage(1)}
              >
                Next &raquo;
              </button>
            </div>
          )}
        </> : <div className="m-0"><div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
          <span className="fw-bold">{location.state?.from === "orders" ? "STP Details" : "Transaction Details"}</span>
          <div className="d-flex justify-content-between mb-2 mt-3">
            <span className="text-secondary">STATUS</span>
            <span className="value-font2">{location.state?.status}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">FOLIO NUMBER</span>
            <span className="value-font2">{location.state?.folio_number || "N/A"}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">{location.state?.from === "orders" ? "ORDER DATE" : "TRANSACTION DATE"}</span>
            <span className="value-font2">{dateInStringNumber(location.state?.order_date)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">{location.state?.from === "orders" ? "INSTALLMENT VALUE" : "TRANSACTION VALUE"}</span>
            <span className="value-font2">₹{getValueInSort(Number(location.state?.installment_amount))}</span>
          </div>

        </div></div>}
    </main>

  );
}

export default STPOrderDetails;
