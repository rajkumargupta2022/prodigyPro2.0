export const PortfolioSkeleton = () => {
  return (
    <>
      <div className="container py-2 mt-4 portfolio_sticky_2025">
        <div className="personal_form_container">
          <div className="borderColor p-3 rounded-4 bg-white">
            <div className="row text-center placeholder-glow">
              <div className="col mb-2 d-flex justify-content-center align-items-center">
                <span className="placeholder col-4 rounded" style={{ height: "16px" }}></span>
              </div>
              <h3 className="fw-bold d-flex justify-content-center mb-0">
                <span className="placeholder col-6 rounded" style={{ height: "30px" }}></span>
              </h3>
              <div className="mt-2 d-flex justify-content-center align-items-center">
                <span className="placeholder col-5 rounded" style={{ height: "18px" }}></span>
              </div>
            </div>
            <hr />
            <div className="row mt-1 placeholder-glow">
              <div className="col-6 text-end">
                <span className="placeholder col-4 rounded mb-1" style={{ height: "14px" }}></span><br />
                <span className="placeholder col-6 rounded" style={{ height: "20px" }}></span>
              </div>
              <div className="col-5 text-start offset-1">
                <span className="placeholder col-4 rounded mb-1" style={{ height: "14px" }}></span><br />
                <span className="placeholder col-6 rounded" style={{ height: "20px" }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-2 personal_form_container">
        <div className="row placeholder-glow">
          <div className="col-6 text-start">
            <span className="placeholder col-6 rounded" style={{ height: "20px" }}></span>
          </div>
          <div className="col-6 text-end">
            <span className="placeholder col-5 rounded" style={{ height: "30px" }}></span>
          </div>
        </div>
      </div>

      {[1, 2, 3, 4].map((item) => (
        <div className="container py-2" key={item}>
          <div className="personal_form_container">
            <div className="borderColor p-3 rounded-4 bg-white placeholder-glow">
              <div className="d-flex justify-content-between">
                <div className="d-flex w-100">
                  <div className="prod_icon_img">
                    <span className="placeholder logoRadius" style={{ height: "40px", width: "40px", borderRadius: "10px" }}></span>
                  </div>
                  <div className="ms-2 prod_icon_heading mt-1 w-100 placeholder-wave">
                    <span className="placeholder col-6 rounded mb-2 d-block" style={{ height: "20px" }}></span>
                    <span className="placeholder col-3 rounded" style={{ height: "14px" }}></span>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row text-start mt-1 placeholder-glow">
                <div className="col-4 col-md-4">
                  <span className="placeholder col-8 rounded mb-1" style={{ height: "14px" }}></span><br />
                  <span className="placeholder col-10 rounded" style={{ height: "18px" }}></span>
                </div>
                <div className="col-4 col-md-4">
                  <span className="placeholder col-8 rounded mb-1" style={{ height: "14px" }}></span><br />
                  <span className="placeholder col-10 rounded" style={{ height: "18px" }}></span>
                </div>
                <div className="col-4 col-md-4">
                  <span className="placeholder col-8 rounded mb-1" style={{ height: "14px" }}></span><br />
                  <span className="placeholder col-10 rounded" style={{ height: "18px" }}></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
