import { ArrowLeft } from "react-bootstrap-icons";
import HDFC from "../assets/img/icons/hdfc.svg";

function OrderDetails({ backButton }: { backButton: any }) {
  const steps = [
    { title: "Order Placed", date: "13 Apr 2023, 08:31 AM", completed: true },
    { title: "Pending Order", date: "13 Apr 2023, 08:31 AM", completed: true },
    {
      title: "Order Confirmation",
      date: "13 Apr 2023, 08:31 AM",
      completed: false,
    },
  ];

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} /> Order
        Details
      </h2>
      <hr className="fw-light text-secondary " />

      <div className="d-flex  mb-3 align-items-center">
        <img src={HDFC} alt="image not found" />
        <span className="fw-bold ms-2">HDFC Flexi Cap Fund - Regular (G)</span>
      </div>

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
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
      </div>

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
        <span className="fw-bold">Order Summary</span>
        <div className="d-flex justify-content-between mb-2 mt-3">
          <span className="text-secondary">STATUS</span>
          <span className="fw-bold">Unit Allocated</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">INVESTMENT VALUE</span>
          <span className="fw-bold">₹5,999.9</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">INVESTMENT TYPE</span>
          <span className="fw-bold">SIP</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">TRANSACTION ID</span>
          <span className="fw-bold">32432532535</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">BANK NAME</span>
          <span className="fw-bold">HDFC Bank ****1267</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">PAYMENT MODE</span>
          <span className="fw-bold">Bank Mandate</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">ORDER DATE</span>
          <span className="fw-bold">14 Jan 2025, 11:32:12 AM</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">NAV PRICE</span>
          <span className="fw-bold">₹84.04</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">NAV DATE</span>
          <span className="fw-bold">14 Jan 2025, 11:32:12 AM</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">FOLIO NUMBER</span>
          <span className="fw-bold">23532957394</span>
        </div>
      </div>
    </main>
  );
}

export default OrderDetails;
