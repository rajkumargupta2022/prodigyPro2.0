import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { imageUrl } from "../services/utils/urls";
import { schemeDeatilDataKeys } from "../pages/data-interfaces/transact";
import { fetchLiveNfoSchemes } from "./Ai-services";

const msInDay = 1000 * 60 * 60 * 24;

const getDaysLeft = (closeDate?: string): number => {
  if (!closeDate) return 0;
  const close = new Date(closeDate);
  close.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((close.getTime() - today.getTime()) / msInDay));
};

const formatCloseDate = (closeDate?: string): string => {
  if (!closeDate) return "N/A";
  return new Date(closeDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

const formatMinAmount = (val: number): string => {
  if (val >= 10000000) return `${(val % 10000000 === 0 ? val / 10000000 : (val / 10000000).toFixed(1))}Cr`;
  if (val >= 100000) return `${(val % 100000 === 0 ? val / 100000 : (val / 100000).toFixed(1))}L`;
  if (val >= 1000) return `${(val % 1000 === 0 ? val / 1000 : (val / 1000).toFixed(1))}K`;
  return val.toLocaleString("en-IN");
};

const NfoLive: React.FC = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState<schemeDeatilDataKeys[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchLiveNfoSchemes();
      setSchemes(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleApply = (item: schemeDeatilDataKeys) => {
    navigate("/nfo-apply", { state: item });
  };

  return (
    <div style={styles.outerWrap}>
      <div style={styles.headerRow}>
        <button style={styles.liveNfoPill} onClick={() => navigate("/nfo-live")}>
          Live NFOs
        </button>
      </div>

      {loading ? (
        <div style={styles.centerWrap}>
          <Spinner animation="border" size="sm" variant="primary" />
          <span style={{ marginLeft: 8, fontSize: 13, color: "#6b7280" }}>Fetching NFOs...</span>
        </div>
      ) : schemes.length > 0 ? (
        schemes.map((item, idx) => {
          const daysLeft = getDaysLeft(item.nfo_close_date);
          const urgent = daysLeft <= 1;
          const minAmount = item.sipAllowed ? item.minSIPAmt : item.minLumSumAmt;

          return (
            <div key={idx} style={{ ...styles.card, borderColor: urgent ? "#fecaca" : "#eef0f6" }}>
              <div style={styles.cardRow} onClick={() => handleApply(item)}>
                <img
                  src={`${imageUrl + item.accordAMCCode}.png`}
                  alt="AMC Logo"
                  style={styles.logo}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/default-amc.png";
                  }}
                />

                <div style={styles.middleSection}>
                  <h6 style={styles.fundName}>{item.scheme}</h6>
                  <div style={styles.tagRow}>
                    <span style={{ ...styles.closeTag, ...(urgent ? styles.urgentTag : styles.normalTag) }}>
                      Closes {formatCloseDate(item.nfo_close_date)}
                    </span>
                    {minAmount ? <span style={styles.minTag}>Min ₹{formatMinAmount(minAmount)}</span> : null}
                    {item.sipAllowed && <span style={styles.sipTag}>SIP</span>}
                    {item.purchaseAllowed && <span style={styles.lumpsumTag}>Lumpsum</span>}
                  </div>
                </div>

                <div style={styles.rightSection}>
                  <span style={{ ...styles.daysNumber, color: urgent ? "#dc2626" : "#3B5BDB" }}>{daysLeft}</span>
                  <span style={styles.daysLabel}>days left</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div style={styles.centerWrap}>
          <span style={{ fontSize: 13, color: "#6b7280" }}>No live NFOs found.</span>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  outerWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  headerRow: {
    display: "flex",
    justifyContent: "flex-end",
  },
  liveNfoPill: {
    background: "#0047FF",
    color: "#ffffff",
    border: "none",
    borderRadius: 20,
    padding: "6px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  card: {
    background: "#ffffff",
    borderRadius: 14,
    border: "1px solid #eef0f6",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    overflow: "hidden",
  },
  cardRow: {
    display: "flex",
    alignItems: "center",
    padding: "14px 16px",
    cursor: "pointer",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    objectFit: "contain",
  },
  middleSection: {
    flex: 1,
    marginLeft: 12,
    display: "flex",
    flexDirection: "column",
    gap: 6,
    textAlign: "left",
  },
  fundName: {
    fontSize: 13,
    fontWeight: 600,
    color: "#111827",
    margin: 0,
    lineHeight: 1.4,
  },
  tagRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  closeTag: {
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 500,
  },
  normalTag: {
    background: "#f3f4f6",
    color: "#6b7280",
  },
  urgentTag: {
    background: "#fee2e2",
    color: "#dc2626",
  },
  minTag: {
    fontSize: 11,
    color: "#9ca3af",
  },
  sipTag: {
    border: "1px solid #3B5BDB",
    color: "#3B5BDB",
    borderRadius: 4,
    padding: "1px 7px",
    fontSize: 10,
    fontWeight: 600,
  },
  lumpsumTag: {
    border: "1px solid #16a34a",
    color: "#16a34a",
    borderRadius: 4,
    padding: "1px 7px",
    fontSize: 10,
    fontWeight: 600,
  },
  rightSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    minWidth: 48,
  },
  daysNumber: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1,
  },
  daysLabel: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 2,
    textAlign: "center",
  },
  centerWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
  },
};

export default NfoLive;
