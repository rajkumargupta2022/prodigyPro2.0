import { ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { postRequest } from "../../services/Api/HandleApi";
import { endPoints, imageUrl } from "../../services/utils/urls";
import { installmentDetailKeys, installmentDetailRes } from "../data-interfaces/orders";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import { fetchAdminUser } from "../../services/user/adminUser";

function InstallmentDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const [installmentDetails, setInstallmentDetails] = useState<installmentDetailKeys>()


  useEffect(() => {
    if (location.state?.accord_product_code) {
      console.log("location.state?.accord_product_code", location.state);
      fetchInstallmentDetails()
    } else {
      navigate("/dashboard")
    }
  }, [])

  const fetchInstallmentDetails = async () => {
    const adminUser = fetchAdminUser()
    const reqBody = {
      ucc:adminUser?.ucc,
      installment_id: location.state.installment_unique_no,
      folio_number: location.state.folio_number,
      accord_product_code: location.state.accord_product_code,
      page: 1,
      limit: 10,
      DESC: location.state?.DESC,
      NATURE: location.state?.NATURE,
    }
    const res = await postRequest<installmentDetailRes>(endPoints.getInstallmentDetails, reqBody)
    if (res.success) {
      setInstallmentDetails(res.data)
    }
  }

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h4>
        <ArrowLeft className="crPointer" size={20} onClick={() => navigate(-1)} /> {location.state?.from === "orders" ? "Order Details" : "Transaction Details"}
      </h4>
      <hr className="fw-light text-secondary " />

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
  <span className="fw-bold">Order Summary</span>

  {installmentDetails?.installment_amount !== null &&
    installmentDetails?.installment_amount !== undefined && (
      <div className="d-flex justify-content-between mb-2 mt-3">
        <span className="text-secondary">INVESTMENT VALUE</span>
        <span className="value-font2">
          ₹{installmentDetails.installment_amount}
        </span>
      </div>
    )}

  {installmentDetails?.installment_no !== null &&
    installmentDetails?.installment_no !== undefined &&
    installmentDetails?.installment_no !== "" && (
      <div className="d-flex justify-content-between mb-2">
        <span className="text-secondary">INVESTMENT NUMBER</span>
        <span className="value-font2">
          {installmentDetails.installment_no}
        </span>
      </div>
    )}

  {installmentDetails?.installment_id !== null &&
    installmentDetails?.installment_id !== undefined &&
    installmentDetails?.installment_id !== "" && (
      <div className="d-flex justify-content-between mb-2">
        <span className="text-secondary">TRANSACTION ID</span>
        <span className="value-font2">
          {installmentDetails.installment_id}
        </span>
      </div>
    )}

  {installmentDetails?.installment_date !== null &&
    installmentDetails?.installment_date !== undefined &&
    installmentDetails?.installment_date !== "" && (
      <div className="d-flex justify-content-between mb-2">
        <span className="text-secondary">TRANSACTION DATE</span>
        <span className="value-font2">
          {installmentDetails.installment_date}
        </span>
      </div>
    )}

  {installmentDetails?.bank_name && (
    <div className="d-flex justify-content-between mb-2">
      <span className="text-secondary">BANK NAME</span>
      <span className="value-font2">
        {installmentDetails.bank_name
          ?.toLowerCase()
          ?.split(" ")
          ?.map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1)
          )
          ?.join(" ")}

        {installmentDetails?.bank_acc_no &&
          ` ****${installmentDetails.bank_acc_no.slice(-4)}`}
      </span>
    </div>
  )}

  {installmentDetails?.transaction_nav_price !== null &&
    installmentDetails?.transaction_nav_price !== undefined  && (
      <div className="d-flex justify-content-between mb-2">
        <span className="text-secondary">NAV PRICE</span>
        <span className="value-font2">
          ₹{installmentDetails.transaction_nav_price}
        </span>
      </div>
    )}

  {installmentDetails?.transaction_nav_date && (
    <div className="d-flex justify-content-between mb-2">
      <span className="text-secondary">NAV DATE</span>
      <span className="value-font2">
        {dateInStringNumber(
          installmentDetails.transaction_nav_date
        )}
      </span>
    </div>
  )}

  {installmentDetails?.folio_number !== null &&
    installmentDetails?.folio_number !== undefined &&
    installmentDetails?.folio_number !== "" && (
      <div className="d-flex justify-content-between mb-2">
        <span className="text-secondary">FOLIO NUMBER</span>
        <span className="value-font2">
          {installmentDetails.folio_number}
        </span>
      </div>
    )}
</div>
    </main>
  );
}

export default InstallmentDetails;
