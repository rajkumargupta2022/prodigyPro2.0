import { useState } from "react";
import OtpInput from "react-otp-input";

function OTPVerification() {
  const [otp, setOtp] = useState<string>();
  return (
    <div className="p-4 mb-2">
      <span className="sub-heading ">Verify OTP</span>
      <p className="note mt-4">OTP sent to example.gupta@example.com</p>
      <div className="mb-3 row w-50 mt-4 otp-input-field">
        <OtpInput
          value={otp}
          inputStyle="col otpBox2 "
          onChange={setOtp}
          numInputs={4}
          p-input
          renderSeparator={<span></span>}
          renderInput={(props) => <input {...props} />}
        />
      </div>

      <div className="w-50">
        <button
          className="mandate-button mt-4 w-100"
          style={{ marginRight: "32px" }}
          // onClick={() => setActive("p-input")}
        >
          Verify OTP
        </button>
        <br />
        <div className="mt-4 w-100 text-center">
          Don't receive the OTP? <span className="link">Resend</span>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
