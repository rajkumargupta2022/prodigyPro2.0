import LoginLeftImage from "../../components/LoginLeftImage";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

type HolderStatus = "pending" | "active" | "completed";

interface Holder {
  label: string;
  status: HolderStatus;
  pan: string;
}

const KycStatusCheck = () => {
  const navigate = useNavigate();

  const [holders, setHolders] = useState<Holder[]>([
    { label: "Primary Holder", status: "active", pan: "" },
    { label: "Second Holder", status: "pending", pan: "" },
    { label: "Third Holder", status: "pending", pan: "" },
  ]);

  const handleProceed = (index: number) => {
    const updated = holders.map((h) => ({ ...h }));
    updated[index].status = "completed";
    if (index + 1 < updated.length) {
      updated[index + 1].status = "active";
      setHolders(updated);
    } else {
      setHolders(updated);
      navigate("/personal-details");
    }
  };

  const handlePanChange = (index: number, value: string) => {
    const updated = holders.map((h) => ({ ...h }));
    updated[index].pan = value;
    setHolders(updated);
  };

  // Green filled circle with white tick — matches screenshot exactly
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
      {/* White checkmark SVG */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 7L5.5 10.5L12 3.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );

  // Orange clock icon — matches screenshot for active/pending
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
      {/* Clock SVG */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
        <polyline
          points="12 7 12 12 15 15"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
                      {/* Vertical connector line between steps */}
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
                      {/* Holder Label */}
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                          style={{
                            fontWeight: "700",
                            fontSize: "15px",
                            color: "#111827",
                            lineHeight: "28px", // align with icon height
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

                          {/* PAN Input — boxed style matching screenshot */}
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
                              marginBottom: "14px",
                              background: "#fff",
                              color: "#111827",
                              boxSizing: "border-box",
                            }}
                            placeholder="DFPOL7895W"
                          />

                          {/* Proceed Button — pill shape matching screenshot */}
                          <button
                            type="button"
                            onClick={() => handleProceed(index)}
                            style={{
                              backgroundColor: "#1a34fe",
                              color: "#fff",
                              border: "none",
                              borderRadius: "50px",
                              padding: "11px 36px",
                              fontWeight: "600",
                              fontSize: "14px",
                              cursor: "pointer",
                              letterSpacing: "0.01em",
                            }}
                          >
                            Proceed
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
