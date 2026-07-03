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
    <div className="mandate-wrap">
      {mandates.map((mandate, idx) => (
        <div key={idx} className="mandate-card" onClick={() => onSelect(mandate)}>
          <img
            src={`${imageUrl}${mandate.bank_name?.trim().toLowerCase().replace(/\s+/g, "_")}.png`}
            alt="Bank Logo"
            className="mandate-logo"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/default-amc.png";
            }}
          />
          <div className="mandate-middle">
            <span className="mandate-title">{mandate.bank_name}</span>
            <span className="mandate-subtitle">
              {maskAccount(mandate.account_no)} · Limit ₹{Number(mandate.amount).toLocaleString("en-IN")}
            </span>
          </div>
          <ChevronRight size={16} color="#9ca3af" />
        </div>
      ))}
    </div>
  );
};

export default InvestMandateList;
