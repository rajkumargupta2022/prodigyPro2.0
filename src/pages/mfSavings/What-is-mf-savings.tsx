// import correct from "../../assets/img/correct.png";
// import group from "../../assets/img/Group.png";
import arrow from "../../assets/img/mf_savings/arrow.png";
import successImg from "../../assets/img/bg-image/successImg.png";
// import { Link } from "react-router-dom";
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

          <div className="col-lg-8 col-sm-12 mt-4">
            <div
              id="mfSlider"
              className="carousel slide"
              data-bs-ride="false"
              data-bs-interval="false"
            >
              {/* Dots */}
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

              {/* Slides */}
              <div className="carousel-inner">
                {/* Slide 1 */}
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
                      className="img-fluid mt-4"
                      width={210}
                      alt=""
                    />
                    <h3 className="mt-3">
                      Your Savings Account is Idle.
                      <br />
                      Make it Work.
                    </h3>
                    <p className="text-white mx-lg-5 mx-2 mt-3">
                      Why earn just ~3.5% in a savings account? Park your
                      surplus cash in secure mutual funds and aim for
                      potentially higher returns with the same ease.
                    </p>
                  </div>
                </div>

                {/* Slide 2 */}
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
                      className="img-fluid mt-4"
                      width={210}
                      alt=""
                    />
                    <h3 className="mt-3">Your Surplus, Smarter Earnings</h3>
                    <p className="text-white mx-lg-5 mx-2 mt-3">
                      We automatically find idle money in your linked bank
                      account and invest it in Bajaj Finserv Liquid Fund. You
                      earn more, without the effort of manual investing.
                    </p>
                  </div>
                </div>

                {/* Slide 3 */}
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
                      className="img-fluid mt-4"
                      width={210}
                      alt=""
                    />
                    <h3 className="mt-3">
                      Earn More, Without <br />
                      Lock-In.
                    </h3>
                    <p className="text-white mx-lg-5 mx-2 mt-3">
                      Need cash? Get instant withdrawals* of up to ₹50,000 back
                      to your bank account anytime. Enjoy better returns than a
                      savings account, with incredible flexibility.
                    </p>
                  </div>
                </div>
              </div>

              {/* CUSTOM IMAGE BUTTON */}
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#mfSlider"
                data-bs-slide="next"
              >
                <img src={arrow} alt="Next" className="next-arrow-img" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatIsMfSavings;
