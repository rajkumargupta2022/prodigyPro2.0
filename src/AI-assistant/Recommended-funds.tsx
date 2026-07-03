import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { CheckCircleFill, Circle, ChevronRight } from "react-bootstrap-icons";
import { imageUrl } from "../services/utils/urls";
import { schemeDeatilDataKeys } from "../pages/data-interfaces/transact";
import { fetchRecommendedSchemes } from "./Ai-services";
import InvetmentConfirmation from "../components/InvestmentConfirmation";

interface Props {
  risk: number;
  duration: number;
}

const RecommendedFunds: React.FC<Props> = ({ risk, duration }) => {
  const navigate = useNavigate();
  const [schemeList, setSchemeList] = useState<schemeDeatilDataKeys[]>([]);
  const [selectedSchemeList, setSelectedSchemeList] = useState<schemeDeatilDataKeys[]>([]);
  const [sipDateList, setSipDateList] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openInvestmentConfirmation, setOpenInvestmentConfirmation] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchRecommendedSchemes(risk, duration);
      setSchemeList(data);
      setSelectedSchemeList(data);
      setLoading(false);
    };
    load();
  }, [risk, duration]);

  const toggleScheme = (item: schemeDeatilDataKeys) => {
    setSelectedSchemeList((prev) => {
      const alreadySelected = prev.find((s) => s.accordSchemeCode === item.accordSchemeCode);
      if (alreadySelected) {
        return prev.filter((s) => s.accordSchemeCode !== item.accordSchemeCode);
      }
      return [...prev, item];
    });
  };

  const handleFundDetails = (item: schemeDeatilDataKeys, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/fund-details", { state: { accordSchemeCode: item.accordSchemeCode, fromPortfolio: false } });
  };

  const handleContinue = () => {
    if (selectedSchemeList.length <= 0) return;
    const intersection = selectedSchemeList
      .map((scheme) => scheme.sipDateList)
      .reduce((acc, curr) => acc.filter((date) => curr.includes(date)));
    setSipDateList(intersection);
    setOpenInvestmentConfirmation(true);
  };

  return (
    <div className="rec-funds-outer-wrap">
      {loading ? (
        <div className="rec-funds-center-wrap">
          <Spinner animation="border" size="sm" variant="primary" />
          <span className="rec-funds-loading-text">Finding funds for you...</span>
        </div>
      ) : schemeList.length > 0 ? (
        <div className="rec-funds-card">
          <div className="rec-funds-header-row">
            <span className="rec-funds-header-title">{schemeList.length} Funds</span>
            <span className="rec-funds-header-count">{selectedSchemeList.length} selected</span>
          </div>

          {schemeList.map((item, idx) => {
            const isChecked = selectedSchemeList.some((s) => s.accordSchemeCode === item.accordSchemeCode);
            return (
              <div
                key={idx}
                className={`rec-funds-item-row ${idx === schemeList.length - 1 ? "last" : ""}`}
                onClick={() => toggleScheme(item)}
              >
                {isChecked ? (
                  <CheckCircleFill size={20} color="#0047FF" />
                ) : (
                  <Circle size={20} color="#d1d5db" />
                )}
                <img
                  src={`${imageUrl + item.accordAMCCode}.png`}
                  alt="AMC Logo"
                  className="rec-funds-logo"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/default-amc.png";
                  }}
                />
                <span className="rec-funds-fund-name">{item.scheme}</span>
                <ChevronRight size={16} color="#9ca3af" onClick={(e) => handleFundDetails(item, e)} />
              </div>
            );
          })}

          <button
            type="button"
            className="rec-funds-continue-btn"
            disabled={selectedSchemeList.length === 0}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="rec-funds-center-wrap">
          <span className="rec-funds-empty-text">No recommended funds found for this selection.</span>
        </div>
      )}

      <InvetmentConfirmation
        show={openInvestmentConfirmation}
        setShow={setOpenInvestmentConfirmation}
        schemeList={selectedSchemeList}
        setSchemeList={setSelectedSchemeList}
        sipDateList={sipDateList}
        from="Recommended"
      />
    </div>
  );
};

export default RecommendedFunds;
