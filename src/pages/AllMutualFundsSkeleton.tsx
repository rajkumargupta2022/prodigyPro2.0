export const AllMutualFundsSkeleton = () => {
    return (
        <div className="mt-4">
            {[1, 2, 3, 4, 5].map((item) => (
                <div className="card mb-3 radius16px border-0 shadow-sm" key={item}>
                <div className="card-body">
                    <div className="row justify-content-between">
                    <div className="col-8 py-2 d-flex placeholder-wave">
                        <div className="placeholder" style={{ height: "45px", width: "45px", borderRadius: "10px" }}></div>
                        <div className="ms-2 d-flex flex-column justify-content-center" style={{ flex: 4 }}>
                        <span className="placeholder col-8 mb-2"></span>
                        <span className="placeholder col-4"></span>
                        </div>
                    </div>
                    <div className="col-2 py-2 text-md-end text-start placeholder-wave">
                        <span className="placeholder col-2 fs-5"></span>
                    </div>
                    </div>
                    <hr className="fw-light text-secondary my-1" />
                    <div className="row placeholder-wave">
                    <div className="col-4">
                        <span className="placeholder col-6 mb-1"></span><br/>
                        <span className="placeholder col-4"></span>
                    </div>
                    <div className="col-4">
                        <span className="placeholder col-6 mb-1"></span><br/>
                        <span className="placeholder col-4"></span>
                    </div>
                    <div className="col-4">
                        <span className="placeholder col-6 mb-1"></span><br/>
                        <span className="placeholder col-4"></span>
                    </div>
                    </div>
                </div>
                </div>
            ))}
        </div>
    )
}
