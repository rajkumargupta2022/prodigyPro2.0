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
    <div className="invest-summary-wrap">
      <div className="invest-summary-text-card">
        <p className="invest-summary-heading">Please confirm your investment:</p>
        <ul className="invest-summary-list">
          {rows.map((row, idx) => (
            <li key={idx} className="invest-summary-list-item">
              <strong>{row.label}:</strong> {row.value}
            </li>
          ))}
        </ul>
      </div>

      <div className="invest-summary-btn-row">
        <button type="button" className="invest-summary-cancel-btn" onClick={onCancel} disabled={disabled}>
          Cancel
        </button>
        <button type="button" className="invest-summary-confirm-btn" onClick={onConfirm} disabled={disabled}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default InvestSummary;
