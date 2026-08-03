import { ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { postRequest } from "../../services/Api/HandleApi";
import { endPoints, imageUrl } from "../../services/utils/urls";
import { swpInstallmentDetailsRes, swpInstallmetDetailKeys } from "../data-interfaces/orders";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import PortfolioEmpty from "../PortfolioEmpty";

function SwpInstallmentDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const [installmentDetails, setInstallmentDetails] = useState<swpInstallmetDetailKeys | null>()
  // const steps = [
  //   { title: "Order Placed", date: "13 Apr 2023, 08:31 AM", completed: true },
  //   { title: "Pending Order", date: "13 Apr 2023, 08:31 AM", completed: true },
  //   {
  //     title: "Order Confirmation",
  //     date: "13 Apr 2023, 08:31 AM",
  //     completed: false,
  //   },
  // ];

  useEffect(() => {
    if (location.state?.accord_product_code) {
      fetchInstallmentDetails()
    } else {
      navigate("/dashboard")
    }
  }, [])

  const fetchInstallmentDetails = async () => {
    const reqBody = {
      installment_id: location.state.installment_id,
      folio_number: location.state.folio_number,
      accord_product_code: location.state.accord_product_code,
      page: 1,
      limit: 10
    }
    const res = await postRequest<swpInstallmentDetailsRes>(endPoints.getSwpInstallmentDetails, reqBody)
    if (res.success) {
      setInstallmentDetails(res.data)
    }
  }

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h4>
        <ArrowLeft className="crPointer" size={20} onClick={() => navigate(-1)} /> {location?.state?.from === "orders" ? "Order Details" : "Transaction Details"}
      </h4>
      <hr className="fw-light text-secondary " />
      {installmentDetails?.accord_amc_code ? <>
        <div className="d-flex  mb-3 align-items-center">
          <img src={imageUrl + installmentDetails?.accord_amc_code + ".png"} alt="image not found" height={40} width={40} className="rounded" />
          <span className="fw-bold ms-2">{installmentDetails?.scheme_name}</span>
        </div>

        {/* <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
        <span className="fw-bold">Order Status</span>

        <div className="timeline mt-3">
          {steps.map((step, index) => (
            <div key={index} className="timeline-item">
              <div
                className={`timeline-icon ${
                  step.completed ? "completed" : "pending"
                }`}
              >
                ✔
              </div>
              <div className="timeline-content">
                <h6>{step.title}</h6>
                <p>{step.date}</p>
              </div>
              {index !== steps.length - 1 && (
                <div className="timeline-line"></div>
              )}
            </div>
          ))}
        </div>
      </div> */}

        <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
          <span className="fw-bold">{location?.state?.from === "orders" ? "Order Summary" : "Transaction Summary"}</span>
          <div className="d-flex justify-content-between mb-2 mt-3">
            <span className="text-secondary">STATUS</span>
            <span className="value-font2">{installmentDetails?.status}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">{location?.state?.from === "orders" ? "ORDER VALUE" : "TRANSACTION VALUE"}</span>
            <span className="value-font2">₹{installmentDetails?.installment_amount}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">{location?.state?.from === "orders" ? "ORDER TYPE" : "TRANSACTION TYPE"}</span>
            <span className="value-font2">{installmentDetails?.investment_type}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">{location?.state?.from === "orders" ? "ORDER ID" : "TRANSACTION ID"}</span>
            <span className="value-font2">{installmentDetails?.transaction_id}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">BANK NAME</span>
            <span className="value-font2">{installmentDetails?.bank_name?.toLowerCase()
              .split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")} ****{installmentDetails?.bank_account_number.slice(-4)}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">{location?.state?.from === "orders" ? "ORDER DATE" : "TRANSACTION DATE"}</span>
            <span className="value-font2">{dateInStringNumber(installmentDetails?.order_date)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">NAV PRICE</span>
            <span className="value-font2">₹{installmentDetails?.nav_price}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">NAV DATE</span>
            <span className="value-font2">{dateInStringNumber(installmentDetails?.nav_date)}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">FOLIO NUMBER</span>
            <span className="value-font2">{installmentDetails?.folio_number}</span>
          </div>
        </div></> : <PortfolioEmpty title={"No Orders Yet"} body={"Your order history will appear here once you start investing. Begin your journey today!"} btnName={"Explore Funds"} btnUrl={"all-mutual-funds"} />}
    </main>
  );
}

export default SwpInstallmentDetails;
