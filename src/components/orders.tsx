import HDFC from "../assets/img/icons/hdfc.svg";

function Orders({ activeInactive }: { activeInactive: any }) {
  return (
    <>
      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
        onClick={() => activeInactive("order-timeline")}
      >
        <div className="d-flex justify-content-around">
          <img src={HDFC} alt="Image not found" />
          <div className="ms-2" style={{ flex: 4 }}>
            <h6 style={{ margin: 0 }}>
              Canara Recobo Multi Cap Fund - Regular (G)
            </h6>
            <span className="text-secondary">
              Folio : <span className="fw-bold text-dark">3232553235</span>
            </span>
          </div>
          <span className="failed-badge">Buy Failed</span>
        </div>
        <hr className="fw-light text-secondary" />
        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">Order Date</span>
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

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
        <div className="d-flex justify-content-around">
          <img src={HDFC} alt="Image not found" />
          <div className="ms-2" style={{ flex: 4 }}>
            <h6 style={{ margin: 0 }}>
              Canara Recobo Multi Cap Fund - Regular (G)
            </h6>
            <span className="text-secondary">
              Folio : <span className="fw-bold text-dark">3232553235</span>
            </span>
          </div>
          <span className="success-badge">Buy Successful</span>
        </div>
        <hr className="fw-light text-secondary" />
        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">Order Date</span>
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

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
        <div className="d-flex justify-content-around">
          <img src={HDFC} alt="Image not found" />
          <div className="ms-2" style={{ flex: 4 }}>
            <h6 style={{ margin: 0 }}>
              Canara Recobo Multi Cap Fund - Regular (G)
            </h6>
            <span className="text-secondary">
              Folio : <span className="fw-bold text-dark">3232553235</span>
            </span>
          </div>
          <span className="pending-badge">Buy Pending</span>
        </div>
        <hr className="fw-light text-secondary" />
        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">Order Date</span>
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
    </>
  );
}

export default Orders;
