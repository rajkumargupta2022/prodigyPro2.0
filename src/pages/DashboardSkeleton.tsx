import React from 'react';
import Card from 'react-bootstrap/Card';

export const DashboardSkeleton = ({ kycSection }: { kycSection?: React.ReactNode }) => {
  return (
    <>
      <div className="col-lg-7 col-sm-12">
        {kycSection}
        {/* Portfolio Card Skeleton */}
        <Card border="light" className="my-3 cardRadius">
          <Card.Body>
            <div className="row border-bottom pb-3 mb-2 px-2">
              <div className="col d-flex align-items-center placeholder-glow">
                <span className="placeholder col-6 rounded" style={{ height: "20px" }}></span>
              </div>
              <div className="col-4 text-end placeholder-glow">
                <span className="placeholder col-10 rounded" style={{ height: "32px" }}></span>
              </div>
            </div>
            <div className="mt-3 px-2 placeholder-glow">
              <span className="placeholder col-5 rounded" style={{ height: "20px" }}></span>
            </div>
          </Card.Body>
        </Card>

        {/* Our Services Skeleton */}
        <Card border="light" className="mb-3 cardRadius">
          <Card.Body>
            <div className="placeholder-glow mb-4 px-2">
              <span className="placeholder col-3 rounded" style={{ height: "22px" }}></span>
            </div>
            <div className="row mt-3 px-2">
              {[1, 2, 3, 4,5,6].map(i => (
                <div key={i} className="col-2 text-center placeholder-wave">
                  <div className="placeholder rounded-circle" style={{ height: "45px", width: "45px" }}></div>
                  <div className="mt-2 text-center">
                    <span className="placeholder col-8 rounded" style={{ height: "14px" }}></span>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Goal Planning Skeleton */}
        <Card border="light" className="mb-3 cardRadius">
          <Card.Body>
            <div className="placeholder-glow mb-4 px-2">
              <span className="placeholder col-3 rounded" style={{ height: "22px" }}></span>
            </div>
            <div className="row px-2">
              {[1, 2,3,4,5,6].map(i => (
                <div key={i} className="col-2 mb-3 placeholder-wave">
                  <span className="placeholder col-12 rounded" style={{ height: "40px" }}></span>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Popular Funds Skeleton */}
        <Card border="light" className="mb-3 cardRadius">
          <Card.Body>
            <div className="d-flex justify-content-between mb-4 px-2 placeholder-glow">
              <span className="placeholder col-3 rounded" style={{ height: "22px" }}></span>
              <span className="placeholder col-2 rounded" style={{ height: "22px" }}></span>
            </div>
            <div className="d-flex gap-2 mb-4 px-2 placeholder-glow">
              <span className="placeholder col-2 rounded" style={{ height: "35px" }}></span>
              <span className="placeholder col-2 rounded" style={{ height: "35px" }}></span>
              <span className="placeholder col-2 rounded" style={{ height: "35px" }}></span>
            </div>
            <div className="px-2">
              {[1, 2, 3].map((item) => (
                <div className="d-flex gap-3 border-bottom py-3 placeholder-wave" key={item}>
                  <div className="placeholder rounded" style={{ width: "45px", height: "45px" }}></div>
                  <div className="d-flex flex-column flex-grow-1 justify-content-center">
                    <span className="placeholder col-6 mb-2 rounded" style={{ height: "16px" }}></span>
                    <span className="placeholder col-4 rounded" style={{ height: "14px" }}></span>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Right Column: Discover Funds / Quick Link */}
      <div className="col-lg-3 col-sm-12">
        <Card border="light" className="my-3 cardRadius">
          <Card.Body>
            <div className="placeholder-glow mb-4 px-2">
              <span className="placeholder col-5 rounded" style={{ height: "22px" }}></span>
            </div>
            <div className="px-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="d-flex justify-content-between mb-3 pb-2 border-bottom placeholder-glow">
                  <span className="placeholder col-8 rounded" style={{ height: "16px" }}></span>
                  <span className="placeholder col-1 rounded" style={{ height: "16px" }}></span>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
          <Card border="light" className="my-3 cardRadius">
          <Card.Body>
            <div className="placeholder-glow mb-4 px-2">
              <span className="placeholder col-5 rounded" style={{ height: "22px" }}></span>
            </div>
            <div className="px-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="d-flex justify-content-between mb-3 pb-2 border-bottom placeholder-glow">
                  <span className="placeholder col-8 rounded" style={{ height: "16px" }}></span>
                  <span className="placeholder col-1 rounded" style={{ height: "16px" }}></span>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
       
    </>
  )
}

export default DashboardSkeleton;
