import MyNavbar from "./Navbar"
import rislBg from "../assets/img/bg-image/risk-profile.png"
import group from "../assets/img/Group.png"
import correct from "../assets/img/correct.png"
import riskMeter from "../assets/img/risk-meter.svg"
import { Link } from "react-router-dom"




const RiskResult = () => {




  return (
    <>
      <MyNavbar />
      <div className="container px-4 mt-4">
        <div className="row justify-content-md-center">
          <div className="col-lg-8 col-sm-12">
            <h5>Know Your Risk Profile</h5>
          </div>
          <div className="col-lg-8 col-sm-12 text-center bg-light rounded-3 mt-3" style={{ backgroundImage: `url(${rislBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="position-relative d-inline-block mt-3">
              {/* Background Image */}
              <img src={group} alt="Group" className="img-fluid" height={110} width={250} />
              {/* Overlay Image */}
              <img
                src={correct}
                alt="Correct Symbol"
                className="position-absolute top-50 start-50 translate-middle"
                height={84}
                width={84}
              />
            </div>
            <h3 className="text-white mt-2">Congratulations!</h3>
            <small className="text-white">Your Risk Profile is</small>
            <h6 className="text-white">Moderate</h6>
            <img src={riskMeter} alt="" className="my-3" width={160} height={80}/>
            <div className="mx-lg-4">

            <small className="text-white">
            You prefer a balanced approach, aiming for steady growth while managing risks. Your portfolio combines stability and growth potential, ideal for medium to long-term goals.
            </small>
            </div>
            <Link
                className="btn btn-light my-4 logoBlueColor"
                to="/dashboard"
              >
                Go to Home
              </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default RiskResult