import React from "react";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";
import { sipPurchaseRedemptionKey } from "../pages/data-interfaces/transact";
import { TransactionTypeChoice } from "./Ai-services";

interface Props {
  success: boolean;
  results: sipPurchaseRedemptionKey[];
  transactionType?: TransactionTypeChoice;
}

const iconColors = {
  success: "#16a34a",
  error: "#dc2626",
};

const InvestResult: React.FC<Props> = ({ success, results, transactionType }) => {
  const allPassed = success && results.length > 0 && results.every((r) => r.reg_status);
  const themeClass = allPassed ? "success" : "error";

  return (
    <div className={`invest-result-card ${themeClass}`}>
      <div className="invest-result-header-row">
        <div className="invest-result-header-left">
          {allPassed ? (
            <CheckCircleFill size={20} color={iconColors.success} />
          ) : (
            <XCircleFill size={20} color={iconColors.error} />
          )}
          <span className="invest-result-header-title">
            {allPassed ? "Investment Placed!" : "Investment Failed"}
          </span>
        </div>
        {transactionType && (
          <span className="invest-result-badge">
            {transactionType === "SIP" ? "SIP" : "Lumpsum"}
          </span>
        )}
      </div>

      {results.length === 0 && (
        <div className="invest-result-item-body">
          <p className="invest-result-fallback-text">Something went wrong while placing your investment. Please try again.</p>
        </div>
      )}

      {results.map((item, idx) => (
        <div key={idx} className={`invest-result-item-body ${idx > 0 ? "with-top-border" : ""}`}>
          <div className="invest-result-item-header">
            {item.reg_status ? (
              <CheckCircleFill size={16} color={iconColors.success} />
            ) : (
              <XCircleFill size={16} color={iconColors.error} />
            )}
            <span className="invest-result-scheme-name">{item.schemeName}</span>
          </div>

          {item.reg_status ? (
            <div className="invest-result-grid">
              <div className="invest-result-grid-col">
                <span className="invest-result-grid-label">Amount</span>
                <span className="invest-result-grid-value">₹{item.amount}</span>
              </div>
              <div className="invest-result-grid-col">
                <span className="invest-result-grid-label">Order ID</span>
                <span className="invest-result-grid-value">{item.reg_id}</span>
              </div>
              <div className="invest-result-grid-col">
                <span className="invest-result-grid-label">Folio</span>
                <span className="invest-result-grid-value">{item.folio_no}</span>
              </div>
            </div>
          ) : (
            <p className="invest-result-fallback-text">{item.reg_remark || "This transaction could not be completed."}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default InvestResult;
