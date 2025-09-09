import { useLocation, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import MyNavbar from "./Navbar"
import rislBg from "../assets/img/bg-image/risk-profile.png"
import group from "../assets/img/Group.png"
import correct from "../assets/img/correct.png"
// import riskMeter from "../assets/img/risk-meter.svg"
import RiskMeter from "../components/Risk-Meter"

const RiskResult = () => {
   
  const location = useLocation()
  const score = location.state?.score || 0 // comes from RiskProfile navigate()

  const [profile, setProfile] = useState("Moderate")
  const [description, setDescription] = useState("")
  const [meterRotation, setMeterRotation] = useState(0)
  // const [needleColor, setNeedleColor] = useState("yellow")

  useEffect(() => {
    if (score <= 4) {
      setProfile("Safe")
      setDescription("You prefer conservative investments with a focus on capital preservation. Your portfolio focuses on stability and lowrisk investments, suitable for short to medium-term goals.")
      setMeterRotation(-45) // left
      // setNeedleColor("green")
    } else if (score >= 9) {
      setProfile("Aggressive")
      setDescription("You prefer to take calculated risks for potentially higher returns. Your portfolio is designed to capture growth opportunities, suitable for long-term goals.")
      setMeterRotation(45) // right
      // setNeedleColor("red")
    } else {
      setProfile("Moderate")
      setDescription("You prefer a balanced approach, aiming for steady growth while managing risks. Your portfolio combines stability and growth potential, ideal for medium to long-term goals.")
      setMeterRotation(0) // center
      // setNeedleColor("orange")
    }
  }, [score])

  return (
    <>
      <MyNavbar />
      <div className="container px-4 mt-4">
        <div className="row justify-content-md-center">
          <div className="col-lg-8 col-sm-12">
            <h5>Know Your Risk Profile</h5>
          </div>
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
            <small className="text-white">Your Risk Profile is</small>
            <h6 className="text-white">{profile}</h6>

            {/* Animated Risk Meter with Needle */}
            <div className="my-3" style={{ position: "relative", width: "160px", height: "80px", margin: "0 auto" }}>
              <RiskMeter rotation={meterRotation} />

            </div>

            <div className="mx-lg-4">
              <small className="text-white">{description}</small>
            </div>

            <Link className="btn btn-light my-4 logoBlueColor" to="/dashboard">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default RiskResult
