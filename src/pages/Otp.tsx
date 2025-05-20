import LoginLeftImage from "../components/LoginLeftImage";
import leftImage from "../assets/img/rich.svg";
import MobileIcon from "../assets/img/login/mobile_icon.png";
import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ApiError, Http, http } from "../services/Api";
import { errorToast, successToast } from "../services/toast";
interface responseType {
  msg: string;
  success: boolean;
}

const Otp = (e: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState<string>();
  const [otpErrorMsg, setOtpErrorMsg] = useState<string>("");
  const [counter, setCounter] = useState<number>(15);

  useEffect(() => {
    let timer: number;

    if (counter > 0) {
      timer = setTimeout(() => setCounter(prev => prev - 1), 1000);
    }

    return () => clearTimeout(timer);
  }, [counter]);


  const varifyOtp = async (e: any) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setOtpErrorMsg("Invalid OTP")
      return
    }

    const reqBody: object = {
      mobile: Number(location.state.mobile),
      otp: Number(otp),
    };

    try {
      const res: any = await http.post(Http.apis.varifyOtp, reqBody);
      console.log("resss", res);

      if (res.data) {
        if (res.data?.success && res.data.portfolioUser) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("pan", res.data.PAN);
          navigate("/dashboard");
        }
        if (res.data?.success && !res?.data?.portfolioUser) {
          localStorage.setItem("token", res.data.token);
        }
        successToast(res);
      } else {
        console.log("ers", res);

        errorToast(res);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setOtpErrorMsg("something went wrong..")
      }

    }
  };

  const resendOtp = async () => {
    const res = await http.post<responseType>(Http.apis.registerUser, {
      mobile: Number(location.state.mobile),
    });
console.log("res==",res);

    if (res) {
      successToast(res);
      setCounter(15)
    } else {
      errorToast(res);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row login_hight_fixed">
        <LoginLeftImage LeftImage={leftImage} />
        <div className="col-12 col-md-6 align-self-center position-relative">
          <div className="mrgin_With20">
            <Link className="back_absolute_btn text-decoration-none" to="/">
              <ArrowLeft /> Back
            </Link>
            <img src={MobileIcon} alt="" className="mobileIcon img-fluid" />
            <p className="text-dark font-weight-bold">Verify OTP</p>
            <form className="" action="#" onSubmit={varifyOtp}>
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
                <small className="text-danger mx-2 mt-1">{otpErrorMsg}</small>
              </div>
              <button type="submit" className="customButton col-12">
                Verify OTP
              </button>
            </form>
            <p className="mt-3 fs12px text-center">
              Don’t receive the OTP? {counter}<button className={`${counter === 0 && "logoBlueColor"} crPointer fs12px border-0 bg-transparent`} disabled={(counter > 0)} onClick={resendOtp}>Resend OTP</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Otp;
