import LoginLeftImage from "../../components/LoginLeftImage";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { errorToast } from "../../services/utils/toast";
import { getRequest, postRequest, postRequestSimple } from "../../services/Api/HandleApi";
import { endPoints } from "../../services/utils/urls";
import { fetchKycDataRes, initiateKycResponse, kycStatusResponse } from "../data-interfaces/kyc";
import { fetchAdminUser } from "../../services/user/adminUser";
import { uccDataRes, uccDataResKeys } from "../data-interfaces/ucc";
// import KycStatusMsg from "./Kyc-status-msg";
// import correct from "../../assets/img/correct.png";
// import underReview from "../../assets/img/icons/under-review.svg";
// import submit from "../../assets/img/icons/submit.svg";
// import errorImg from "../../assets/img/icons/failed-icon.png";


type HolderStatus = "pending" | "active" | "completed";

interface Holder {
  holder: string;
  label: string;
  status: HolderStatus;
  pan: string;
  isKycCompliant: boolean | null; // null = not checked yet
  kycMsg: string;
  kycSuccess: boolean;
  description?: string;
  isLoader: boolean;
  btnName?: string;
}
// interface kycMsgObj {
//   firstColor: string;
//   secondColor: string;
//   heading: string;
//   description_1?: string;
//   description_2?: string;
//   name?: string;
//   pan?: string;
//   taxStatus?: string;
//   image: string;
//   url?: string;
//   footerMsg?: string
//   btnName?: string
// }
const KycStatusCheck = () => {
  const navigate = useNavigate();

  // const msgObj ={
  //     firstColor: string;
  // secondColor: string;
  // heading:string;
  // description_1?:string;
  // description_2?:string;
  // name?:string;
  // pan?:string;
  // taxStatus?:string;
  // }

  const [searchParams] = useSearchParams();
  const reference_id = searchParams.get("reference_id") ?? "";
  const tax_status = searchParams.get("tax_status") ?? "";
  const holding_nature = searchParams.get("holding_nature") ?? "";
  const pan = searchParams.get("pan") ?? "";
  const holder = searchParams.get("holder") as keyof uccDataResKeys;
  const [kycTransactionId, setKycTransactionId] = useState<string>("")

  const active = "active";
  const pending = "pending";
  const completed = "completed";
  const [holders, setHolders] = useState<Holder[]>([
    { holder: "primary_user", label: "Primary Holder", status: active, pan: "", isKycCompliant: null, kycMsg: "", description: "", kycSuccess: false, isLoader: false },
    { holder: "secondary_user", label: "Second Holder", status: pending, pan: "", isKycCompliant: null, kycMsg: "", description: "", kycSuccess: false, isLoader: false },
    { holder: "third_user", label: "Third Holder", status: pending, pan: "", isKycCompliant: null, kycMsg: "", description: "", kycSuccess: false, isLoader: false },
  ]);


  useEffect(() => {

    if (reference_id) {
      fetchUccData()

    }
  }, [])

  const fetchUccData = async () => {
    try {
      const response = await postRequest<uccDataRes>(endPoints.initiateUcc, { reference_id });
      const data = response.data;
      if (response.success && data) {
        setHolders((prev) => {
          const updated = [...prev];

          // Function to set a holder's status and data
          const setHolderCompleted = (index: number, userData: any) => {
            updated[index] = {
              ...updated[index],
              status: completed,
              pan: userData?.personal_details?.pan || updated[index].pan,
              isKycCompliant: true,
              kycSuccess: true
            };
          };

          if (holder === "primary_user") {
            setHolderCompleted(0, data.primary_user);
            updated[1] = { ...updated[1], status: active };
          } else if (holder === "secondary_user") {
            setHolderCompleted(0, data.primary_user);
            setHolderCompleted(1, data.secondary_user);
            updated[2] = { ...updated[2], status: active };
          } else if (holder === "third_user") {
            setHolderCompleted(0, data.primary_user);
            setHolderCompleted(1, data.secondary_user);
            setHolderCompleted(2, data.third_user);
          } else {
            // Default Case: No holder or initial entry
            updated[0] = { ...updated[0], status: active };
            updated[1] = { ...updated[1], status: pending };
            updated[2] = { ...updated[2], status: pending };
          }

          return updated;
        });
      }
    } catch (err) {
      errorToast(err);
    }
  }

  const updateHolder = (index: number, partial: Partial<Holder>) => {
    setHolders((prev) => prev.map((h, i) => (i === index ? { ...h, ...partial } : h)));
  };

  const checkKycStatus = async (index: number, pan: string) => {
    if (!pan) {
      updateHolder(index, { kycMsg: "Please enter your PAN number to proceed.", kycSuccess: false, isKycCompliant: null });
      return;
    }
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (!panRegex.test(pan)) {
      updateHolder(index, { kycMsg: "", kycSuccess: false, isKycCompliant: null });
      errorToast("Invalid PAN format. Please enter a valid PAN number.");
      return;
    }

    updateHolder(index, { isLoader: true, kycMsg: "", kycSuccess: false });
    try {
      updateHolder(index, {
        isKycCompliant: false,
        kycMsg: "Sorry! 😔 You are not KYC Compliant",
        description: "",
        btnName: "Start KYC Verification",
        kycSuccess: false,
        isLoader: false,
      });
      return
      const response = await getRequest<kycStatusResponse>(
        `${endPoints.checkKycStatus}?pan_number=${pan}`
      );
      if (response.data.kyc_status) {
        updateHolder(index, {
          isKycCompliant: true,
          kycMsg: "Congratulations! 🎉 You are KYC Compliant",
          description:"",
          btnName: "Start Your Investment Journey!",
          kycSuccess: true,
          isLoader: false,
        });
      } else {
        updateHolder(index, {
          isKycCompliant: false,
          kycMsg: "You are not KYC Compliant",
          description: "We couldn’t find your KYC details. Please complete your KYC to begin your investment journey.",
          kycSuccess: false,
          btnName: "Start KYC Verification",
          isLoader: false,
        });
      }
    } catch (err) {
      updateHolder(index, { isLoader: false, kycMsg: "", kycSuccess: false, isKycCompliant: null });
      errorToast(err);
    }
  };

  const handlePanChange = (index: number, value: string) => {
    const pan = value.toUpperCase().trim();
    if (pan.length > 10) return;
    updateHolder(index, { pan, kycMsg: "", kycSuccess: false, isKycCompliant: null });
    if (pan.length === 10) {
      checkKycStatus(index, pan);
    }
  };

  const handleProceed = async (index: number) => {
    const holder = holders[index];
    // const { pan, isKycCompliant } = holder;

    if (!holder?.pan) {
      updateHolder(index, { kycMsg: "Please enter your PAN to proceed.", kycSuccess: false });
      return;
    }
    if (holder.isKycCompliant === null) {
      updateHolder(index, { kycMsg: "Please wait while we verify your PAN.", kycSuccess: false });
      return;
    }
      if (pan===holder.pan) {
      updateHolder(index, { kycMsg: "Pan can not be same from the primary holder or second holder", kycSuccess: false });
      return;
    }



    const adminUser = fetchAdminUser();

    if (holder.isKycCompliant) {
      const adminUser = fetchAdminUser()
      try {
        const reqBody = {
          tax_status: tax_status,
          holding_nature: holding_nature,
          primary_pan: adminUser?.pan,
          mobile_number: adminUser?.mobile,
        };
        const res = await postRequestSimple<uccDataRes>(endPoints.initiateUcc, reqBody);
        if (res.success && res.data?.reference_id) {
          navigate(
            `/personal-details?reference_id=${res.data.reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${holder?.pan}&holder=${holder.holder}`
          );
        }
      } catch (err) {
        errorToast(err);
      }
    } else {
      try {
        if (!adminUser) return;
        const response = await getRequest<initiateKycResponse>(
          `${endPoints.initiateKyc}?pan_number=${holder?.pan}`
        );
        if (response.data.success) {
          setKycTransactionId(response.data.transactionId)
          const hyperKycConfig = new window.HyperKycConfig(
            response.data.access_token,
            response.data.workflow_id,
            response.data.transactionId,
            true
          );
          hyperKycConfig.setInputs({
            panNumber: holder?.pan || "",
            mobileNumber: adminUser?.mobile || "",
            kraStatus: "new",
          });
          hyperKycConfig.setUniqueId(response.data.unique_id);
          hyperKycConfig.setUseLocation(true);
          hyperKycConfig.setDefaultLangCode("en");
          await window.HyperKYCModule.launch(hyperKycConfig, (event: any) => {
            console.log("HyperKYC Event:", event);
            switch (event.status) {
              case "user_cancelled":
                console.log("User cancelled the workflow");
                updateHolder(index, {
                  isKycCompliant: false,
                  kycMsg: "KYC application rejected",
                  description: "There appears to be an issue with the information you submitted. Please re-submit your KYC. If the issue continues, you may contact our customer support team for assistance.",
                  btnName: "Retry Verification",
                  kycSuccess: false,
                  isLoader: false,
                });
                break;
              case "error":
                updateHolder(index, {
                  isKycCompliant: false,
                  kycMsg: "Something went wrong!",
                  description: "There appears to be a temporary technical problem.<br/>Please re-submit your KYC. If the issue continues, you may contact our customer support team for assistance.",
                  btnName: "Start KYC Verification",
                  kycSuccess: false,
                  isLoader: false,
                });
                break;
              case "auto_approved":
                updateHolder(index, {
                  isKycCompliant: true,
                  kycMsg: "Congratulations!",
                  description: "Your KYC details have been successfully submitted to the KRA. While the verification is in progress, you can continue with the Investor account opening process.",
                  btnName: "Start Your Investment Journey!",
                  kycSuccess: true,
                  isLoader: false,
                });
                fetchKycData(response.data.transactionId)
                break;
              case "auto_declined":
                updateHolder(index, {
                  isKycCompliant: false,
                  kycMsg: "KYC Application Rejected",
                  description: "There appears to be an issue with the information you submitted. Please re-submit your KYC. If the issue continues, you may contact our customer support team for assistance.",
                  btnName: "Retry Verification",
                  kycSuccess: false,
                  isLoader: false,
                });
                break;
              case "needs_review":
                updateHolder(index, {
                  isKycCompliant: true,
                  kycMsg: "Your KYC is Under Review",
                  description: "Your KYC details have been received and are currently being reviewed by our internal team. <br/>Meanwhile, you can continue with the Investor account opening process.",
                  btnName: "Start Your Investment Journey!",
                  kycSuccess: true,
                  isLoader: false,
                });
                fetchKycData(response.data.transactionId)
                break;
              default:
                updateHolder(index, {
                  isKycCompliant: false,
                  kycMsg: "Something went wrong!",
                  description: "There appears to be a temporary technical problem.<br/>Please re-submit your KYC. If the issue continues, you may contact our customer support team for assistance.",
                  btnName: "Start KYC Verification",
                  kycSuccess: false,
                  isLoader: false,
                });
                break;
            }

          });
        }
      } catch (err) {
        console.log("Error initiating KYC:", err);
        errorToast(err);
      }
    }
  };
  const fetchKycData = async (transaction_id: string) => {
    try {
      const response = await postRequest<fetchKycDataRes>(endPoints.fetchData, { transaction_id });
      if (response.success && response.data) {
      }
    } catch (error) {
      console.error("Error fetching KYC data:", error);

    }
  };


  const skipHolder = () => {
    navigate(
      `/nomination-details?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}&transactionId=${kycTransactionId}`
    );
  }

  // Green filled circle with white tick
  const CompletedIcon = () => (
    <span
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        backgroundColor: "#16a34a",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  // Orange clock icon
  const ClockIcon = () => (
    <span
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        backgroundColor: "#f59e0b",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
        <polyline points="12 7 12 12 15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  const getIcon = (status: HolderStatus) => {
    if (status === completed) return <CompletedIcon />;
    return <ClockIcon />;
  };

  return (
    <div className="container-fluid">
      {/* <KycStatusMsg show={show} setShow={setShow} kycMsg={kycMsg} /> */}
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

            {/* Title */}
            <h4
              style={{
                fontWeight: "800",
                fontSize: "22px",
                color: "#111827",
                marginTop: "24px",
                marginBottom: "4px",
              }}
            >
              Are you Investment Ready?
            </h4>
            <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "20px" }}>
              Know it within the seconds
            </p>

            {/* Steps Container */}
            <div style={{ position: "relative" }}>
              {holders.map((holder, index) => {
                const isLast = index === holders.length - 1;
                return (
                  <div
                    key={index}
                    style={{ display: "flex", gap: "14px", position: "relative" }}
                  >
                    {/* Icon + Connector Line Column */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {getIcon(holder.status)}
                      {!isLast && (
                        <div
                          style={{
                            width: "2px",
                            flex: 1,
                            minHeight: "20px",
                            backgroundColor:
                              holder.status === completed ? "#16a34a" : "#e5e7eb",
                            marginTop: "4px",
                            marginBottom: "4px",
                          }}
                        />
                      )}
                    </div>

                    {/* Right Content Column */}
                    <div style={{ flex: 1, paddingBottom: isLast ? "0" : "16px" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                          style={{
                            fontWeight: "700",
                            fontSize: "15px",
                            color: "#111827",
                            lineHeight: "28px",
                          }}
                        >
                          {holder.label}
                        </span>
                        {holder.status === completed && (
                          <span
                            style={{
                              fontSize: "12px",
                              color: "#6b7280",
                              marginTop: "0px",
                              marginBottom: "4px",
                            }}
                          >
                            KYC Completed
                          </span>
                        )}
                      </div>

                      {/* Active Form */}
                      {holder.status === active && (
                        <div style={{ marginTop: "10px" }}>
                          {/* PAN Label */}
                          <label
                            className="panLabel"
                          >
                            PAN NUMBER
                          </label>

                          {/* PAN Input */}
                          <input
                            type="text"
                            value={holder.pan}
                            onChange={(e) => handlePanChange(index, e.target.value)}
                            className="pan-input"
                            placeholder=""
                            maxLength={10}
                          />

                          {/* KYC Status Messages */}
                          {holder.isLoader && (
                            <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>
                              Checking KYC status...
                            </p>
                          )}
                          {!holder.isLoader && holder.kycSuccess && (
                            <p style={{ fontSize: "13px", color: "#16a34a", fontWeight: "600", marginBottom: "8px" }}>
                              {holder.kycMsg}
                            </p>
                          )}
                          {!holder.isLoader && !holder.kycSuccess && holder.kycMsg && (
                            <p style={{ fontSize: "13px", color: "#dc2626", fontWeight: "600", marginBottom: "8px" }}>
                              {holder.kycMsg}
                            </p>
                          )}
                          {holder.description && (
                            <p className="fs12px" dangerouslySetInnerHTML={{ __html: holder.description }} />
                          )}
                          {/* Proceed Button */}
                          <button
                            type="button"
                            onClick={() => handleProceed(index)}
                            disabled={holder.isLoader || holder.isKycCompliant === null}
                            style={{
                              backgroundColor:
                                holder.isLoader || holder.isKycCompliant === null
                                  ? "#9ca3af"
                                  : "#1a34fe",
                              color: "#fff",
                              border: "none",
                              borderRadius: "50px",
                              padding: "6px 22px",
                              fontWeight: "500",
                              fontSize: "14px",
                              cursor:
                                holder.isLoader || holder.isKycCompliant === null
                                  ? "not-allowed"
                                  : "pointer",
                              letterSpacing: "0.01em",
                            }}
                          >
                            {holder.isLoader ? "Checking..." : holder.btnName || "Proceed"}
                          </button>
                          {holder.holder === "third_user" && (

                            <button
                              type="button"
                              className="skipBtn mx-2"
                              onClick={skipHolder}

                            >
                              Skip
                            </button>)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycStatusCheck;
