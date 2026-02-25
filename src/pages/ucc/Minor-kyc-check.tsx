import LoginLeftImage from "../../components/LoginLeftImage";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { errorToast } from "../../services/utils/toast";
import { getRequest, postRequestSimple } from "../../services/Api/HandleApi";
import { endPoints } from "../../services/utils/urls";
import { initiateKycResponse, kycStatusResponse } from "../data-interfaces/kyc";
import { fetchAdminUser } from "../../services/user/adminUser";
import { uccDataRes } from "../data-interfaces/ucc";

const MinorKycCheck = () => {
  const [minorName, setMinorName] = useState<string>("");
  const [userPan, setUserPan] = useState<string>("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [kySuccessMsg, setKySuccessMsg] = useState<string>("");
  const [noKycMsg, setNoKycMsg] = useState<string>("");
  const [isKycCompliant, setIsKycCompliant] = useState<boolean>(false);
  const navigate = useNavigate();

  const completeKyc = async (pan: string) => {
    if (!pan) {
      setNoKycMsg("Please enter your PAN number to proceed.");
      return;
    }
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (panRegex.test(pan)) {
      try {
        setIsLoader(true);
        const response = await getRequest<kycStatusResponse>(
          `${endPoints.checkKycStatus}?pan_number=${pan}`
        );
        if (response.data.kyc_status) {
          setIsKycCompliant(response.data.kyc_status);
          setKySuccessMsg("Congratulations! 🎉 You are KYC Compliant");
          setIsLoader(false);
        } else if (!response.data.kyc_status) {
          setIsKycCompliant(false);
          setNoKycMsg("Sorry! 😔 You are not KYC Compliant");
          setKySuccessMsg("");
          setIsLoader(false);
        }
      } catch (err) {
        setKySuccessMsg("");
        setNoKycMsg("");
        setIsLoader(false);
        errorToast(err);
      }
    } else {
      setKySuccessMsg("");
      setNoKycMsg("");
      errorToast("Invalid PAN format. Please enter a valid PAN number.");
    }
  };

  const proceedForKyc = async (e: React.FormEvent) => {
    e.preventDefault();
    const adminUser = fetchAdminUser();
    if (isKycCompliant) {
      try {
        const reqBody = {
          tax_status: 1,
          holding_nature: "SI",
          primary_pan: userPan,
          mobile_number: adminUser?.mobile,
        };
        const res = await postRequestSimple<uccDataRes>(endPoints.initiateUcc, reqBody);
        if (res.success && res.data?.reference_id) {
          navigate(`/personal-details?reference_id=${res.data.reference_id}`);
        }
      } catch (err) {
        errorToast(err);
      }
    } else {
      try {
        if (!adminUser) return;
        const response = await getRequest<initiateKycResponse>(
          `${endPoints.initiateKyc}?pan_number=${userPan}`
        );
        if (response.data.success) {
          const hyperKycConfig = new window.HyperKycConfig(
            response.data.access_token,
            response.data.workflow_id,
            response.data.transactionId,
            true
          );
          hyperKycConfig.setInputs({
            panNumber: userPan,
            mobileNumber: adminUser?.mobile || "",
            kraStatus: "new",
          });
          hyperKycConfig.setUniqueId(response.data.unique_id);
          hyperKycConfig.setUseLocation(false);
          hyperKycConfig.setDefaultLangCode("en");
          await window.HyperKYCModule.launch(hyperKycConfig, (event: any) => {
            console.log("HyperKYC Event:", event);
          });
        }
      } catch (err) {
        console.log("Error initiating KYC:", err);
      }
    }
  };

  const panHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pan = e.target.value.toUpperCase();
    if (pan.length < 11) {
      setUserPan(pan.trim());
    }
    if (pan.length === 10) {
      completeKyc(pan);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row login_hight_fixed">
        <LoginLeftImage />
        <div className="col-12 col-md-6 align-self-center">
          <div className="mrgin_With20">
            {/* Back Button */}
            <Link
              className="back_absolute_btn text-decoration-none d-inline-flex align-items-center gap-1"
              style={{ color: "#1a34fe", fontWeight: 500, fontSize: "14px" }}
              to="/"
            >
              <ArrowLeft /> Back
            </Link>

            {/* Dashed Blue Card */}
            <div
              style={{
                border: "1.5px dashed #93c5fd",
                borderRadius: "12px",
                padding: "24px 20px",
                marginTop: "24px",
              }}
            >
              {/* Title */}
              <h5
                style={{
                  fontWeight: "800",
                  fontSize: "20px",
                  color: "#111827",
                  marginBottom: "4px",
                }}
              >
                Are you investment ready?
              </h5>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "13px",
                  marginBottom: "20px",
                }}
              >
                Know it within the seconds
              </p>

              <form onSubmit={proceedForKyc}>
                {/* Minor Investor Name */}
                <div style={{ marginBottom: "18px" }}>
                  <label
                    style={{
                      fontSize: "10px",
                      fontWeight: "700",
                      letterSpacing: "0.08em",
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Minor Investor Name
                  </label>
                  <input
                    type="text"
                    value={minorName}
                    onChange={(e) => setMinorName(e.target.value)}
                    style={{
                      width: "100%",
                      border: "none",
                      borderBottom: "1.5px solid #d1d5db",
                      outline: "none",
                      fontSize: "15px",
                      padding: "6px 0",
                      background: "transparent",
                      color: "#111827",
                      boxSizing: "border-box",
                    }}
                    placeholder="Ravi Krishna"
                  />
                </div>

                {/* Guardian's PAN */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      fontSize: "10px",
                      fontWeight: "700",
                      letterSpacing: "0.08em",
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Guardian's PAN
                  </label>
                  <input
                    type="text"
                    value={userPan}
                    onChange={panHandler}
                    style={{
                      width: "100%",
                      border: "none",
                      borderBottom: "1.5px solid #d1d5db",
                      outline: "none",
                      fontSize: "15px",
                      padding: "6px 0",
                      background: "transparent",
                      color: "#111827",
                      boxSizing: "border-box",
                    }}
                    placeholder="DFPOL7895W"
                  />
                </div>

                {/* Status Messages */}
                {kySuccessMsg && (
                  <p
                    style={{
                      color: "#16a34a",
                      fontWeight: "600",
                      fontSize: "13px",
                      marginBottom: "12px",
                    }}
                  >
                    {kySuccessMsg}
                  </p>
                )}
                {noKycMsg && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontWeight: "600",
                      fontSize: "13px",
                      marginBottom: "12px",
                    }}
                  >
                    {noKycMsg}
                  </p>
                )}

                {/* Full-width Proceed Button */}
                <button
                  type="submit"
                  disabled={isLoader}
                  style={{
                    width: "100%",
                    backgroundColor: "#1a34fe",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "13px",
                    fontWeight: "600",
                    fontSize: "15px",
                    cursor: isLoader ? "not-allowed" : "pointer",
                    opacity: isLoader ? 0.7 : 1,
                    letterSpacing: "0.01em",
                  }}
                >
                  {isLoader ? "Processing..." : "Proceed"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinorKycCheck;
