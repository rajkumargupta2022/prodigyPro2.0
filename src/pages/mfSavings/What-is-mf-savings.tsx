import arrow from "../../assets/img/mf_savings/arrow.png";
import successImg from "../../assets/img/bg-image/successImg.png";
import MyNavbar from "../../components/Navbar";
import mfSaving from "../../assets/img/mf_savings/mfSaving.svg";
import mf_Investing from "../../assets/img/mf_savings/mfInvesting.svg";
import mfMoney from "../../assets/img/mf_savings/mfMoney.svg";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WhatIsMfSavings = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number>(0);




  /* ---------------- CAROUSEL SLIDE LISTENER ---------------- */
  useEffect(() => {
    const carousel = document.getElementById("mfSlider");

    const handleSlide = (event: any) => {
      setActiveIndex(event.to);
    };

    carousel?.addEventListener("slid.bs.carousel", handleSlide);

    return () => {
      carousel?.removeEventListener("slid.bs.carousel", handleSlide);
    };
  }, []);

  /* ---------------- NEXT BUTTON HANDLER ---------------- */
  const handleNext = () => {
    if (activeIndex === 2) {
      navigate("/mf-saving-account");
    }
  };

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
              className="carousel slide rounded-4 overflow-hidden"
              data-bs-ride="false"
              data-bs-interval="false"
              style={{
                backgroundImage: `url(${successImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div style={{ minHeight: "500px" }}>
                {/* -------- Dots -------- */}
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#mfSlider"
                    data-bs-slide-to="0"
                    className="active"
                  />
                  <button
                    type="button"
                    data-bs-target="#mfSlider"
                    data-bs-slide-to="1"
                  />
                  <button
                    type="button"
                    data-bs-target="#mfSlider"
                    data-bs-slide-to="2"
                  />
                </div>

                {/* -------- Slides -------- */}
                <div className="carousel-inner">
                  {/* Slide 1 */}
                  <div className="carousel-item active">
                    <div className="text-white text-center p-4">
                      <img
                        src={mfSaving}
                        className="img-fluid mt-4"
                        width={210}
                        alt="MF Saving"
                      />
                      <h3 className="mt-3">
                        Your Savings Account is Idle.
                        <br />
                        Make it Work.
                      </h3>
                      <p className="mx-lg-5 mx-2 mt-3 text-light-white">
                        Why earn just ~3.5% in a savings account? Park your
                        surplus cash in secure mutual funds and aim for
                        potentially higher returns with the same ease.
                      </p>
                    </div>
                  </div>

                  {/* Slide 2 */}
                  <div className="carousel-item">
                    <div className="text-white text-center p-4">
                      <img
                        src={mf_Investing}
                        className="img-fluid mt-4"
                        width={210}
                        alt="MF Investing"
                      />
                      <h3 className="mt-3">Your Surplus, Smarter Earnings</h3>
                      <p className="mx-lg-5 mx-2 mt-3 text-light-white">
                        We automatically find idle money in your linked bank
                        account and invest it in Bajaj Finserv Liquid Fund. You
                        earn more, without the effort of manual investing.
                      </p>
                    </div>
                  </div>

                  {/* Slide 3 */}
                  <div className="carousel-item">
                    <div className="text-white text-center p-4">
                      <img
                        src={mfMoney}
                        className="img-fluid mt-4"
                        width={210}
                        alt="MF Money"
                      />
                      <h3 className="mt-3">
                        Earn More, Without <br />
                        Lock-In.
                      </h3>
                      <p className="mx-lg-5 mx-2 mt-3 text-light-white">
                        Need cash? Get instant withdrawals* of up to ₹50,000 back
                        to your bank account anytime. Enjoy better returns than a
                        savings account, with incredible flexibility.
                      </p>
                    </div>
                  </div>
                </div>

                {/* -------- Next Button -------- */}
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#mfSlider"
                  data-bs-slide="next"
                  onClick={handleNext}
                >
                  <img src={arrow} alt="Next" style={{ width: "40px" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatIsMfSavings;
