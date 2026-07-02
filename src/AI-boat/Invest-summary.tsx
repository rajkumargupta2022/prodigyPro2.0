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
    { label: "Fund", value: data.scheme.scheme },
    { label: "Amount", value: `₹${(data.amount ?? 0).toLocaleString("en-IN")}` },
    { label: "Type", value: isSip ? "Monthly SIP" : "One-time (Lumpsum)" },
    {
      label: "Folio",
      value: data.isNewFolio || !data.folio ? "New Folio" : data.folio.folio_number,
    },
  ];

  if (isSip && data.sipDate) {
    rows.push({ label: "SIP Date", value: `${ordinalSuffix(data.sipDate)} of every month` });
    rows.push({ label: "First SIP", value: "Today" });
  }

  if (isSip && data.mandate) {
    rows.push({ label: "Mandate", value: `${data.mandate.bank_name} ••${data.mandate.account_no?.slice(-4)}` });
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.textCard}>
        <p style={styles.heading}>Please confirm your investment:</p>
        <ul style={styles.list}>
          {rows.map((row, idx) => (
            <li key={idx} style={styles.listItem}>
              <strong>{row.label}:</strong> {row.value}
            </li>
          ))}
        </ul>
      </div>

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
  wrap: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
  },
  textCard: {
    background: "#ffffff",
    borderRadius: 16,
    border: "1px solid #eef0f6",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    padding: "14px 16px",
  },
  heading: {
    fontSize: 14,
    color: "#111827",
    margin: "0 0 10px 0",
  },
  list: {
    margin: 0,
    paddingLeft: 18,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  listItem: {
    fontSize: 13,
    color: "#111827",
    lineHeight: 1.4,
  },
  btnRow: {
    display: "flex",
    gap: 10,
    padding: "0 4px",
  },
  cancelBtn: {
    flex: 1,
    background: "#5B6EF5",
    color: "#ffffff",
    border: "none",
    borderRadius: 999,
    padding: "8px",
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.4,
    cursor: "pointer",
  },
  confirmBtn: {
    flex: 1,
    background: "#011EFE",
    color: "#ffffff",
    border: "none",
    borderRadius: 999,
    padding: "8px",
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.4,
    cursor: "pointer",
  },
};

export default InvestSummary;
