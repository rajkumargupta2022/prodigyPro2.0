import { ArrowLeft } from "react-bootstrap-icons";
import HDFC from "../assets/img/icons/hdfc.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAdminUser } from "../services/user/adminUser";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { sipOrderDetailKey, sipOrderDetailRes } from "../pages/data-interfaces/orders";
import { dateInStringNumber } from "../services/dates/dateFormater";
import { getValueInSort } from "../services/calculation/percentageCalculate";


function SIPOrderDetails({ backButton }: { backButton: any }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [page,setPage] = useState<number>(1)
  const [limit,setLimit] = useState<number>(10)
  const [orderDetail , setOrderDetail] = useState<sipOrderDetailKey| null>(null);
  useEffect(() => {
    setLimit(1)
    setPage(1)
    if (location.state?.accord_amc_code) {
      fetchOrderDetails()
    } else {
      navigate("/dashboard")
    }
  }, [])

  const fetchOrderDetails =async () => {
    const adminUser  =  fetchAdminUser()
    if(adminUser?.ucc){
      let data = location.state
try {
      const reqBody = {
        ucc: adminUser.ucc,
        transaction_id: data.transaction_id,
        folio_number: data.folio_number,
        accord_product_code: data.accord_product_code,
        page,
        limit
      }
      const res = await postRequest<sipOrderDetailRes>(endPoints.getSipOrdersDetails,reqBody)
      if(res.success){
        setOrderDetail(res.data)
      }
    } catch (err) {
     setOrderDetail(null)
    }
    }
    
  }


  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} />
        SIP Order Details
      </h2>
      <hr className="fw-light text-secondary " />

      <div className="d-flex  mb-3 align-items-center">
        <img src={HDFC} alt="image not found" />
        <span className="fw-bold ms-2">HDFC Flexi Cap Fund - Regular (G)</span>
      </div>

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
        <span className="fw-bold">SIP Details</span>
        <div className="d-flex justify-content-between mb-2 mt-3">
          <span className="text-secondary">STATUS</span>
          <span className="value-font2">Active</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">MONTHLY SIP</span>
          <span className="value-font2">₹{orderDetail?.installment_amount}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">SIP INVESTED</span>
          <span className="value-font2">₹{orderDetail?.total_invested}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">LINKED BANK ACCOUNT</span>
          <span className="value-font2">HDFC Bank</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">SIP REGISTERED ON</span>
          <span className="value-font2">{dateInStringNumber(orderDetail?.sip_start_date)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">FOLIO NUMBER</span>
          <span className="value-font2">{orderDetail?.folio_number}</span>
        </div>
      </div>
    {orderDetail?.installments?.length ?? 0 > 0 ? orderDetail?.installments.map((item)=>{
       return <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
      // onClick={() => activeInactive("order-timeline")}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 style={{ margin: 0 }}>{item.installment}rd SIP Instalment</h6>
          </div>
          <span className="success-badge">Sucessful</span>
        </div>
        <hr className="fw-light text-secondary" />

        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">SIP Date</span>
            <br />
            <span className="value-font2">{dateInStringNumber(item.installment_date)}</span>
          </div>

          <div>
            <span className="text-secondary">Units</span>
            <br />
            <span className="value-font2">
              {item.units_allocated} <span className="fw-light">(NAV:₹84.04)</span>
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
      
:"" }
    

    </main>
  );
}

export default SIPOrderDetails;
