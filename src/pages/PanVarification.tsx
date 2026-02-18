import LoginLeftImage from "../components/LoginLeftImage";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { errorToast } from "../services/utils/toast";
import { getRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { initiateKycResponse, kycStatusResponse } from "./data-interfaces/kyc";



const PanVarification = () => {
  const [userPan, setUserPan] = useState<string>("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [kySuccessMsg, setKySuccessMsg] = useState<string>("");
  const [noKycMsg, setNoKycMsg] = useState<string>("");
  const [isKycCompliant, setIsKycCompliant] = useState<boolean>(false);
  const navigate = useNavigate()

  const completeKyc = async (pan: string) => {

    if (!pan) {
      setNoKycMsg("Please enter your PAN number to proceed.");
      return
    }
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (panRegex.test(pan)) {
      try {
        setIsLoader(true);
        const response = await getRequest<kycStatusResponse>(`${endPoints.checkKycStatus}?pan_number=${pan}`);
        if (response.data.kyc_status) {
          setIsKycCompliant(response.data.kyc_status)
          setKySuccessMsg("Congratulations! 🎉 You are KYC Compliant");
          setIsLoader(false)
        } else if (!response.data.kyc_status) {
          setNoKycMsg("Sorry! 😔 You are not KYC Compliant");
          setKySuccessMsg("") // Clear success message if not compliant
          setIsLoader(false)
        }
      } catch (err) {
        setKySuccessMsg("")
        setNoKycMsg("")
        setIsLoader(false);
        errorToast(err);
      }
    } else {
      setKySuccessMsg("")
      setNoKycMsg("")
      errorToast("Invalid PAN format. Please enter a valid PAN number.");
    }

    // navigate("/personal-details");
  };

  const proceedForKyc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isKycCompliant) {
      navigate("/personal-details");
    } else {
      try {

        const response = await getRequest<initiateKycResponse>(`${endPoints.initiateKyc}?pan_number=${userPan}`);
        if (response.data.success) {
          const hyperKycConfig = new window.HyperKycConfig(
            response.data.access_token,   
            response.data.workflow_id,    
            response.data.transactionId,  
            true                          
          );
          console.log('INITIATE DATA:', hyperKycConfig);
          await window.HyperKYCModule.launch(hyperKycConfig, (event: any) => {
            console.log('HyperKYC Event:', event);

          });

        }

      } catch (err) {
        console.log('Error initiating KYC:', err);
      }
    }
  }


  const panHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pan = e.target.value.toUpperCase();
    if (pan.length < 11) {
      setUserPan(pan.trim());
    }
    if (pan.length === 10) {
      completeKyc(pan)
    }
  };

  return (
    <div className="container-fluid">
      <div className="row login_hight_fixed">
        <LoginLeftImage  />
        <div className="col-12 col-md-6 align-self-center position-relative">
          <div className="mrgin_With20">
            <Link className="back_absolute_btn text-decoration-none" to="/">
              <ArrowLeft /> Back
            </Link>
            {/* <img src={MobileIcon}  alt="" className="mobileIcon img-fluid" /> */}
            <h6 className="text-dark font-weight-bold">
              Are you investment ready?
            </h6>
            <form className="" action="#" onSubmit={proceedForKyc} >
              <p className="pb-1 fs12px">Know it within the seconds</p>

              {/* <label className="form-label fs12px">PAN</label> */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={userPan ?? ""}
                  onChange={panHandler}
                  className="form-control mx-1 rounded"
                  placeholder="Enter PAN"
                />
              </div>
              {kySuccessMsg && <h4 className="fs14px congratesColor font-weight-bold">{kySuccessMsg}</h4>}
              {noKycMsg && <h4 className="fs14px errorColor font-weight-bold">{noKycMsg}</h4>}

              {/* <p className="errorColor sm ">
                We do not have your details with us. You need to register to
                start your investment journey Please share your details and you
                are all set for investing
              </p> */}
              <button type="submit" className="customButton col-12 mt-3" disabled={isLoader}>
                {isLoader ? "Processing..." : "Proceed"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PanVarification;
