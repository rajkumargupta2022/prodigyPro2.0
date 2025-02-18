import Logo from "../assets/img/logo/logo.png"
import LoginLeftImage from "../components/LoginLeftImage"
import leftImage from "../assets/img/otpLeft.png"
import MobileIcon from "../assets/img/login/mobile_icon.png"
import OtpInput from 'react-otp-input';
import { useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";



const PanVarification = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string>();
  const getOpt = ()=>{
           navigate("/otp")
  }
  return (

    <div className="container-fluid">
      <div className="row">
        <LoginLeftImage LeftImage={leftImage} />
        <div className="col-12 col-md-6 align-self-center position-relative">
         
          <div className="mrgin_With20">
          <Link className="back_absolute_btn text-decoration-none" to="/"><ArrowLeft/> Back</Link>
            {/* <img src={MobileIcon}  alt="" className="mobileIcon img-fluid" /> */}
            <h6 className="text-dark font-weight-bold">Are you investment ready?</h6>
            <form className="" action="">
              <p className="pb-1 fs12px">Know it within the seconds</p>

              <label className="form-label fs12px">PAN NUMBER</label>
              <div className="input-group mb-3">
                <input type="text" className="form-control mx-1 rounded"  placeholder="Enter Pan" /> 
              </div>
            <h4 className="fs12px congratesColor font-weight-bold">Congratulations! 🎉 You are KYC Compliant</h4>
            <h4 className="fs12px congratesColor font-weight-bold errorColor">Your are not KYC Compliant</h4>
            <p className="errorColor sm ">We do not have your details with us. You need to register to start your investment journey Please share your details and you are all set for investing</p>
              <button type="button" onClick={getOpt} className="customButton col-12 mt-3">Proceed</button>
            </form>
          </div>
        </div>
      </div>

    </div>

  )
}
export default PanVarification