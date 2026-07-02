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
    <div style={styles.outerWrap}>
      {loading ? (
        <div style={styles.centerWrap}>
          <Spinner animation="border" size="sm" variant="primary" />
          <span style={{ marginLeft: 8, fontSize: 13, color: "#6b7280" }}>Finding funds for you...</span>
        </div>
      ) : schemeList.length > 0 ? (
        <div style={styles.card}>
          <div style={styles.headerRow}>
            <span style={styles.headerTitle}>{schemeList.length} Funds</span>
            <span style={styles.headerCount}>{selectedSchemeList.length} selected</span>
          </div>

          {schemeList.map((item, idx) => {
            const isChecked = selectedSchemeList.some((s) => s.accordSchemeCode === item.accordSchemeCode);
            return (
              <div
                key={idx}
                style={{ ...styles.itemRow, borderBottom: idx === schemeList.length - 1 ? "none" : "1px solid #f3f4f6" }}
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
                  style={styles.logo}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/default-amc.png";
                  }}
                />
                <span style={styles.fundName}>{item.scheme}</span>
                <ChevronRight size={16} color="#9ca3af" onClick={(e) => handleFundDetails(item, e)} />
              </div>
            );
          })}

          <button
            type="button"
            style={{ ...styles.continueBtn, opacity: selectedSchemeList.length === 0 ? 0.5 : 1 }}
            disabled={selectedSchemeList.length === 0}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      ) : (
        <div style={styles.centerWrap}>
          <span style={{ fontSize: 13, color: "#6b7280" }}>No recommended funds found for this selection.</span>
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

const styles: Record<string, React.CSSProperties> = {
  outerWrap: {
    width: "100%",
  },
  centerWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
  },
  card: {
    background: "#ffffff",
    borderRadius: 16,
    border: "1px solid #eef0f6",
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    overflow: "hidden",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    borderBottom: "1px solid #f3f4f6",
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#111827",
  },
  headerCount: {
    fontSize: 12,
    color: "#9ca3af",
  },
  itemRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    cursor: "pointer",
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    objectFit: "contain",
  },
  fundName: {
    flex: 1,
    fontSize: 13,
    fontWeight: 600,
    color: "#111827",
  },
  continueBtn: {
    width: "100%",
    background: "#0047FF",
    color: "#ffffff",
    border: "none",
    padding: "14px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default RecommendedFunds;
