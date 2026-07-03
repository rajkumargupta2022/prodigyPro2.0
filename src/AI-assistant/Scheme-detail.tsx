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

  // Determine risk badge modifier class based on value
  const getRiskClass = (riskStr?: string): string => {
    if (!riskStr) return "default";
    const lowerRisk = riskStr.toLowerCase();
    if (lowerRisk.includes("high") || lowerRisk.includes("riskier")) return "high";
    if (lowerRisk.includes("moderate")) return "moderate";
    if (lowerRisk.includes("low")) return "low";
    return "default";
  };

  const riskClass = getRiskClass(scheme.risk);

  return (
    <div className="scheme-detail-container">
      {/* ── Header Section ── */}
      <div className="scheme-detail-header">
        <img
          src={`${imageUrl + scheme.accordAMCCode}.png`}
          alt="AMC Logo"
          className="scheme-detail-logo"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/default-amc.png";
          }}
        />
        <div className="scheme-detail-header-text">
          <h6 className="scheme-detail-scheme-name">{scheme.scheme}</h6>
          <div className="scheme-detail-nav-row">
            <span className="scheme-detail-nav-label">
              NAV <strong className="scheme-detail-nav-value">₹{scheme.cnav?.toFixed(2)}</strong>
            </span>
            {scheme.risk && (
              <span className={`scheme-detail-risk-badge ${riskClass}`}>{scheme.risk}</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Returns CAGR Section ── */}
      <div className="scheme-detail-section">
        <span className="scheme-detail-section-title">Returns (CAGR)</span>
        <div className="scheme-detail-grid">
          <div className="scheme-detail-grid-col">
            <span className="scheme-detail-green-value">{return1Y}</span>
            <span className="scheme-detail-grid-label">1Y</span>
          </div>
          <div className="scheme-detail-divider" />
          <div className="scheme-detail-grid-col">
            <span className="scheme-detail-green-value">{return3Y}</span>
            <span className="scheme-detail-grid-label">3Y</span>
          </div>
          <div className="scheme-detail-divider" />
          <div className="scheme-detail-grid-col">
            <span className="scheme-detail-green-value">{return5Y}</span>
            <span className="scheme-detail-grid-label">5Y</span>
          </div>
        </div>
      </div>

      {/* ── Info Section ── */}
      <div className="scheme-detail-section">
        <div className="scheme-detail-grid">
          <div className="scheme-detail-grid-col">
            <span className="scheme-detail-grid-label">Fund Size</span>
            <span className="scheme-detail-bold-value">{fundSizeText}</span>
          </div>
          <div className="scheme-detail-divider" />
          <div className="scheme-detail-grid-col">
            <span className="scheme-detail-grid-label">Min Lumpsum</span>
            <span className="scheme-detail-bold-value">{minLumpsumText}</span>
          </div>
          <div className="scheme-detail-divider" />
          <div className="scheme-detail-grid-col">
            <span className="scheme-detail-grid-label">Expense Ratio</span>
            <span className="scheme-detail-bold-value">{expenseRatioText}</span>
          </div>
        </div>
      </div>

      {/* ── Footer Link ── */}
      <div className="scheme-detail-footer">
        <button className="scheme-detail-view-full-btn" onClick={handleFullDetailsClick}>
          View full details &gt;
        </button>
      </div>
    </div>
  );
};

export default SchemeDetail;
