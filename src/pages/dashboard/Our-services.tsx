import recomended from "../../assets/img/icons/Recommended Funds.svg"
import taxSaving from "../../assets/img/icons/tax 1.svg"
import portfolio from "../../assets/img/icons/portfolio review.svg"
import nfo from "../../assets/img/icons/nfo.svg"
import money from "../../assets/img/icons/rupee 1.svg"
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"

const OurServices = () => {
  return (
    <Card border="light mb-3 cardRadius">
      <Card.Body>
        <div className="row">
          <h6 className="fw-semibold mb-4">Our Services</h6>
          <div className="col-4 col-md-4 col-lg-3 py-1 text-center crPointer"> <Link className=" text-center" to="/emergency-funds"><img src={money} alt="" className="" height={24} /><small className="d-block adjustText ">Emergency Fund </small></Link></div>
          <div className="col-4 col-md-4 col-lg-2 py-1 text-center crPointer"> <Link to="/recommended-funds" className=" text-center " ><img src={recomended} alt="" className="" height={24} /><small className="d-block  adjustText">Recommended Funds</small></Link></div>
          <div className="col-4 col-md-4 col-lg-2 py-1 text-center crPointer"> <Link to="/tax-saving" className=" text-center " ><img src={taxSaving} alt="" className="" height={24} /><small className="d-block  adjustText">Tax Saving</small></Link></div>
          <div className="col-4 col-md-4 col-lg-2 py-1 text-center crPointer"> <Link to="/nfo-live" className=" text-center" ><img src={nfo} alt="" className="" height={24} /><small className="d-block  adjustText">NFO Live</small></Link></div>
          <div className="col-4 col-md-4 col-lg-3 py-1 text-center crPointer"> <Link to="/portfolio-review" className=" text-center" ><img src={portfolio} alt="" className="" height={24} /><small className="d-block  adjustText">Portfolio Review</small></Link></div>
          {/* <div className="col-4 col-md-4 col-lg-2 py-1 text-center crPointer"> <Link to="/mf-saving-dashboard" className=" text-center"  ><img src={transact} alt="" className="" height={24} /><small className="d-block  adjustText">MF Savings Account</small></Link></div> */}
        </div>
      </Card.Body>
    </Card>
  )
}
export default OurServices