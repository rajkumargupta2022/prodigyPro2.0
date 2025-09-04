import { useNavigate } from "react-router-dom";
import SBI from "../assets/img/icons/sbi.png";

function SIP() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
        onClick={() => navigate("/sip-order")}
      >

        <div className="row justify-content-between">
          <div className="col-lg-8 col-md-8 col-12 py-2">
            <div className="d-flex">
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
          </div>
          <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">
            <span className="failed-badge">Failed</span>
          </div>
        </div>
        <hr className="fw-light text-secondary mt-1 mb-1" />
        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">Next SIP Date</span>
            <br />
            <span className="value-font2">14 Feb 2025</span>
          </div>

          <div className="text-center">
            <span className="text-secondary">Instalment No</span>
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
        onClick={() => navigate("/sip-order")}
      >
        <div className="row justify-content-between">
          <div className="col-lg-8 col-md-8 col-12 py-2">
            <div className="d-flex">
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
          </div>
          <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">
           <span className="success-badge">Active</span>
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
            <span className="text-secondary">Instalment No</span>
            <br />
            <span className="value-font2">-</span>
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
        onClick={() => navigate("/sip-order")}
      >





        <div className="row justify-content-between">
          <div className="col-lg-8 col-md-8 col-12 py-2">
            <div className="d-flex">
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
          </div>
          <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">
           <span className="pending-badge">Pending</span>
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
            <span className="text-secondary">Instalment No</span>
            <br />
            <span className="value-font2">-</span>
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

export default SIP;
