import React from "react";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";
import { sipPurchaseRedemptionKey } from "../pages/data-interfaces/transact";
import { TransactionTypeChoice } from "./Ai-services";

interface Props {
  success: boolean;
  results: sipPurchaseRedemptionKey[];
  transactionType?: TransactionTypeChoice;
}

const InvestResult: React.FC<Props> = ({ success, results, transactionType }) => {
  const allPassed = success && results.length > 0 && results.every((r) => r.reg_status);
  const theme = allPassed ? themes.success : themes.error;

  return (
    <div style={{ ...styles.card, background: theme.bg, border: `1px solid ${theme.border}` }}>
      <div style={{ ...styles.headerRow, borderBottom: `1px solid ${theme.border}` }}>
        <div style={styles.headerLeft}>
          {allPassed ? (
            <CheckCircleFill size={20} color={theme.icon} />
          ) : (
            <XCircleFill size={20} color={theme.icon} />
          )}
          <span style={{ ...styles.headerTitle, color: theme.text }}>
            {allPassed ? "Investment Placed!" : "Investment Failed"}
          </span>
        </div>
        {transactionType && (
          <span style={{ ...styles.badge, background: theme.badgeBg, color: theme.text }}>
            {transactionType === "SIP" ? "SIP" : "Lumpsum"}
          </span>
        )}
      </div>

      {results.length === 0 && (
        <div style={styles.itemBody}>
          <p style={styles.fallbackText}>Something went wrong while placing your investment. Please try again.</p>
        </div>
      )}

      {results.map((item, idx) => (
        <div key={idx} style={{ ...styles.itemBody, borderTop: idx > 0 ? `1px solid ${theme.border}` : undefined }}>
          <div style={styles.itemHeader}>
            {item.reg_status ? (
              <CheckCircleFill size={16} color={themes.success.icon} />
            ) : (
              <XCircleFill size={16} color={themes.error.icon} />
            )}
            <span style={styles.schemeName}>{item.schemeName}</span>
          </div>

          {item.reg_status ? (
            <div style={styles.grid}>
              <div style={styles.gridCol}>
                <span style={styles.gridLabel}>Amount</span>
                <span style={styles.gridValue}>₹{item.amount}</span>
              </div>
              <div style={styles.gridCol}>
                <span style={styles.gridLabel}>Order ID</span>
                <span style={styles.gridValue}>{item.reg_id}</span>
              </div>
              <div style={styles.gridCol}>
                <span style={styles.gridLabel}>Folio</span>
                <span style={styles.gridValue}>{item.folio_no}</span>
              </div>
            </div>
          ) : (
            <p style={styles.fallbackText}>{item.reg_remark || "This transaction could not be completed."}</p>
          )}
        </div>
      ))}
    </div>
  );
};

const themes = {
  success: {
    bg: "#F0FDF4",
    border: "#BBF7D0",
    icon: "#16a34a",
    text: "#15803d",
    badgeBg: "#DCFCE7",
  },
  error: {
    bg: "#FEF2F2",
    border: "#FECACA",
    icon: "#dc2626",
    text: "#b91c1c",
    badgeBg: "#FEE2E2",
  },
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 700,
  },
  badge: {
    fontSize: 11,
    fontWeight: 700,
    borderRadius: 12,
    padding: "4px 12px",
  },
  itemBody: {
    background: "#ffffff",
    padding: "12px 16px",
  },
  itemHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  schemeName: {
    fontSize: 13,
    fontWeight: 700,
    color: "#111827",
  },
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gridCol: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  gridLabel: {
    fontSize: 11,
    color: "#9ca3af",
  },
  gridValue: {
    fontSize: 12,
    fontWeight: 600,
    color: "#111827",
  },
  fallbackText: {
    fontSize: 13,
    color: "#374151",
    margin: 0,
  },
};

export default InvestResult;
