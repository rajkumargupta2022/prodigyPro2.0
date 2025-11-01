import { ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAdminUser } from "../../services/user/adminUser";
import { postRequest } from "../../services/Api/HandleApi";
import { endPoints, imageUrl } from "../../services/utils/urls";
import { cancelSIPRes,  swpOrderDetailsKeys, swpOrderDetailsRes } from "../data-interfaces/orders";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import { getValueInSort } from "../../services/calculation/percentageCalculate";
import PortfolioEmpty from "../PortfolioEmpty";
import { errorToast, successToast } from "../../services/utils/toast";


function SWPOrderDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(50)
  const [orderDetail, setOrderDetail] = useState<swpOrderDetailsKeys|null>();
  useEffect(() => {
    setLimit(50)
    if (location.state?.accord_amc_code) {
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
          // TODO : replace blank with real ucc
          ucc: "",
          // transaction_id: data.transaction_id,
          folio_number: data?.folio_number || "",
          accord_product_code: data?.accord_product_code,
          page: pageNumber,
          limit
        }
        const res = await postRequest<swpOrderDetailsRes>(endPoints.getSwpOrdersDetails, reqBody)
        if (res.success) {
          setOrderDetail(res.data)
        }
      } catch (err) {
        setOrderDetail(null)
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
    navigate("/swp-installmet-details", { state: { installment_id, folio_number: orderDetail?.folio_number, accord_product_code: orderDetail?.accord_product_code } })
  }
  function getOrdinal(num: number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = num % 100;
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }
    const cancelSIP = async () => {
    try {
      const adminUser = fetchAdminUser()
      const reqBody = {
        ucc: adminUser?.ucc,
        items: [location.state?.sip_registration_no]
      }
      const res = await postRequest<cancelSIPRes>(endPoints.cancelSwpOrder, reqBody)
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
        <ArrowLeft className="crPointer" size={15} onClick={()=>navigate("/all-orders")} />
        SWP Order Details
      </h4>
      <hr className="fw-light text-secondary " />
      {(orderDetail?.installments?.length ?? 0) > 0 ? 
<>

       <div className="d-flex mb-3 align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src={imageUrl + orderDetail?.accord_amc_code + ".png"}
                alt="image not found"
                height={40}
                width={40}
                className="rounded"
              />
              <span className="fw-bold ms-2">{orderDetail?.scheme_name}</span>
            </div>

            <button className="btn btn-danger" onClick={cancelSIP}>Cancel SWP</button>
          </div>

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
        <span className="fw-bold">SIP Details</span>
        <div className="d-flex justify-content-between mb-2 mt-3">
          <span className="text-secondary">MONTHLY SWP</span>
          <span className="value-font2">₹{orderDetail?.installment_amount}</span>
        </div>
          
         <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">SWP REGISTERED ON</span>
          <span className="value-font2">{dateInStringNumber(orderDetail?.swp_start_date)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">FOLIO NUMBER</span>
          <span className="value-font2">{orderDetail?.folio_number || "N/A"}</span>
        </div>
       
       
      </div>
      {(orderDetail?.installments?.length ?? 0) > 0 ? orderDetail?.installments.map((item) => {
        return <div
          className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2 crPointer"
          onClick={() => orderTimeLine(item.installment_id)}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 style={{ margin: 0 }}>{getOrdinal(item.installment)} SWP Instalment</h6>
            </div>
            {/* <span className="success-badge">Sucessful</span> */}
          </div>
          <hr className="fw-light text-secondary" />

          <div className="d-flex justify-content-between">
            <div>
              <span className="text-secondary">SWP Date</span>
              <br />
              <span className="value-font2">{dateInStringNumber(item.installment_date)}</span>
            </div>

            <div>
              <span className="text-secondary">Units</span>
              <br />
              <span className="value-font2">
                {item.units_withdrawn}
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
</>:<div className="m-0"><PortfolioEmpty title={"No Orders Yet"} body={"Your order history will appear here once you start investing. Begin your journey today!"} btnName={"Explore Funds"} btnUrl={"all-mutual-funds"} /></div>}
    </main>

  );
}

export default SWPOrderDetails;
