import journeyImage from "../assets/img/left-login.svg"
import rich from "../assets/img/rich.svg"
const LoginLeftImage = ({ LeftImage = journeyImage }) => {
  return (
    <>
       <div className="col-md-6 col-12 m-0 loginBg px-lg-5 d-md-block d-none">
  <div
    id="loginSlider"
    className="carousel slide"
    data-bs-ride="carousel"
    data-bs-interval="4000"
  
  >
    <div className="carousel-inner">

      {/* Slide 1 */}
      <div className="carousel-item active text-start">
        <img
          className="w-lg-85 mx-auto d-block loginimg"
          height={500}
          src={LeftImage}
          alt="slide1"
        />
        <h4 className="text-white px-5 mt-4">
        Where Strategy Meets Wealth
        </h4>
        <ul className="text-white px-5">
          <li className="fs16px text-white">
            1000 Crores+ Assets Under Managements
          </li>
          <li className="fs16px logincontent text-white">
            21+ Years of Wisdom & Trust
          </li>
           <li className="fs16px logincontent text-white">
            16000+ Retail client Base
          </li>
          <li className="fs16px logincontent text-white">
           Plan India Presence / Competent Research
          </li>
        </ul>
      </div>

      {/* Slide 2 */}
      <div className="carousel-item text-start">
        <img
          className="w-lg-85 mx-auto d-block loginimg"
          height={500}
          src={rich}
          alt="slide2"
        />
        <h4 className="text-white px-5 mt-4">
          Expert Insights, Seamless Implementation.
        </h4>
        <ul className="text-white px-5">
          <li className="fs16px text-white">
            SEBI-RIA Registered Mutual Fund Distributor ARN: 21399
          </li>
          <li className="fs16px logincontent text-white">
            Discover mutual funds that help you achieve your financial dreams, step by step
          </li>
        </ul>
      </div>

    </div>

    {/* Indicators */}
    <div className="carousel-indicators indicator-login">
      <button
        type="button"
        data-bs-target="#loginSlider"
        data-bs-slide-to="0"
        className="active"
      />
      <button
        type="button"
        data-bs-target="#loginSlider"
        data-bs-slide-to="1"
        className=""
      />
    </div>
  </div>
</div>

    </>
  )
}
export default LoginLeftImage