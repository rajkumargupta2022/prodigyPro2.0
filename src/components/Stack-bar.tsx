import "bootstrap/dist/css/bootstrap.min.css";

const InvestmentChart = () => {
  return (
    <div className="container text-center">
      <div
        className="row align-items-end"
        style={{ height: "200px", borderBottom: "1px solid #edecf3" }}
      >
        {/* Fixed Deposit */}
        <div className="col-6 d-flex flex-column align-items-center">
          <div
            style={{
              width: "30px",
              height: "60px",
              backgroundColor: "#1a34fe",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          ></div>
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#ccd2ff",
            }}
          ></div>
        </div>

        {/* This Fund */}
        <div className="col-6 d-flex flex-column align-items-center">
          <div
            style={{
              width: "30px",
              height: "80px",
              backgroundColor: "#1a34fe",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          ></div>
          <div
            style={{
              width: "30px",
              height: "50px",
              backgroundColor: "#ccd2ff",
            }}
          ></div>
        </div>
      </div>

      {/* Labels */}
      <div className="row mt-3">
        <div className="col-6">
          <p className="mb-0 text-muted">₹39.75K</p>
          <p className="mb-0 text-success">6.55%</p>
          <p className="text-muted">Fixed Deposit</p>
        </div>
        <div className="col-6">
          <p className="mb-0 text-muted">₹50.02K</p>
          <p className="mb-0 text-success">22.56%</p>
          <p className="text-muted">This Fund</p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentChart;
