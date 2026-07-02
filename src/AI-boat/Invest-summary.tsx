import React from "react";
import { InvestData, ordinalSuffix } from "./Ai-services";

interface Props {
  data: InvestData;
  onCancel: () => void;
  onConfirm: () => void;
  disabled?: boolean;
}

const InvestSummary: React.FC<Props> = ({ data, onCancel, onConfirm, disabled }) => {
  const isSip = data.transactionType === "SIP";

  const rows: { label: string; value: string }[] = [
    { label: "Scheme", value: data.scheme.scheme },
    { label: "Type", value: isSip ? "Monthly SIP" : "One-time (Lumpsum)" },
    { label: "Amount", value: `₹${(data.amount ?? 0).toLocaleString("en-IN")}` },
  ];

  if (isSip && data.sipDate) {
    rows.push({ label: "SIP Date", value: `${ordinalSuffix(data.sipDate)} of every month` });
  }

  rows.push({
    label: "Folio",
    value: data.isNewFolio || !data.folio ? "New Folio" : data.folio.folio_number,
  });

  if (isSip && data.mandate) {
    rows.push({ label: "Bank Mandate", value: `${data.mandate.bank_name} (${data.mandate.umrn_no})` });
  }

  return (
    <div style={styles.card}>
      <div style={styles.headerRow}>
        <span style={styles.headerTitle}>Confirm Your Investment</span>
      </div>

      {rows.map((row, idx) => (
        <div key={idx} style={styles.row}>
          <span style={styles.label}>{row.label}</span>
          <span style={styles.value}>{row.value}</span>
        </div>
      ))}

      <div style={styles.btnRow}>
        <button type="button" style={styles.cancelBtn} onClick={onCancel} disabled={disabled}>
          Cancel
        </button>
        <button type="button" style={styles.confirmBtn} onClick={onConfirm} disabled={disabled}>
          Confirm
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#ffffff",
    borderRadius: 16,
    border: "1px solid #eef0f6",
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    overflow: "hidden",
    width: "100%",
  },
  headerRow: {
    padding: "14px 16px",
    borderBottom: "1px solid #f3f4f6",
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#111827",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 16px",
    borderBottom: "1px solid #f9fafb",
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
  },
  value: {
    fontSize: 13,
    fontWeight: 600,
    color: "#111827",
    textAlign: "right",
  },
  btnRow: {
    display: "flex",
    gap: 10,
    padding: "14px 16px",
  },
  cancelBtn: {
    flex: 1,
    background: "#f3f4f6",
    color: "#374151",
    border: "none",
    borderRadius: 10,
    padding: "12px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  confirmBtn: {
    flex: 1,
    background: "#0047FF",
    color: "#ffffff",
    border: "none",
    borderRadius: 10,
    padding: "12px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default InvestSummary;
