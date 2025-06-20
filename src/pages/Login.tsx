import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo/logo.png";
import LoginLeftImage from "../components/LoginLeftImage";
import { errorToast, successToast } from "../services/utils/toast";
import { useState } from "react";
import { handleNumbers } from "../services/utils/states";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls"

interface responseType {
  msg: string;
  success: boolean;
}

const Login = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState<string>("");
  const [mobileError, setMobileError] = useState<string>("");
  // const getOpt = () => {
  //   navigate("/otp")
  // }
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/dashboard")
    }
  }, [])

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mobile.trim()) {
      setMobileError("Mobile number is required.");
      return;
    } else if (mobile.length < 10 || mobile.length < 10) {
      setMobileError("Please enter a valid number");
      return;
    }

    try {
      const res = await postRequest<responseType>(endPoints.registerUser, {
        mobile: Number(mobile)
      });
      if (res) {
        successToast(res);
        navigate("/otp", { state: { mobile } });
      } else {
        errorToast(res);
      }
    } catch (err) {
      errorToast(err);
    }



  };

  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNumbers(10, e.target.value, setMobile);
  };

  return (
    <div className="container-fluid">
      <div className="row login_hight_fixed">
        <LoginLeftImage />

        <div className="col-12 col-md-6 align-self-center">
          <div className="mrgin_With20">
            <img src={Logo} alt="" className="logoImage" />
            <p className="py-2">From BFC Capital Private Limited</p>
            <form className="pt-3" action="#" onSubmit={sendOtp}>
              <label className="form-label fw-bold pb-1">
                Enter your phone number
              </label>
              <div className="input-group">
                <button className="btn rounded border" type="button">
                  +91
                </button>
                <input
                  type="text"
                  className="form-control mx-1 rounded"
                  value={mobile ?? ""}
                  onChange={handleNumber}
                  placeholder="Phone Number"
                />
              </div>
              <small className="text-danger">{mobileError}</small>
              <button type="submit" className="customButton col-12 mt-3">
                Get OTP
              </button>
            </form>
            <p className="mt-3">
              By logging in, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
