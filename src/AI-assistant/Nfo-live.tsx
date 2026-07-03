import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { imageUrl } from "../services/utils/urls";
import { schemeDeatilDataKeys } from "../pages/data-interfaces/transact";
import { fetchLiveNfoSchemes } from "./Ai-services";

const msInDay = 1000 * 60 * 60 * 24;

const getDaysLeft = (closeDate?: string): number => {
  if (!closeDate) return 0;
  const close = new Date(closeDate);
  close.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((close.getTime() - today.getTime()) / msInDay));
};

const formatCloseDate = (closeDate?: string): string => {
  if (!closeDate) return "N/A";
  return new Date(closeDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

const formatMinAmount = (val: number): string => {
  if (val >= 10000000) return `${(val % 10000000 === 0 ? val / 10000000 : (val / 10000000).toFixed(1))}Cr`;
  if (val >= 100000) return `${(val % 100000 === 0 ? val / 100000 : (val / 100000).toFixed(1))}L`;
  if (val >= 1000) return `${(val % 1000 === 0 ? val / 1000 : (val / 1000).toFixed(1))}K`;
  return val.toLocaleString("en-IN");
};

const NfoLive: React.FC = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState<schemeDeatilDataKeys[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchLiveNfoSchemes();
      setSchemes(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleApply = (item: schemeDeatilDataKeys) => {
    navigate("/nfo-apply", { state: item });
  };

  return (
    <div className="nfo-outer-wrap">
      <div className="nfo-header-row">
        <button className="nfo-live-pill" onClick={() => navigate("/nfo-live")}>
          Live NFOs
        </button>
      </div>

      {loading ? (
        <div className="nfo-center-wrap">
          <Spinner animation="border" size="sm" variant="primary" />
          <span className="nfo-fetching-text">Fetching NFOs...</span>
        </div>
      ) : schemes.length > 0 ? (
        schemes.map((item, idx) => {
          const daysLeft = getDaysLeft(item.nfo_close_date);
          const urgent = daysLeft <= 1;
          const minAmount = item.sipAllowed ? item.minSIPAmt : item.minLumSumAmt;

          return (
            <div key={idx} className={`nfo-card ${urgent ? "urgent" : ""}`}>
              <div className="nfo-card-row" onClick={() => handleApply(item)}>
                <img
                  src={`${imageUrl + item.accordAMCCode}.png`}
                  alt="AMC Logo"
                  className="nfo-logo"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/default-amc.png";
                  }}
                />

                <div className="nfo-middle-section">
                  <h6 className="nfo-fund-name">{item.scheme}</h6>
                  <div className="nfo-tag-row">
                    <span className={`nfo-close-tag ${urgent ? "urgent" : "normal"}`}>
                      Closes {formatCloseDate(item.nfo_close_date)}
                    </span>
                    {minAmount ? <span className="nfo-min-tag">Min ₹{formatMinAmount(minAmount)}</span> : null}
                    {item.sipAllowed && <span className="nfo-sip-tag">SIP</span>}
                    {item.purchaseAllowed && <span className="nfo-lumpsum-tag">Lumpsum</span>}
                  </div>
                </div>

                <div className="nfo-right-section">
                  <span className={`nfo-days-number ${urgent ? "urgent" : ""}`}>{daysLeft}</span>
                  <span className="nfo-days-label">days left</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="nfo-center-wrap">
          <span className="nfo-empty-text">No live NFOs found.</span>
        </div>
      )}
    </div>
  );
};

export default NfoLive;
