import { ArrowLeft, ArrowDown } from "react-bootstrap-icons";
import HDFC from "../assets/img/icons/hdfc.svg";

function STPOrderDetails({ backButton }: { backButton: any }) {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} />
        STP Order Details
      </h2>
      <hr className="fw-light text-secondary " />

      <div className="d-flex  mb-3 align-items-center">
        <img src={HDFC} alt="image not found" />
        <span className="fw-bold ms-2">HDFC Flexi Cap Fund - Regular (G)</span>
      </div>

      <div className="position-relative text-center my-4">
        <div className="border-top w-100"></div>
        <button className="switch-btn">
          <ArrowDown size={10} /> SWITCH TO
        </button>
      </div>

      <div className="d-flex  mb-3 align-items-center">
        <img src={HDFC} alt="image not found" />
        <span className="fw-bold ms-2">HDFC Flexi Cap Fund - Regular (G)</span>
      </div>

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
        <span className="fw-bold">STP Details</span>
        <div className="d-flex justify-content-between mb-2 mt-3">
          <span className="text-secondary">STATUS</span>
          <span className="value-font2">Active</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">STP AMOUNT</span>
          <span className="value-font2">₹5,999.9</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">STP REGISTERED ON</span>
          <span className="value-font2">14 Jan 2025</span>
        </div>
      </div>

      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
        // onClick={() => activeInactive("order-timeline")}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 style={{ margin: 0 }}>2nd STP Transfer</h6>
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
            <h6 style={{ margin: 0 }}>1st SIP Transfer</h6>
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

export default STPOrderDetails;
