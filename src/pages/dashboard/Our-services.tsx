import recomended from "../../assets/img/icons/Recommended Funds.svg"
import taxSaving from "../../assets/img/icons/tax 1.svg"
import portfolio from "../../assets/img/icons/portfolio review.svg"
import nfo from "../../assets/img/icons/nfo.svg"
import transact from "../../assets/img/icons/transcat.svg"
import money from "../../assets/img/icons/rupee 1.svg"
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"

const OurServices = ()=>{
  return(
      <Card border="light mb-3 cardRadius">
                <Card.Body>
                  <div className="row ">
                    <h6 className="fw-semibold mb-4">Our Services</h6>
                    <Link className="col text-center" to="/emergency-funds"><img src={money} alt="" className="" height={24} /><small className="d-block adjustText ">Emergengy Fund </small></Link>
                    <Link to="/recommended-funds" className="col text-center " ><img src={recomended} alt="" className="" height={24} /><small className="d-block  adjustText">Recommended Funds</small></Link>
                    <Link to="/tax-saving" className="col text-center " ><img src={taxSaving} alt="" className="" height={24} /><small className="d-block  adjustText">Tax Saving</small></Link>
                    <Link to="/portfolio-review" className="col text-center" ><img src={portfolio} alt="" className="" height={24} /><small className="d-block  adjustText">Portfolio Review</small></Link>
                    <Link to="/nfo-live" className="col text-center" ><img src={nfo} alt="" className="" height={24} /><small className="d-block  adjustText">NFO Live</small></Link>
                    <Link to="/emergency-funds" className="col text-center" ><img src={transact} alt="" className="" height={24} /><small className="d-block  adjustText">All Orders</small></Link>

                  </div>
                </Card.Body>
              </Card>
  )
}
export default OurServices