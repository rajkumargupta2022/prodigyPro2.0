import MyNavbar from "./Navbar"
import successImg from "../assets/img/bg-image/successImg.png"
import { ChevronBarRight, ChevronRight } from "react-bootstrap-icons"


const RiskProfile = () => {
  return (
    <>
      <MyNavbar />
      <div className="container px-5 mt-4">
        <div className="row justify-content-md-center">
          <div className="col-10">
            <h5>Know Your Risk Profile</h5>
          </div>
          <div className="col-10 bg-light rounded-3 mt-3" style={{ backgroundImage: `url(${successImg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="row justify-content-md-center my-4">
              <div className="col-8">
                <div className="row mb-4">
                  <div className="progress col px-0 mx-1 my-2 progressBg" role="progressbar" style={{ height: "4px" }} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-white" style={{ width: "100%" }}></div>
                  </div> <div className="progress col px-0 mx-1 my-2 progressBg" role="progressbar" style={{ height: "4px" }} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-white" style={{ width: "100%" }}></div>
                  </div> <div className="progress col px-0 mx-1 my-2 progressBg" role="progressbar" style={{ height: "4px" }} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-white" style={{ width: "100%" }}></div>
                  </div> <div className="progress col px-0 mx-1 my-2 progressBg" role="progressbar" style={{ height: "4px" }} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-white" style={{ width: "0%" }}></div>
                  </div>
                </div>
                <h4 className="text-white mt-5">I seek above average returns from my investments</h4>
                <div className=" py-5 d-grid gap-2 ">
                  <button className="btn btn-light border-0 bgOption 100vh ">Agree ✅</button>
                  <button className="btn btn-light border-0 bgOption 100vh ">Somewhat Agree 🤔</button>
                  <button className="btn btn-light border-0 bgOption 100vh ">Disagree ❌</button>
                </div>
                <div className="text-center mb-4">
                <button className="btn btn-light border-0 arrowRadius"> <ChevronRight/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default RiskProfile