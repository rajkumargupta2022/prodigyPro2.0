import LoginLeftImage from "../../components/LoginLeftImage";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { errorToast } from "../../services/utils/toast";
import { getRequest, postRequest, postRequestSimple } from "../../services/Api/HandleApi";
import { endPoints } from "../../services/utils/urls";
import { fetchKycDataRes, initiateKycResponse, kycStatusResponse } from "../data-interfaces/kyc";
import { fetchAdminUser } from "../../services/user/adminUser";
import { uccDataRes } from "../data-interfaces/ucc";



const PanVarification = () => {
  const [searchParams] = useSearchParams();
  // const reference_id = searchParams.get("reference_id") ?? "";
  const tax_status = searchParams.get("tax_status") ?? "";
  const holding_nature = searchParams.get("holding_nature") ?? "";
  // const holder = searchParams.get("holder") as keyof uccDataResKeys;
  const [userPan, setUserPan] = useState<string>("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [kySuccessMsg, setKySuccessMsg] = useState<string>("");
  const [noKycMsg, setNoKycMsg] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [btnName, setBtnName] = useState<string>("");
  const [isKycCompliant, setIsKycCompliant] = useState<boolean>(false);
  const navigate = useNavigate()

  const completeKyc = async (pan: string) => {

    if (!pan) {
      setNoKycMsg("Please enter your PAN number to proceed.");
      return
    }
    setIsKycCompliant(false);
    setNoKycMsg("Sorry! 😔 You are not KYC Compliant");
    setKySuccessMsg("");
    setDescription("");
    setBtnName("Start KYC Verification");
    setIsLoader(false);
    return
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (panRegex.test(pan)) {
      try {

        setIsLoader(true);
        const response = await getRequest<kycStatusResponse>(`${endPoints.checkKycStatus}?pan_number=${pan}`);

        if (response.data.kyc_status) {
          setIsKycCompliant(response.data.kyc_status)
          setKySuccessMsg("Congratulations! 🎉 You are KYC Compliant");
          setDescription("Your KYC details have been successfully verified.");
          setBtnName("Start Your Investment Journey!");
          setIsLoader(false)
        } else if (!response.data.kyc_status) {
          setIsKycCompliant(false)
          setNoKycMsg("Sorry! 😔 You are not KYC Compliant");
          setKySuccessMsg(""); // Clear success message if not compliant
          setDescription("Please complete the KYC process to proceed.");
          setBtnName("Start KYC Verification");
          setIsLoader(false)
        }
      } catch (err) {
        setKySuccessMsg("")
        setNoKycMsg("")
        setDescription("")
        setBtnName("")
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


    const adminUser = fetchAdminUser()
    if (isKycCompliant) {
      try {
        const adminUser = fetchAdminUser()
        const reqBody: any = {
          tax_status: tax_status, // RI / Minor
          holding_nature: holding_nature, // SI / AS
          mobile_number: adminUser?.mobile, // (10 digits)
        };
        if (String(tax_status) === "2") {
          reqBody.guardian_pan = adminUser?.pan;
        } else {
          reqBody.primary_pan = adminUser?.pan;
        }
        const res = await postRequestSimple<uccDataRes>(endPoints.initiateUcc, reqBody)
        if (res.success && res.data?.reference_id) {
          navigate(
            `/personal-details?reference_id=${res.data.reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${userPan}&holder=${"primary_user"}`
          );
        }

      } catch (err) {
        errorToast(err)
      }

    } else {
      try {
        if (!adminUser) {
          return
        }
        const response = await getRequest<initiateKycResponse>(`${endPoints.initiateKyc}?pan_number=${userPan}`);
        if (response.data.success) {
          const hyperKycConfig = new window.HyperKycConfig(
            response.data.access_token,
            response.data.workflow_id,
            response.data.transactionId,
            true
          );
          // setInputs is optional, you can skip it if your workflow doesn't require any inputs
          hyperKycConfig.setInputs({
            'panNumber': userPan,
            'mobileNumber': adminUser?.mobile || "",
            'kraStatus': 'new',
          });
          hyperKycConfig.setUniqueId(response.data.unique_id)
          // setUseLocation is optional
          hyperKycConfig.setUseLocation(false);
          // setDefaultLangCode is optional
          hyperKycConfig.setDefaultLangCode('en');
          console.log('INITIATE DATA:', hyperKycConfig);
          await window.HyperKYCModule.launch(hyperKycConfig, (event: any) => {
            console.log('HyperKYC Event:', event);
            switch (event.status) {
              case "user_cancelled":
                setIsKycCompliant(false);
                setNoKycMsg("Sorry! 😔 You are not KYC Compliant");
                setKySuccessMsg("");
                setDescription("You have cancelled the KYC process. Please complete the KYC process to proceed.");
                setBtnName("Start KYC Verification");
                setIsLoader(false);
                
                break;
              case "error":
                setIsKycCompliant(false);
                setNoKycMsg("Something went wrong!");
                setKySuccessMsg("");
                setDescription("There appears to be a temporary technical problem. Please re-submit your KYC. If the issue continues, you may contact our customer support team for assistance.");
                setBtnName("Start KYC Verification");
                setIsLoader(false);
                break;
              case "auto_approved":
                setIsKycCompliant(true);
                setKySuccessMsg("Congratulations! 🎉 Your KYC is Approved");
                setNoKycMsg("");
                setDescription("Your KYC details have been successfully verified.");
                setBtnName("Start Your Investment Journey!");
                fetchKycData(response.data.transactionId)
                setIsLoader(false);
                break;
              case "auto_declined":
                setIsKycCompliant(false);
                setNoKycMsg("KYC Application Rejected");
                setKySuccessMsg("");
                setDescription("There appears to be an issue with the information you submitted. Please re-submit your KYC. If the issue continues, you may contact our customer support team for assistance.");
                setBtnName("Retry Verification");
                setIsLoader(false);
                break;
              case "needs_review":
                setIsKycCompliant(true);
                setKySuccessMsg("Your KYC is Under Review");
                setNoKycMsg("");
                setDescription("Your KYC details have been received and are currently being reviewed by our internal team. Meanwhile, you can continue with the Investor account opening process.");
                setBtnName("Start Your Investment Journey!");
                fetchKycData(response.data.transactionId)
                setIsLoader(false);
                break;
              default:
                setIsKycCompliant(false);
                setNoKycMsg("Something went wrong!");
                setKySuccessMsg("");
                setDescription("There appears to be a temporary technical problem. Please re-submit your KYC. If the issue continues, you may contact our customer support team for assistance.");
                setBtnName("Start KYC Verification");
                setIsLoader(false);
                break;
            }
          });

        }

      } catch (err) {
        console.log('Error initiating KYC:', err);
      }
    }
  }
     const fetchKycData = async (transactionId: string) => {
      try {
        const response = await postRequest<fetchKycDataRes>(endPoints.fetchData, { transactionId });
        if(response.success && response.data) {
        }
      } catch (error) {
        console.error("Error fetching KYC data:", error);
       
      }
    };


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
        <LoginLeftImage />
        <div className="col-12 col-md-6 align-self-center position-relative">
          <div className="mrgin_With20">
            {/* <Link className="back_absolute_btn text-decoration-none" to="/">
              <ArrowLeft /> Back
            </Link> */}
            {/* <img src={MobileIcon}  alt="" className="mobileIcon img-fluid" /> */}
            <h6 className="text-dark font-weight-bold">
              Are you investment ready?
            </h6>
              <p className="pb-1 fs12px">Know it within the seconds</p>

              {/* <label className="form-label fs12px">PAN</label> */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={userPan ?? ""}
                  onChange={panHandler}
                  className="form-control mx-1 rounded"
                  placeholder={`${String(tax_status) === "2" ? "Enter Guardian PAN" : "Enter PAN"}`}
                />
              </div>
              {kySuccessMsg && <h4 className="fs14px congratesColor font-weight-bold">{kySuccessMsg}</h4>}
              {noKycMsg && <h4 className="fs14px errorColor font-weight-bold">{noKycMsg}</h4>}
              {description && <p className="fs12px text-secondary">{description}</p>}

              {/* <p className="errorColor sm ">
                We do not have your details with us. You need to register to
                start your investment journey Please share your details and you
                are all set for investing
              </p> */}
              <button type="button" className="customButton col-12 mt-3" onClick={proceedForKyc} disabled={isLoader}>
                {isLoader ? "Processing..." : btnName || "Proceed"}
              </button>
       
          </div>
        </div>
      </div>
    </div>
  );
};
export default PanVarification;
