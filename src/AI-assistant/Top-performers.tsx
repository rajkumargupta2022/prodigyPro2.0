import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { getRequestSimple, postRequestSimple } from "../services/Api/HandleApi";
import { endPoints, imageUrl } from "../services/utils/urls";
import { categoryListKeys, categoryListResponse, assetTypeListKeys, assetTypeListResponse } from "../pages/data-interfaces/explore";
import { schemeDeatilDataKeys, topPerformersRes } from "../pages/data-interfaces/transact";

const TopPerformers: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState<number>(1); // Equity = 1 by default
  const [selectedClass, setSelectedClass] = useState<number | null>(null); // null = "All"
  const [assetTypes, setAssetTypes] = useState<assetTypeListKeys[]>([]);
  const [categories, setCategories] = useState<categoryListKeys[]>([]);
  const [schemes, setSchemes] = useState<schemeDeatilDataKeys[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch asset types on mount
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await getRequestSimple<assetTypeListResponse>(endPoints.getAssetTypesList);
        if (res.data && res.data.length > 0) {
          // Order them to match screenshot: Commodity, Debt, Equity, Hybrid, Other
          const orderMap: Record<string, number> = {
            commodity: 1,
            debt: 2,
            equity: 3,
            hybrid: 4,
          };
          const sorted = [...res.data].sort((a, b) => {
            const orderA = orderMap[a.asset_type.toLowerCase()] ?? 99;
            const orderB = orderMap[b.asset_type.toLowerCase()] ?? 99;
            return orderA - orderB;
          });
          setAssetTypes(sorted);
        } else {
          setAssetTypes([
            { asset_code: 4, asset_type: "Commodity" },
            { asset_code: 2, asset_type: "Debt" },
            { asset_code: 1, asset_type: "Equity" },
            { asset_code: 3, asset_type: "Hybrid" },
          ]);
        }
      } catch (err) {
        setAssetTypes([
          { asset_code: 4, asset_type: "Commodity" },
          { asset_code: 2, asset_type: "Debt" },
          { asset_code: 1, asset_type: "Equity" },
          { asset_code: 3, asset_type: "Hybrid" },
        ]);
      }
    };
    fetchAssets();
  }, []);

  // Fetch sub-categories (classes) when selected asset type changes
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getRequestSimple<categoryListResponse>(
          endPoints.getCategoryTypesList + "?asset_code=" + selectedAsset
        );
        if (res.data) {
          setCategories(res.data);
        } else {
          setCategories([]);
        }
      } catch (err) {
        setCategories([]);
      }
      setSelectedClass(null); // Reset sub-category filter
    };
    fetchCats();
  }, [selectedAsset]);

  // Fetch top performing schemes
  useEffect(() => {
    const fetchPerformers = async () => {
      setLoading(true);
      try {
        const requestBody = {
          filter_by_year: 3, // Default to 3 years
          page: 1,
          amc_code: [],
          classcode: selectedClass ? [selectedClass] : [],
          asset_code: [selectedAsset],
          risk_code: null
        };
        const res = await postRequestSimple<topPerformersRes>(endPoints.getTopPerformers, requestBody);
        if (res.data) {
          // Display top 5 schemes
          setSchemes(res.data.slice(0, 5));
        } else {
          setSchemes([]);
        }
      } catch (err) {
        setSchemes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPerformers();
  }, [selectedAsset, selectedClass]);

  const handleRowClick = (item: schemeDeatilDataKeys) => {
    navigate("/fund-details", { state: { accordSchemeCode: item.accordSchemeCode, fromPortfolio: false } });
  };

  return (
    <div className="top-perf-container">
      {/* ── Tab Row (Asset Types) ── */}
      <div className="top-perf-tab-row">
        {assetTypes.map((asset) => {
          const isActive = selectedAsset === asset.asset_code;
          return (
            <button
              key={asset.asset_code}
              className={`top-perf-tab-button ${isActive ? "active" : ""}`}
              onClick={() => setSelectedAsset(asset.asset_code)}
            >
              {asset.asset_type}
            </button>
          );
        })}
      </div>

      {/* ── Sub-category Filter Pills ── */}
      <div className="top-perf-pill-row">
        <button
          className={`top-perf-pill-button ${selectedClass === null ? "active" : ""}`}
          onClick={() => setSelectedClass(null)}
        >
          All
        </button>
        {categories.map((cat) => {
          const isActive = selectedClass === cat.classcode;
          return (
            <button
              key={cat.classcode}
              className={`top-perf-pill-button ${isActive ? "active" : ""}`}
              onClick={() => setSelectedClass(cat.classcode)}
            >
              {cat.category}
            </button>
          );
        })}
      </div>

      {/* ── Schemes List ── */}
      <div className="top-perf-list">
        {loading ? (
          <div className="top-perf-center-wrap">
            <Spinner animation="border" size="sm" variant="primary" />
            <span className="top-perf-fetching-text">Fetching funds...</span>
          </div>
        ) : schemes.length > 0 ? (
          schemes.map((item, idx) => {
            const return3Y = item.threeYearCAGR ? `${item.threeYearCAGR.toFixed(1)}%` : "N/A";
            const return1Y = item.oneYearCAGR ? `${item.oneYearCAGR.toFixed(1)}%` : "N/A";
            const minSipText = item.minSIPAmt ? `SIP ₹${item.minSIPAmt}` : (item.minLumSumAmt ? `Lumpsum ₹${item.minLumSumAmt}` : "");

            return (
              <div
                key={idx}
                className={`top-perf-item-row ${idx === schemes.length - 1 ? "last" : ""}`}
                onClick={() => handleRowClick(item)}
              >
                {/* AMC Logo */}
                <img
                  src={`${imageUrl + item.accordAMCCode}.png`}
                  alt="AMC Logo"
                  className="top-perf-logo"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/default-amc.png";
                  }}
                />

                {/* Middle Info */}
                <div className="top-perf-middle-section">
                  <h6 className="top-perf-fund-name">{item.scheme}</h6>
                  <div className="top-perf-tag-row">
                    {item.oneYearCAGR !== undefined && (
                      <span className="top-perf-green-tag">1Y {return1Y}</span>
                    )}
                    {item.threeYearCAGR !== undefined && (
                      <span className="top-perf-green-tag">3Y {return3Y}</span>
                    )}
                    {minSipText && (
                      <span className="top-perf-gray-tag">{minSipText}</span>
                    )}
                  </div>
                </div>

                {/* Right Info (Bold Returns) */}
                <div className="top-perf-right-section">
                  <span className="top-perf-percentage">{return3Y}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="top-perf-center-wrap">
            <span className="top-perf-empty-text">No top performers found.</span>
          </div>
        )}
      </div>

      {/* ── View All Footer ── */}
      <div className="top-perf-view-all-section">
        <button
          className="top-perf-view-all-btn"
          onClick={() => navigate("/top-performers")}
        >
          View all →
        </button>
      </div>
    </div>
  );
};

export default TopPerformers;
