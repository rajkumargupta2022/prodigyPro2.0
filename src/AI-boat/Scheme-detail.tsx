import React from "react";
import { useNavigate } from "react-router-dom";
import { schemeDeatilDataKeys } from "../pages/data-interfaces/transact";
import { imageUrl } from "../services/utils/urls";
import { getValueInSort } from "../services/calculation/percentageCalculate";

interface SchemeDetailProps {
  scheme: schemeDeatilDataKeys;
}

const SchemeDetail: React.FC<SchemeDetailProps> = ({ scheme }) => {
  const navigate = useNavigate();

  if (!scheme) return null;

  const return1Y = scheme.oneYearCAGR !== undefined ? `${scheme.oneYearCAGR.toFixed(1)}%` : "N/A";
  const return3Y = scheme.threeYearCAGR !== undefined ? `${scheme.threeYearCAGR.toFixed(1)}%` : "N/A";
  const return5Y = scheme.fiveYearCAGR !== undefined ? `${scheme.fiveYearCAGR.toFixed(1)}%` : "N/A";
  const fundSizeText = scheme.fundSize ? `₹${getValueInSort(scheme.fundSize)}` : "N/A";
  const minLumpsumText = scheme.minLumSumAmt ? `₹${scheme.minLumSumAmt}` : "N/A";
  const expenseRatioText = scheme.expenseRatio ? `${scheme.expenseRatio.toFixed(2)}%` : "N/A";

  const handleFullDetailsClick = () => {
    navigate("/fund-details", {
      state: { accordSchemeCode: scheme.accordSchemeCode, fromPortfolio: false },
    });
  };

  // Determine risk style based on value
  const getRiskStyles = (riskStr?: string) => {
    const defaultStyles = { background: "#f3f4f6", color: "#4b5563" };
    if (!riskStr) return defaultStyles;

    const lowerRisk = riskStr.toLowerCase();
    if (lowerRisk.includes("high") || lowerRisk.includes("riskier")) {
      return { background: "#fee2e2", color: "#dc2626" }; // Soft red / dark red
    }
    if (lowerRisk.includes("moderate")) {
      return { background: "#fef3c7", color: "#d97706" }; // Soft amber / dark amber
    }
    if (lowerRisk.includes("low")) {
      return { background: "#dcfce7", color: "#15803d" }; // Soft green / dark green
    }
    return defaultStyles;
  };

  const riskStyle = getRiskStyles(scheme.risk);

  return (
    <div style={styles.container}>
      {/* ── Header Section ── */}
      <div style={styles.header}>
        <img
          src={`${imageUrl + scheme.accordAMCCode}.png`}
          alt="AMC Logo"
          style={styles.logo}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/default-amc.png";
          }}
        />
        <div style={styles.headerText}>
          <h6 style={styles.schemeName}>{scheme.scheme}</h6>
          <div style={styles.navRow}>
            <span style={styles.navLabel}>
              NAV <strong style={styles.navValue}>₹{scheme.cnav?.toFixed(2)}</strong>
            </span>
            {scheme.risk && (
              <span style={{ ...styles.riskBadge, ...riskStyle }}>{scheme.risk}</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Returns CAGR Section ── */}
      <div style={styles.section}>
        <span style={styles.sectionTitle}>Returns (CAGR)</span>
        <div style={styles.grid}>
          <div style={styles.gridCol}>
            <span style={styles.greenValue}>{return1Y}</span>
            <span style={styles.gridLabel}>1Y</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.gridCol}>
            <span style={styles.greenValue}>{return3Y}</span>
            <span style={styles.gridLabel}>3Y</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.gridCol}>
            <span style={styles.greenValue}>{return5Y}</span>
            <span style={styles.gridLabel}>5Y</span>
          </div>
        </div>
      </div>

      {/* ── Info Section ── */}
      <div style={styles.section}>
        <div style={styles.grid}>
          <div style={styles.gridCol}>
            <span style={styles.gridLabel}>Fund Size</span>
            <span style={styles.boldValue}>{fundSizeText}</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.gridCol}>
            <span style={styles.gridLabel}>Min Lumpsum</span>
            <span style={styles.boldValue}>{minLumpsumText}</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.gridCol}>
            <span style={styles.gridLabel}>Expense Ratio</span>
            <span style={styles.boldValue}>{expenseRatioText}</span>
          </div>
        </div>
      </div>

      {/* ── Footer Link ── */}
      <div style={styles.footer}>
        <button style={styles.viewFullBtn} onClick={handleFullDetailsClick}>
          View full details &gt;
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #eef0f6",
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    overflow: "hidden",
    width: "100%",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    background: "#ffffff",
  },
  logo: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    objectFit: "contain",
  },
  headerText: {
    marginLeft: "12px",
    flex: 1,
    textAlign: "left",
  },
  schemeName: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
    margin: 0,
    lineHeight: "1.4",
  },
  navRow: {
    display: "flex",
    alignItems: "center",
    marginTop: "4px",
  },
  navLabel: {
    fontSize: "12px",
    color: "#6b7280",
  },
  navValue: {
    color: "#0047FF",
    fontWeight: 700,
  },
  riskBadge: {
    marginLeft: "8px",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: 500,
    textTransform: "capitalize",
  },
  section: {
    padding: "12px 16px",
    borderTop: "1px solid #f3f4f6",
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: "11px",
    color: "#9ca3af",
    display: "block",
    marginBottom: "8px",
    fontWeight: 500,
  },
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gridCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  greenValue: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#16a34a",
  },
  boldValue: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#111827",
  },
  gridLabel: {
    fontSize: "11px",
    color: "#9ca3af",
    marginTop: "2px",
  },
  divider: {
    width: "1px",
    height: "28px",
    background: "#e5e7eb",
  },
  footer: {
    padding: "12px",
    textAlign: "center",
    borderTop: "1px solid #f3f4f6",
    background: "#ffffff",
  },
  viewFullBtn: {
    background: "none",
    border: "none",
    color: "#0047FF",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
  },
};

export default SchemeDetail;