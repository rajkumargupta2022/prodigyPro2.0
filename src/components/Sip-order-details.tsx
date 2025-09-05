import { ArrowLeft } from "react-bootstrap-icons";
import HDFC from "../assets/img/icons/hdfc.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAdminUser } from "../services/user/adminUser";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { sipOrderDetailKey, sipOrderDetailRes } from "../pages/data-interfaces/orders";


function SIPOrderDetails({ backButton }: { backButton: any }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [page,setPage] = useState<number>(1)
  const [limit,setLimit] = useState<number>(10)
  const [orderDetail , setOrderDetail] = useState<any>()
  useEffect(() => {
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
     setOrderDetail({})
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
          <span className="value-font2">₹5,999.9</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">SIP INVESTED</span>
          <span className="value-font2">₹80,000</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">LINKED BANK ACCOUNT</span>
          <span className="value-font2">HDFC Bank</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">SIP REGISTERED ON</span>
          <span className="value-font2">14 jan 2025</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">FOLIO NUMBER</span>
          <span className="value-font2">8685425241</span>
        </div>
      </div>

      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
      // onClick={() => activeInactive("order-timeline")}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 style={{ margin: 0 }}>3rd SIP Instalment</h6>
          </div>
          <span className="success-badge">Sucessful</span>
        </div>
        <hr className="fw-light text-secondary" />

        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">SIP Date</span>
            <br />
            <span className="value-font2">14 Feb 2025</span>
          </div>

          <div>
            <span className="text-secondary">Units</span>
            <br />
            <span className="value-font2">
              11.62 <span className="fw-light">(NAV:₹84.04)</span>
            </span>
          </div>

          <div>
            <span className="text-secondary">Amount</span>
            <br />
            <span className="value-font2">₹4.5K</span>
          </div>
        </div>
      </div>

      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
      // onClick={() => activeInactive("order-timeline")}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 style={{ margin: 0 }}>2nd SIP Instalment</h6>
          </div>
          <span className="success-badge">Sucessful</span>
        </div>
        <hr className="fw-light text-secondary" />

        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">SIP Date</span>
            <br />
            <span className="value-font2">14 Feb 2025</span>
          </div>

          <div>
            <span className="text-secondary">Units</span>
            <br />
            <span className="value-font2">
              11.62 <span className="fw-light">(NAV:₹84.04)</span>
            </span>
          </div>

          <div>
            <span className="text-secondary">Amount</span>
            <br />
            <span className="value-font2">₹4.5K</span>
          </div>
        </div>
      </div>

      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
      // onClick={() => activeInactive("order-timeline")}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 style={{ margin: 0 }}>1st SIP Instalment</h6>
          </div>
          <span className="success-badge">Sucessful</span>
        </div>
        <hr className="fw-light text-secondary" />

        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">SIP Date</span>
            <br />
            <span className="value-font2">14 Feb 2025</span>
          </div>

          <div>
            <span className="text-secondary">Units</span>
            <br />
            <span className="value-font2">
              11.62 <span className="fw-light">(NAV:₹84.04)</span>
            </span>
          </div>

          <div>
            <span className="text-secondary">Amount</span>
            <br />
            <span className="value-font2">₹4.5K</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SIPOrderDetails;
