import Logo from "../assets/img/logo/logo.png"
import LoginLeftImage from "../components/LoginLeftImage"
import leftImage from "../assets/img/otpLeft.png"
import MobileIcon from "../assets/img/login/mobile_icon.png"
import OtpInput from 'react-otp-input';
import { useState } from "react";


const Otp = () => {
  const [otp, setOtp] = useState<string>();
  return (

    <div className="container-fluid">
      <div className="row">
        <LoginLeftImage LeftImage={leftImage} />
        <div className="col-12 col-md-6 align-self-center">
          <div className="mrgin_With20">
            <img src={MobileIcon}  alt="" className="mobileIcon img-fluid" />
            <p className="text-dark font-weight-bold">Varify OTP</p>
            <form className="" action="">
              <p className="pb-1 fs12px">OTP sent to +91 9956419878</p>

              <div className="mb-3 row">
                <OtpInput
                  value={otp}
                  inputStyle="col otpBox"
                  onChange={setOtp}
                  numInputs={4}
                  renderSeparator={<span></span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <button type="button" className="customButton col-12">Varify OTP</button>
            </form>
            <p className="mt-3 fs12px text-center">Don’t receive the OTP? Resend</p>
          </div>
        </div>
      </div>

    </div>

  )
}
export default Otp