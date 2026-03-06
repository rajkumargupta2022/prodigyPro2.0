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

type HolderStatus = "pending" | "active" | "completed";

interface Holder {
  label: string;
  status: HolderStatus;
  pan: string;
  isKycCompliant: boolean | null; // null = not checked yet
  kycMsg: string;
  kycSuccess: boolean;
  isLoader: boolean;
}

const KycStatusCheck = () => {
  const navigate = useNavigate();

  const [holders, setHolders] = useState<Holder[]>([
    { label: "Primary Holder", status: "active", pan: "", isKycCompliant: null, kycMsg: "", kycSuccess: false, isLoader: false },
    { label: "Second Holder", status: "pending", pan: "", isKycCompliant: null, kycMsg: "", kycSuccess: false, isLoader: false },
    { label: "Third Holder", status: "pending", pan: "", isKycCompliant: null, kycMsg: "", kycSuccess: false, isLoader: false },
  ]);

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
      const response = await getRequest<kycStatusResponse>(
        `${endPoints.checkKycStatus}?pan_number=${pan}`
      );
      if (response.data.kyc_status) {
        updateHolder(index, {
          isKycCompliant: true,
          kycMsg: "Congratulations! 🎉 You are KYC Compliant",
          kycSuccess: true,
          isLoader: false,
        });
      } else {
        updateHolder(index, {
          isKycCompliant: false,
          kycMsg: "Sorry! 😔 You are not KYC Compliant",
          kycSuccess: false,
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
    const { pan, isKycCompliant } = holder;

    if (!pan) {
      updateHolder(index, { kycMsg: "Please enter your PAN number to proceed.", kycSuccess: false });
      return;
    }
    if (isKycCompliant === null) {
      updateHolder(index, { kycMsg: "Please wait while we verify your PAN.", kycSuccess: false });
      return;
    }

    const tax_status = 1;
    const holding_nature = "SI";
    const adminUser = fetchAdminUser();

    if (isKycCompliant) {
      try {
        const reqBody = {
          tax_status: 1,
          holding_nature: "SI",
          primary_pan: pan,
          mobile_number: adminUser?.mobile,
        };
        const res = await postRequestSimple<uccDataRes>(endPoints.initiateUcc, reqBody);
        if (res.success && res.data?.reference_id) {
          navigate(
            `/personal-details?reference_id=${res.data.reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}`
          );
        }
      } catch (err) {
        errorToast(err);
      }
    } else {
      try {
        if (!adminUser) return;
        const response = await getRequest<initiateKycResponse>(
          `${endPoints.initiateKyc}?pan_number=${pan}`
        );
        if (response.data.success) {
          const hyperKycConfig = new window.HyperKycConfig(
            response.data.access_token,
            response.data.workflow_id,
            response.data.transactionId,
            true
          );
          hyperKycConfig.setInputs({
            panNumber: pan,
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
        errorToast(err);
      }
    }
  };

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
    if (status === "completed") return <CompletedIcon />;
    return <ClockIcon />;
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
                              holder.status === "completed" ? "#16a34a" : "#e5e7eb",
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
                        {holder.status === "completed" && (
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
                      {holder.status === "active" && (
                        <div style={{ marginTop: "10px" }}>
                          {/* PAN Label */}
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
                            PAN NUMBER
                          </label>

                          {/* PAN Input */}
                          <input
                            type="text"
                            value={holder.pan}
                            onChange={(e) => handlePanChange(index, e.target.value)}
                            style={{
                              width: "100%",
                              border: "1px solid #d1d5db",
                              borderRadius: "6px",
                              outline: "none",
                              fontSize: "15px",
                              padding: "10px 12px",
                              marginBottom: "6px",
                              background: "#fff",
                              color: "#111827",
                              boxSizing: "border-box",
                            }}
                            placeholder="DFPOL7895W"
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
                              padding: "9px 30px",
                              fontWeight: "500",
                              fontSize: "14px",
                              cursor:
                                holder.isLoader || holder.isKycCompliant === null
                                  ? "not-allowed"
                                  : "pointer",
                              letterSpacing: "0.01em",
                            }}
                          >
                            {holder.isLoader ? "Checking..." : "Proceed"}
                          </button>
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
