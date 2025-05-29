import Card from 'react-bootstrap/Card';
const KycMsg = ()=>{
  return (
    <Card border="light" className="my-3 kycWarningColor">
                <Card.Body>
                  <div className="row">
                    <div className="col d-flex">
                      <h6 className="fw-semibold">Your KYC is under review </h6>
                    </div>
                    <p className="fs14px" >Please contact customer service if you have any <br /> concerns or questions during the review process.</p>
                  </div>
                  <button type="button" className="btn contactSupportButton">Contact Support</button>
                </Card.Body>
              </Card>
  )
}
export default KycMsg