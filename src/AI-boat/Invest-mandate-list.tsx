import React from "react";
import { ChevronRight } from "react-bootstrap-icons";
import { bankMandateKeys } from "../pages/data-interfaces/transact";
import { imageUrl } from "../services/utils/urls";

interface Props {
  mandates: bankMandateKeys[];
  onSelect: (mandate: bankMandateKeys) => void;
}

const maskAccount = (accountNo: string): string => {
  if (!accountNo) return "";
  return `••••${accountNo.slice(-4)}`;
};

const InvestMandateList: React.FC<Props> = ({ mandates, onSelect }) => {
  return (
    <div style={styles.wrap}>
      {mandates.map((mandate, idx) => (
        <div key={idx} style={styles.card} onClick={() => onSelect(mandate)}>
          <img
            src={`${imageUrl}${mandate.bank_name?.trim().toLowerCase().replace(/\s+/g, "_")}.png`}
            alt="Bank Logo"
            style={styles.logo}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/default-amc.png";
            }}
          />
          <div style={styles.middle}>
            <span style={styles.title}>{mandate.bank_name}</span>
            <span style={styles.subtitle}>
              {maskAccount(mandate.account_no)} · Limit ₹{Number(mandate.amount).toLocaleString("en-IN")}
            </span>
          </div>
          <ChevronRight size={16} color="#9ca3af" />
        </div>
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#ffffff",
    borderRadius: 14,
    border: "1px solid #eef0f6",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    padding: "12px 14px",
    cursor: "pointer",
  },
  logo: {
    width: 34,
    height: 34,
    borderRadius: 8,
    objectFit: "contain",
    flexShrink: 0,
  },
  middle: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    color: "#111827",
  },
  subtitle: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
};

export default InvestMandateList;
