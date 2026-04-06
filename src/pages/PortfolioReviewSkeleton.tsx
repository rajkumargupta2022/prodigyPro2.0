export const PortfolioReviewSkeleton = () => {
  return (
    <>
      <div className="col-12 d-flex align-items-start mb-4">
        <h4 className="placeholder-glow w-100">
          <span className="placeholder col-3"></span>
        </h4>
      </div>
      <div className="col-md-8 col-sm-12 ">
        <div className="col-12 bg-white rounded-2 p-3 mt-0">
          <h5 className="placeholder-glow mb-4">
            <span className="placeholder col-4"></span>
          </h5>
          {[1, 2, 3].map((item) => (
            <div className="mb-4" key={item}>
              <div className="d-flex justify-content-between placeholder-glow">
                <span className="placeholder col-4"></span>
                <span className="placeholder col-2"></span>
              </div>
              <div className="progress height6px mt-2 placeholder-glow rounded">
                <span className="placeholder col-12 bg-secondary" style={{ height: "6px" }}></span>
              </div>
            </div>
          ))}
        </div>

        {[1, 2, 3].map((section) => (
          <div className="col-12 bg-white rounded-2 p-3 mt-3" key={section}>
            <div className="row px-3 mt-2">
              <h5 className="placeholder-glow">
                <span className="placeholder col-4"></span>
              </h5>
              <div className="col-12 placeholder-glow mt-1 mb-2">
                <span className="placeholder col-8"></span>
              </div>
              <hr className="text-secondary border-2" />
              {[1, 2].map((item) => (
                <div className="d-flex align-items-center mb-3 placeholder-wave" key={item}>
                  <div className="placeholder rounded" style={{ height: "40px", width: "40px" }}></div>
                  <div className="d-flex flex-column ps-3 flex-grow-1">
                    <span className="placeholder col-6 mb-1"></span>
                    <span className="placeholder col-3 placeholder-sm"></span>
                  </div>
                </div>
              ))}
              <div className="col text-start mt-2 placeholder-glow">
                <span className="placeholder col-2 p-3 rounded"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-md-4 col-sm-12">
        <div className="row bg-white rounded-2 p-3 mt-0">
          <h5 className="placeholder-glow mb-4">
            <span className="placeholder col-10"></span>
            <span className="placeholder col-8"></span>
          </h5>
          <div className="col-12 d-flex align-items-start placeholder-wave">
            <div className="placeholder rounded-circle" style={{ height: "50px", width: "50px" }}></div>
            <div className="d-flex flex-column ps-3 flex-grow-1">
               <span className="placeholder col-8 mb-2"></span>
               <span className="placeholder col-6 mb-2"></span>
               <span className="placeholder col-4 mb-2"></span>
               <span className="placeholder col-7 mt-2"></span>
               <span className="placeholder col-7 mt-2"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
