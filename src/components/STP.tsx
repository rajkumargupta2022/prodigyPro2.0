import SBI from "../assets/img/icons/sbi.png";
import DSP from "../assets/img/icons/dsp.svg";
import { ArrowDown } from "react-bootstrap-icons";

function STP({ activeInactive }: { activeInactive: any }) {
  return (
    <>
      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
        onClick={() => activeInactive("stp-order")}
      >
        <div className="d-flex justify-content-around">
          <img src={SBI} alt="Image not found" />
          <div className="ms-2" style={{ flex: 4 }}>
            <h6 style={{ margin: 0 }}>
              Canara Recobo Multi Cap Fund - Regular (G)
            </h6>
            <span className="text-secondary">
              Folio : <span className="value-font">3232553235</span>
            </span>
          </div>
          <span className="success-badge">Active</span>
        </div>

        <div className="position-relative text-center my-4">
          <div className="border-top w-100"></div>
          <button className="switch-btn">
            <ArrowDown size={10} /> SWITCH TO
          </button>
        </div>

        <div className="d-flex justify-content-around">
          <img src={SBI} alt="Image not found" />
          <div className="ms-2" style={{ flex: 4 }}>
            <h6 style={{ margin: 0 }}>
              Canara Recobo Multi Cap Fund - Regular (G)
            </h6>
            <span className="text-secondary">
              Folio : <span className="value-font">3232553235</span>
            </span>
          </div>
        </div>

        <hr className="fw-light text-secondary" />

        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">Next SIP Date</span>
            <br />
            <span className="value-font2">14 Feb 2025</span>
          </div>

          <div className="text-center">
            <span className="text-secondary">Transfer Mode</span>
            <br />
            <span className="value-font2">4</span>
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
        onClick={() => activeInactive("stp-order")}
      >
        <div className="d-flex justify-content-around">
          <img src={DSP} alt="Image not found" />
          <div className="ms-2" style={{ flex: 4 }}>
            <h6 style={{ margin: 0 }}>
              Canara Recobo Multi Cap Fund - Regular (G)
            </h6>
            <span className="text-secondary">
              Folio : <span className="value-font">3232553235</span>
            </span>
          </div>
          <span className="success-badge">Active</span>
        </div>

        <div className="position-relative text-center my-4">
          <div className="border-top w-100"></div>
          <button className="switch-btn">
            <ArrowDown size={10} /> SWITCH TO
          </button>
        </div>

        <div className="d-flex justify-content-around">
          <img src={DSP} alt="Image not found" />
          <div className="ms-2" style={{ flex: 4 }}>
            <h6 style={{ margin: 0 }}>
              Canara Recobo Multi Cap Fund - Regular (G)
            </h6>
            <span className="text-secondary">
              Folio : <span className="value-font">3232553235</span>
            </span>
          </div>
        </div>

        <hr className="fw-light text-secondary" />

        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">Next SIP Date</span>
            <br />
            <span className="value-font2">14 Feb 2025</span>
          </div>

          <div className="text-center">
            <span className="text-secondary">Transfer Mode</span>
            <br />
            <span className="value-font2">4</span>
          </div>

          <div>
            <span className="text-secondary">Amount</span>
            <br />
            <span className="value-font2">₹4.5K</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default STP;
