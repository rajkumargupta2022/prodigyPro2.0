import { useNavigate } from "react-router-dom";
import HDFC from "../assets/img/icons/hdfc.svg";

function Orders() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="p-md-4 p-3 shadow-sm bg-white border-0 rounded-4 mb-2"
        onClick={() => navigate("/order-timeline")}
      >
        <div className="row justify-content-between">
          <div className="col-lg-8 col-md-6 col-12 py-2">
            <div className="d-flex">
              <img src={HDFC} alt="Image not found" />
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
          <div className="col-lg-4 col-md-6 col-12 py-2 text-md-end text-start">
            <span className="failed-badge">Buy Failed</span>
          </div>
        </div>
        <hr className="fw-light text-secondary" />
        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">Order Date</span>
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

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
        onClick={() => navigate("/order-timeline")} >

        <div className="row justify-content-between">
          <div className="col-lg-8 col-md-6 col-12 py-2">
            <div className="d-flex">
              <img src={HDFC} alt="Image not found" />
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
          <div className="col-lg-4 col-md-6 col-12 py-2 text-md-end text-start">
            <span className="success-badge">Buy Successful</span>
          </div>
        </div>

        <hr className="fw-light text-secondary" />
        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">Order Date</span>
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

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
        onClick={() => navigate("/order-timeline")} >

        <div className="row justify-content-between">
          <div className="col-lg-8 col-md-6 col-12 py-2">
            <div className="d-flex">
              <img src={HDFC} alt="Image not found" />
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
          <div className="col-lg-4 col-md-6 col-12 py-2 text-md-end text-start">
            <span className="pending-badge">Buy Pending</span>
          </div>
        </div>

        <hr className="fw-light text-secondary" />
        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">Order Date</span>
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
    </>
  );
}

export default Orders;
