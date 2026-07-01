import React, { useEffect, useState } from "react";
import { ArrowUpCircleFill, ArrowDownCircleFill, Stars } from "react-bootstrap-icons";
import { useAdminUser } from "../context/AdminContext";
import { endPoints } from "../services/utils/urls";
import { postRequestSimple } from "../services/Api/HandleApi";
import { portfolioSummaryKeys, portfolioSummaryRes, summaryInsideKeys } from "../pages/data-interfaces/portfolio";
import { familyDataType } from "../pages/data-interfaces/dashboard";
import { useNavigate } from "react-router-dom";
import { fetchAdminUser } from "../services/user/adminUser";
import axios from "axios";
import { AiInsightResponse } from "../pages/data-interfaces/ai";



const performanceColors: Record<string, string> = {
  switch: "#EF4444",
  satisfactory_performance: "#22C55E",
  under_watch: "#F59E0B",
};

const performanceLabelMap: Record<string, string> = {
  switch: "Switch",
  satisfactory_performance: "Satisfactory Performance",
  under_watch: "Under Watch",
};

const Portfolio: React.FC = () => {
  const { familySnapShotData } = useAdminUser();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<portfolioSummaryKeys | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  // Determine which tabs are available
  const myTab = familySnapShotData.find((d) => d.myPortfolio === true);
  const familyTab = familySnapShotData.find((d) => d.myPortfolio === false);
  const hasFamily = !!familyTab;

  // Active tab: "my" | "family"
  const [activeTab, setActiveTab] = useState<"my" | "family">("my");

  // Derive active snapshot
  const activeSnapshot: familyDataType | undefined =
    activeTab === "family" && hasFamily ? familyTab : myTab ?? familySnapShotData[0];

  useEffect(() => {
    const adminUser = fetchAdminUser()
    const fetchSummary = async () => {
      try {
        const reqBody = {
          ucc: adminUser?.ucc
        }
        const res = await postRequestSimple<portfolioSummaryRes>(endPoints.getSchemePerformanceSummary, reqBody)
        if (res.success) {
          setSummary(res.data);
          // getAIPrompt()
        }
      } catch (e) { }
    };


    fetchSummary();
  }, []);
  const getAIPrompt = async (data: familyDataType) => {
    const reqBody = {
      type: "insight",
      portfolio_context: `Current Value: ${data.Totalmarketvalue},Invested: ${data.Totalpurchase},Gain/Loss: ${data.Gainloss},CAGR: ${data.Finalcagr},Day Change: ${data.Totaldayschange},Equity: ${data.equityPercentFinal},Debt: ${data.debtPercentFinal},Gold: ${data.goldPercentFinal}`
    }
    const token = localStorage.getItem("token")
    const response = await axios.post<AiInsightResponse>(import.meta.env.VITE_GEMINI_API_URL + endPoints.aiChat, reqBody, { headers: { Authorization: `Bearer ${token}` } });
    if (response.data.insight) {
      setAiInsight(response.data.insight);
    }
  }

  const currentValue = activeSnapshot?.Totalmarketvalue ?? 0;
  const invested = activeSnapshot?.Totalpurchase ?? 0;
  const gainLoss = activeSnapshot?.Gainloss ?? 0;
  const cagr = activeSnapshot?.Finalcagr ?? "0";
  const dayChange = activeSnapshot?.Totaldayschange ?? 0;
  const equity = parseFloat(activeSnapshot?.equityPercentFinal ?? "0");
  const debt = parseFloat(activeSnapshot?.debtPercentFinal ?? "0");
  const gold = parseFloat(activeSnapshot?.goldPercentFinal ?? "0");

  const formatAmount = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(2)}K`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  const maxSummaryValue = summary?.performance_summary
    ? Math.max(...summary.performance_summary.map((s) => s.currentValue), 1)
    : 1;

  return (
    <div style={styles.outerWrap}>

      {/* ── Tab Switcher ── */}
      {hasFamily && (
        <div style={styles.tabBar}>
          <button
            style={{
              ...styles.tabBtn,
              color: activeTab === "my" ? "#3B5BDB" : "#6b7280",
              borderBottom: activeTab === "my" ? "2px solid #3B5BDB" : "2px solid transparent",
              fontWeight: activeTab === "my" ? 700 : 500,
            }}
            onClick={() => setActiveTab("my")}
          >
            My Portfolio
          </button>
          <button
            style={{
              ...styles.tabBtn,
              color: activeTab === "family" ? "#3B5BDB" : "#6b7280",
              borderBottom: activeTab === "family" ? "2px solid #3B5BDB" : "2px solid transparent",
              fontWeight: activeTab === "family" ? 700 : 500,
            }}
            onClick={() => setActiveTab("family")}
          >
            Family
          </button>
        </div>
      )}

      {/* ── Main Unified Card ── */}
      <div style={styles.mainCard}>

        {/* Top White Section */}
        <div style={styles.cardSection}>
          {/* Current Value */}
          <p style={styles.label}>Current Value</p>
          <h2 style={styles.bigAmount}>
            ₹{currentValue.toLocaleString("en-IN")}
          </h2>

          {/* Day change pill */}
          <div style={{
            ...styles.dayPill,
            color: dayChange >= 0 ? "#16a34a" : "#dc2626",
          }}>
            {dayChange >= 0
              ? <ArrowUpCircleFill size={12} />
              : <ArrowDownCircleFill size={12} />}
            <span style={{ marginLeft: 4 }}>
              ₹{Math.abs(dayChange).toLocaleString("en-IN")} today
            </span>
          </div>

          {/* Divider */}
          <div style={styles.divider} />

          {/* Stats row */}
          <div style={styles.statsRow}>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Invested</span>
              <span style={styles.statValue}>
                ₹{invested >= 100000
                  ? `${(invested / 100000).toFixed(2)}L`
                  : invested.toLocaleString("en-IN")}
              </span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Gain / Loss</span>
              <span style={{ ...styles.statValue, color: gainLoss >= 0 ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                {gainLoss >= 0 ? "+" : ""}
                {formatAmount(gainLoss)}
              </span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statItem}>
              <span style={styles.statLabel}>CAGR</span>
              <span style={{ ...styles.statValue, color: "#16a34a", fontWeight: 600 }}>
                +{cagr}%
              </span>
            </div>
          </div>

          {/* Asset Allocation */}
          {(equity + debt + gold) > 0 && (
            <>
              <div style={styles.divider} />
              <p style={{ ...styles.label, marginBottom: 8 }}>Asset Allocation</p>

              {/* Segmented bar */}
              <div style={styles.allocBar}>
                {equity > 0 && <div style={{ ...styles.allocSegment, width: `${equity}%`, background: "#3B5BDB" }} />}
                {debt > 0 && <div style={{ ...styles.allocSegment, width: `${debt}%`, background: "#F59E0B" }} />}
                {gold > 0 && <div style={{ ...styles.allocSegment, width: `${gold}%`, background: "#EAB308" }} />}
              </div>

              <div style={styles.allocLegendRow}>
                {equity > 0 && (
                  <span style={styles.legendItem}>
                    <span style={{ ...styles.dot, background: "#3B5BDB" }} /> Equity {equity.toFixed(1)}%
                  </span>
                )}
                {debt > 0 && (
                  <span style={styles.legendItem}>
                    <span style={{ ...styles.dot, background: "#F59E0B" }} /> Debt {debt.toFixed(1)}%
                  </span>
                )}
                {gold > 0 && (
                  <span style={styles.legendItem}>
                    <span style={{ ...styles.dot, background: "#EAB308" }} /> Gold {gold.toFixed(1)}%
                  </span>
                )}
              </div>
            </>
          )}

          {/* ── Fund Performance Summary (only for My Portfolio) ── */}
          {activeTab === "my" && summary && summary.performance_summary?.length > 0 && (
            <>
              <div style={styles.divider} />
              <p style={styles.sectionTitle}>Fund Performance Summary</p>
              {summary.performance_summary.map((item: summaryInsideKeys, i: number) => {
                const key = item.name?.toLowerCase().replace(/ /g, "_");
                const barColor = performanceColors[key] ?? "#3B5BDB";
                const label = performanceLabelMap[key] ?? item.name;
                const fillPct = Math.min(100, (item.currentValue / summary?.total) * 100);
                return (
                  <div key={i} style={{ marginBottom: i < summary.performance_summary.length - 1 ? 18 : 0 }}>
                    <div style={styles.perfRow}>
                      <span style={styles.perfLabel}>{label} ({item.scheme_count})</span>
                      <span style={styles.perfAmount}>{formatAmount(item.currentValue)}</span>
                    </div>
                    <div style={styles.perfBarBg}>
                      <div style={{ ...styles.perfBarFill, width: `${fillPct}%`, background: barColor }} />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* ── AI Insight ── */}
        {aiInsight && (
          <div style={styles.insightSection}>
            <div style={styles.insightHeader}>
              <div style={styles.insightIcon}>
                <Stars size={16} color="#3B5BDB" />
              </div>
              <span style={styles.insightTitle}>AI Insight</span>
            </div>
            <p style={styles.insightText}>{aiInsight}</p>
          </div>
        )}

        {/* ── View Portfolio Link ── */}
        <div style={styles.linkSection}>
          <button
            style={styles.linkBtn}
            onClick={() => navigate("/portfolio-review")}
          >
            View detailed portfolio review →
          </button>
        </div>

      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  outerWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
  },
  /* Tab bar */
  tabBar: {
    display: "flex",
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    border: "1px solid #eef0f6",
    overflow: "hidden",
  },
  tabBtn: {
    flex: 1,
    background: "none",
    border: "none",
    padding: "12px 0",
    fontSize: 14,
    cursor: "pointer",
    transition: "color 0.2s, border-bottom 0.2s",
    outline: "none",
  },
  /* Unified Main Card */
  mainCard: {
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    border: "1px solid #eef0f6",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  cardSection: {
    padding: "16px 18px",
    background: "#ffffff",
  },
  insightSection: {
    background: "#eef1ff",
    padding: "16px 18px",
    borderTop: "1px solid #eef0f6",
  },
  linkSection: {
    background: "#ffffff",
    padding: "12px 18px",
    borderTop: "1px solid #eef0f6",
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    margin: 0,
    marginBottom: 4,
  },
  bigAmount: {
    fontSize: 28,
    fontWeight: 700,
    color: "#111827",
    margin: "2px 0 6px",
    letterSpacing: "-0.5px",
  },
  dayPill: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: 500,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    background: "#f3f4f6",
    margin: "16px 0",
  },
  statsRow: {
    display: "flex",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  statLabel: {
    fontSize: 11,
    color: "#9ca3af",
  },
  statValue: {
    fontSize: 13,
    fontWeight: 500,
    color: "#111827",
  },
  statDivider: {
    width: 1,
    height: 32,
    background: "#e5e7eb",
    margin: "0 12px",
  },
  allocBar: {
    display: "flex",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    background: "#f3f4f6",
    marginBottom: 8,
  },
  allocSegment: {
    height: "100%",
    transition: "width 0.3s ease",
  },
  allocLegendRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    color: "#374151",
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    display: "inline-block",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#111827",
    margin: "0 0 14px",
  },
  perfRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  perfLabel: {
    fontSize: 13,
    color: "#374151",
    fontWeight: 500,
  },
  perfAmount: {
    fontSize: 13,
    color: "#111827",
    fontWeight: 500,
  },
  perfBarBg: {
    height: 8,
    background: "#f3f4f6",
    borderRadius: 4,
    overflow: "hidden",
  },
  perfBarFill: {
    height: "100%",
    borderRadius: 4,
    transition: "width 0.4s ease",
  },
  insightHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  insightIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    background: "#c7d2fe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#3730a3",
  },
  insightText: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 1.6,
    margin: 0,
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#3B5BDB",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    textAlign: "center",
    width: "100%",
    letterSpacing: "0.01em",
  },
};

export default Portfolio;