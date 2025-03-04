import NavBar from "../components/Navbar";
import sadFace from "../assets/img/sad-face.svg"
import { useState } from "react";
import OtpField from "../components/OtpField";

const PortfolioImport = () => {
  const [openOtpField, setOpenOtpField] = useState<boolean>(false)

  const getOtp = () => {
    setOpenOtpField(true)
  }

  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3" >
        <div className="row">
          <div className="col-12 d-flex align-items-start">
            <h4>Portfolio Review</h4>
          </div>
          <div className="col-md-12 col-sm-12 bg-white rounded-3">
            <div className="row  justify-content-center mb-3">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="d-flex justify-content-center mt-4">
                  <img src={sadFace} alt="" height={150} width={121} />
                </div>
                  <h4 className="">It looks like you don’t have any  investments with us yet. No worries!</h4>
                  <p className="fs18px mt-1">Enter your phone number to import your investments from MF Central</p>
                  <div className="input-group mb-3">
                    <button className="btn rounded border" type="button" >+91</button>
                    <input type="text" className="form-control mx-1 rounded" placeholder="Phone Number" />
                  </div>
                  <button type="button"  className="customButton col-12" onClick={getOtp}>Get OTP</button>
                  <p className="fs14px m-2">Any investments linked to this mobile number will be imported from MF Central</p>
              </div>
            </div>
          </div>

        </div>
      </div>


      <OtpField show={openOtpField} setShow={setOpenOtpField} />
    </>
  );
};

export default PortfolioImport;
