import { Link, useSearchParams } from "react-router-dom"


import rislBg from "../../assets/img/bg-image/risk-profile.png"
import group from "../../assets/img/Group.png"
import correct from "../../assets/img/correct.png"
import MyNavbar from "../../components/Navbar"
// import riskMeter from "../assets/img/risk-meter.svg"


const UccSubmit = () => {
  const [searchParams] = useSearchParams();
  const client_code = searchParams.get("client_code") ?? "";



  return (
    <>
      <MyNavbar />
      <div className="container px-4 mt-4">
        <div className="row justify-content-md-center">

          <div
            className="col-lg-8 col-sm-12 text-center bg-light rounded-3 mt-3"
            style={{
              backgroundImage: `url(${rislBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="position-relative d-inline-block mt-3">
              <img src={group} alt="Group" className="img-fluid" height={110} width={250} />
              <img
                src={correct}
                alt="Correct Symbol"
                className="position-absolute top-50 start-50 translate-middle"
                height={84}
                width={84}
              />
            </div>

            <h3 className="text-white mt-2">Congratulations!</h3>
            <h6 className="text-white">Your UCC application has been submitted successfully.</h6>
            <small className="text-white">To activate your UCC, you need to approve UCC & FATCA authorization link for all the holder(s) sent
              on respective mail id(s)</small>

            {/* Animated Risk Meter with Needle */}


            <div className="mx-lg-4 mt-4 mb-2">
              <p className="text-white fs14px">Client Code : {client_code ?? ""}</p>
              <small className="text-white fs12px">Your investor account will get approved within 2 working days</small>
            </div>

            <Link className="btn btn-light my-4 logoBlueColor" to="/">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default UccSubmit
