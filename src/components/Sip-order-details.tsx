import { ArrowLeft } from "react-bootstrap-icons";
import HDFC from "../assets/img/icons/hdfc.svg";

function SIPOrderDetails({ backButton }: { backButton: any }) {
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
          <span className="fw-bold">Active</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">MONTHLY SIP</span>
          <span className="fw-bold">₹5,999.9</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">SIP INVESTED</span>
          <span className="fw-bold">₹80,000</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">LINKED BANK ACCOUNT</span>
          <span className="fw-bold">HDFC Bank</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">SIP REGISTERED ON</span>
          <span className="fw-bold">14 jan 2025</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">FOLIO NUMBER</span>
          <span className="fw-bold">8685425241</span>
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
            <span className="text-secondary fw-bold text-dark">
              14 Feb 2025
            </span>
          </div>

          <div>
            <span className="text-secondary">Units</span>
            <br />
            <span className="text-secondary fw-bold text-dark">
              11.62 (NAV:₹84.04)
            </span>
          </div>

          <div>
            <span className="text-secondary">Amount</span>
            <br />
            <span className="text-secondary fw-bold text-dark">₹4.5K</span>
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
            <span className="text-secondary fw-bold text-dark">
              14 Feb 2025
            </span>
          </div>

          <div>
            <span className="text-secondary">Units</span>
            <br />
            <span className="text-secondary fw-bold text-dark">
              11.62 (NAV:₹84.04)
            </span>
          </div>

          <div>
            <span className="text-secondary">Amount</span>
            <br />
            <span className="text-secondary fw-bold text-dark">₹4.5K</span>
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
            <span className="text-secondary fw-bold text-dark">
              14 Feb 2025
            </span>
          </div>

          <div>
            <span className="text-secondary">Units</span>
            <br />
            <span className="text-secondary fw-bold text-dark">
              11.62 (NAV:₹84.04)
            </span>
          </div>

          <div>
            <span className="text-secondary">Amount</span>
            <br />
            <span className="text-secondary fw-bold text-dark">₹4.5K</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SIPOrderDetails;
