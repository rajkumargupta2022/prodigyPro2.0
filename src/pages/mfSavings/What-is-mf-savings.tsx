// import correct from "../../assets/img/correct.png";
// import group from "../../assets/img/Group.png";
import successImg from "../../assets/img/bg-image/successImg.png";
import { Link } from "react-router-dom";
import MyNavbar from "../../components/Navbar";
import mfSaving from "../../assets/img/mf_savings/mfSaving.svg";
import mf_Investing from "../../assets/img/mf_savings/mfInvesting.svg";
import mfMoney from "../../assets/img/mf_savings/mfMoney.svg";

const WhatIsMfSavings = () => {
  return (
    <>
      <MyNavbar />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-sm-12">
            <h5>What is MF Savings Account?</h5>
          </div>

          {/* Bootstrap Carousel */}
          <div className="col-lg-8 col-sm-12 mt-4">
            <div
              id="mfSlider"
              className="carousel slide"
              data-bs-interval="3000"
              data-bs-ride="carousel"
            >
              {/* Slider Dots */}
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#mfSlider"
                  data-bs-slide-to="0"
                  className="active"
                ></button>
                <button
                  type="button"
                  data-bs-target="#mfSlider"
                  data-bs-slide-to="1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#mfSlider"
                  data-bs-slide-to="2"
                ></button>
              </div>

              {/* Slider Items */}
              <div className="carousel-inner">
                {/* SLIDE 1 */}
                <div className="carousel-item active">
                  <div
                    className="text-white text-center rounded-4 shadow-lg p-4"
                    style={{
                      backgroundImage: `url(${successImg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      minHeight: "500px",
                    }}
                  >
                    <img
                      src={mfSaving}
                      alt="Slide1"
                      className="img-fluid mt-4"
                      height={80}
                      width={210}
                    />

                    <h3 className="mt-3">
                      Your Savings Account is Idle.
                      <br /> Make it Work.
                    </h3>

                    <p className="text-white mx-lg-5 mx-2 mt-3">
                      Why earn just ~3.5% in a savings account? Park your surplus
                      cash in secure mutual funds and aim for potentially higher
                      returns with the same ease.
                    </p>

                   
                  </div>
                </div>

                {/* SLIDE 2 */}
                <div className="carousel-item">
                  <div
                    className="text-white text-center rounded-4 shadow-lg p-4"
                    style={{
                      backgroundImage: `url(${successImg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      minHeight: "500px",
                    }}
                  >
                    <img
                      src={mf_Investing}
                      alt="Slide2"
                      className="img-fluid mt-4"
                      height={80}
                      width={210}
                    />

                    <h3 className="mt-3">Smart Investing Made Simple</h3>

                    <p className="text-white mx-lg-5 mx-2 mt-3">
                      MF Savings Accounts allow you to grow your money without
                      locking it away. Withdraw anytime and still earn better
                      than a savings account.
                    </p>

                  
                  </div>
                </div>

                {/* SLIDE 3 */}
                <div className="carousel-item">
                  <div
                    className="text-white text-center rounded-4 shadow-lg p-4"
                    style={{
                      backgroundImage: `url(${successImg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      minHeight: "500px",
                    }}
                  >
                    <img
                      src={mfMoney}
                      alt="Slide3"
                      className="img-fluid mt-4"
                      height={80}
                      width={210}
                    />

                    <h3 className="mt-3">Let Your Money Work Harder</h3>

                    <p className="text-white mx-lg-5 mx-2 mt-3">
                      Keep your spare cash productive. Earn superior returns with
                      complete liquidity and low risk.
                    </p>

                    <Link
                      className="btn btn-light mt-4 logoBlueColor"
                      to="/dashboard"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>

              {/* Prev / Next Arrows */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#mfSlider"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#mfSlider"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatIsMfSavings;
