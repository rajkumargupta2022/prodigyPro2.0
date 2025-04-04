import LoginLeftImage from "../components/LoginLeftImage";
import leftImage from "../assets/img/rich.svg";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getRequest } from "../services/callApi";
import { endPoints } from "../services/urls";
import { toast } from "react-toastify";
import { errorToast } from "../services/toast";

interface responseType {
  success: boolean;
  data: {
    url: string;
    requestId: string;
  };
  msg: string;
}

const PanVarification = () => {
  const navigate = useNavigate();
  const [userPan, setUserPan] = useState<string>("");
  const [panMessage, setPanMessage] = useState<string>(
    "Your are not KYC Compliant"
  );

  const completeKyc = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!userPan){
        setPanMessage("Pan is mandorty!")
        return
    }
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (panRegex.test(userPan)) {
      try {
        const response = await getRequest<responseType>(
          endPoints.requestKycLink
        );
        localStorage.setItem("requestId", response.data.requestId);
        window.open(response.data.url);
      } catch (err) {
        errorToast(err);
      }
    } else {
      setPanMessage("Pan Is Invalid:)");
    }

    // navigate("/personal-details");
  };

  const panHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pan = e.target.value.toUpperCase();
    if (pan.length < 11) {
      setUserPan(pan.trim());
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
            {/* <img src={MobileIcon}  alt="" className="mobileIcon img-fluid" /> */}
            <h6 className="text-dark font-weight-bold">
              Are you investment ready?
            </h6>
            <form className="" action="#" onSubmit={completeKyc}>
              <p className="pb-1 fs12px">Know it within the seconds</p>

              <label className="form-label fs12px">PAN NUMBER</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={userPan ?? ""}
                  onChange={panHandler}
                  className="form-control mx-1 rounded"
                  placeholder="Enter Pan"
                />
              </div>
              <h4 className="fs14px congratesColor font-weight-bold">
                Congratulations! 🎉 You are KYC Compliant
              </h4>
              <h4 className="congratesColor font-weight-bold errorColor">
                {panMessage}
              </h4>
              <p className="errorColor sm ">
                We do not have your details with us. You need to register to
                start your investment journey Please share your details and you
                are all set for investing
              </p>
              <button type="submit" className="customButton col-12 mt-3">
                Proceed
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PanVarification;
