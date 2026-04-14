import Card from 'react-bootstrap/Card';

const KycMsgSkeleton = () => {
  return (
    <Card border="light" className="my-3">
      <Card.Body>
        <div className="row placeholder-glow">
          <div className="col d-flex">
            <h6 className="fw-semibold w-100">
               <span className="placeholder col-4 rounded"></span>
            </h6>
          </div>
          <p className="fs14px mt-2">
             <span className="placeholder col-8 rounded"></span>
             <br />
             <span className="placeholder col-6 rounded"></span>
          </p>
        </div>
        <div className="placeholder-glow mt-1">
           <span className="placeholder col-3 rounded" style={{ height: "38px", display: "inline-block" }}></span>
        </div>
      </Card.Body>
    </Card>
  )
}

export default KycMsgSkeleton;
