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
    <div style={styles.container}>
      {/* ── Tab Row (Asset Types) ── */}
      <div style={styles.tabRow}>
        {assetTypes.map((asset) => {
          const isActive = selectedAsset === asset.asset_code;
          return (
            <button
              key={asset.asset_code}
              style={{
                ...styles.tabButton,
                ...(isActive ? styles.activeTabButton : {}),
              }}
              onClick={() => setSelectedAsset(asset.asset_code)}
            >
              {asset.asset_type}
            </button>
          );
        })}
      </div>

      {/* ── Sub-category Filter Pills ── */}
      <div style={styles.pillRow}>
        <button
          style={{
            ...styles.pillButton,
            ...(selectedClass === null ? styles.activePillButton : {}),
          }}
          onClick={() => setSelectedClass(null)}
        >
          All
        </button>
        {categories.map((cat) => {
          const isActive = selectedClass === cat.classcode;
          return (
            <button
              key={cat.classcode}
              style={{
                ...styles.pillButton,
                ...(isActive ? styles.activePillButton : {}),
              }}
              onClick={() => setSelectedClass(cat.classcode)}
            >
              {cat.category}
            </button>
          );
        })}
      </div>

      {/* ── Schemes List ── */}
      <div style={styles.list}>
        {loading ? (
          <div style={styles.centerWrap}>
            <Spinner animation="border" size="sm" variant="primary" />
            <span style={{ marginLeft: 8, fontSize: 13, color: "#6b7280" }}>Fetching funds...</span>
          </div>
        ) : schemes.length > 0 ? (
          schemes.map((item, idx) => {
            const return3Y = item.threeYearCAGR ? `${item.threeYearCAGR.toFixed(1)}%` : "N/A";
            const return1Y = item.oneYearCAGR ? `${item.oneYearCAGR.toFixed(1)}%` : "N/A";
            const minSipText = item.minSIPAmt ? `SIP ₹${item.minSIPAmt}` : (item.minLumSumAmt ? `Lumpsum ₹${item.minLumSumAmt}` : "");

            return (
              <div
                key={idx}
                style={{
                  ...styles.itemRow,
                  borderBottom: idx === schemes.length - 1 ? "none" : "1px solid #f3f4f6",
                }}
                onClick={() => handleRowClick(item)}
              >
                {/* AMC Logo */}
                <img
                  src={`${imageUrl + item.accordAMCCode}.png`}
                  alt="AMC Logo"
                  style={styles.logo}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/default-amc.png";
                  }}
                />

                {/* Middle Info */}
                <div style={styles.middleSection}>
                  <h6 style={styles.fundName}>{item.scheme}</h6>
                  <div style={styles.tagRow}>
                    {item.oneYearCAGR !== undefined && (
                      <span style={styles.greenTag}>1Y {return1Y}</span>
                    )}
                    {item.threeYearCAGR !== undefined && (
                      <span style={styles.greenTag}>3Y {return3Y}</span>
                    )}
                    {minSipText && (
                      <span style={styles.grayTag}>{minSipText}</span>
                    )}
                  </div>
                </div>

                {/* Right Info (Bold Returns) */}
                <div style={styles.rightSection}>
                  <span style={styles.percentage}>{return3Y}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div style={styles.centerWrap}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>No top performers found.</span>
          </div>
        )}
      </div>

      {/* ── View All Footer ── */}
      <div style={styles.viewAllSection}>
        <button
          style={styles.viewAllBtn}
          onClick={() => navigate("/top-performers")}
        >
          View all →
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #eef0f6",
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    overflow: "hidden",
    width: "100%",
  },
  tabRow: {
    display: "flex",
    borderBottom: "1px solid #f3f4f6",
    overflowX: "auto",
    scrollbarWidth: "thin",
    WebkitOverflowScrolling: "touch",
  },
  tabButton: {
    flex: "1 0 auto",
    background: "none",
    border: "none",
    padding: "12px 16px",
    fontSize: "13px",
    color: "#6b7280",
    fontWeight: 500,
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    textAlign: "center",
    transition: "all 0.2s",
  },
  activeTabButton: {
    color: "#0047FF",
    borderBottom: "2px solid #0047FF",
    fontWeight: 600,
  },
  pillRow: {
    display: "flex",
    overflowX: "auto",
    gap: "8px",
    padding: "12px 16px 16px 16px", // extra bottom padding to look nice with the thin scrollbar
    borderBottom: "1px solid #f3f4f6",
    scrollbarWidth: "thin",
    WebkitOverflowScrolling: "touch",
  },
  pillButton: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "20px",
    padding: "6px 14px",
    fontSize: "12px",
    color: "#4b5563",
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.2s",
  },
  activePillButton: {
    background: "#0047FF",
    color: "#ffffff",
    borderColor: "#0047FF",
  },
  list: {
    display: "flex",
    flexDirection: "column",
  },
  itemRow: {
    display: "flex",
    alignItems: "center",
    padding: "14px 16px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  logo: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    objectFit: "contain",
  },
  middleSection: {
    flex: 1,
    marginLeft: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    textAlign: "left",
  },
  fundName: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#111827",
    margin: 0,
    lineHeight: "1.4",
  },
  tagRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "6px",
  },
  greenTag: {
    background: "#e6f9f0",
    color: "#16a34a",
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: 500,
  },
  grayTag: {
    color: "#9ca3af",
    fontSize: "11px",
  },
  rightSection: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  percentage: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#16a34a",
  },
  viewAllSection: {
    padding: "12px",
    textAlign: "center",
    background: "#ffffff",
    borderTop: "1px solid #f3f4f6",
  },
  viewAllBtn: {
    background: "none",
    border: "none",
    color: "#0047FF",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
  },
  centerWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
  },
};

export default TopPerformers;