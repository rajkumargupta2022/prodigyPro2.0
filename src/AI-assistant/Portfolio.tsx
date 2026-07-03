import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { ArrowUpCircleFill, ArrowDownCircleFill, Stars, ChevronDown, PersonFill } from "react-bootstrap-icons";
import { useAdminUser } from "../context/AdminContext";
import { endPoints } from "../services/utils/urls";
import { postRequestSimple } from "../services/Api/HandleApi";
import { portfolioSummaryKeys, portfolioSummaryRes, summaryInsideKeys } from "../pages/data-interfaces/portfolio";
import { allFamilyListKeys, familyDataType } from "../pages/data-interfaces/dashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiInsightResponse } from "../pages/data-interfaces/ai";
import { fetchMemberPortfolio } from "./Ai-services";



const performanceClassMap: Record<string, string> = {
  switch: "switch",
  satisfactory_performance: "satisfactory",
  under_watch: "watch",
};

const performanceLabelMap: Record<string, string> = {
  switch: "Switch",
  satisfactory_performance: "Satisfactory Performance",
  under_watch: "Under Watch",
};

const Portfolio: React.FC = () => {
  const { familySnapShotData, familyMemberList, adminUser } = useAdminUser();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<portfolioSummaryKeys | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);

  // Determine which tabs are available
  const myTab = familySnapShotData.find((d) => d.myPortfolio === true);
  const familyTab = familySnapShotData.find((d) => d.myPortfolio === false);
  const hasFamily = !!familyTab;

  // Active tab: "my" | "family"
  const [activeTab, setActiveTab] = useState<"my" | "family">("my");

  // ── Family member selector (preview another member's own portfolio) ──
  const peopleList: allFamilyListKeys[] = adminUser ? [adminUser, ...familyMemberList] : familyMemberList;
  const [selectedMember, setSelectedMember] = useState<allFamilyListKeys | null>(null);
  const [memberSnapshot, setMemberSnapshot] = useState<familyDataType | null>(null);
  const [memberLoading, setMemberLoading] = useState(false);
  const [memberDropdownOpen, setMemberDropdownOpen] = useState(false);

  // Performance summary / AI insight stay scoped to "my" perspective — the
  // selected member only when actively viewing the My Portfolio tab.
  const activeUcc = activeTab === "family" ? adminUser?.ucc : selectedMember?.ucc ?? adminUser?.ucc;

  const handleMemberSelect = (member: allFamilyListKeys) => {
    setMemberDropdownOpen(false);
    setActiveTab("my");
    setSelectedMember(member.ucc === adminUser?.ucc ? null : member);
  };

  // Derive active snapshot
  const activeSnapshot: familyDataType | undefined =
    activeTab === "family" && hasFamily
      ? familyTab
      : selectedMember
        ? memberSnapshot ?? undefined
        : myTab ?? familySnapShotData[0];

  useEffect(() => {
    let cancelled = false;
    setSummary(null);
    setAiInsight(null);

    const run = async () => {
      // Resolve the snapshot to describe in the AI insight prompt — fetched
      // fresh here (rather than read off state) so it can't race the
      // performance-summary call below.
      let snapshotForInsight: familyDataType | undefined;
      if (activeTab === "family" && hasFamily) {
        setMemberSnapshot(null);
        snapshotForInsight = familyTab;
      } else if (selectedMember && selectedMember.ucc !== adminUser?.ucc) {
        setMemberLoading(true);
        const data = await fetchMemberPortfolio(selectedMember.ucc);
        if (cancelled) return;
        setMemberSnapshot(data);
        setMemberLoading(false);
        snapshotForInsight = data ?? undefined;
      } else {
        setMemberSnapshot(null);
        snapshotForInsight = myTab ?? familySnapShotData[0];
      }

      try {
        const res = await postRequestSimple<portfolioSummaryRes>(endPoints.getSchemePerformanceSummary, { ucc: activeUcc });
        if (!cancelled && res.success) {
          setSummary(res.data);
          getAIInsight(res.data, snapshotForInsight);
        }
      } catch (e) { }
    };

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUcc, activeTab]);

  const getAIInsight = async (data: portfolioSummaryKeys, snapshot?: familyDataType) => {
    setInsightLoading(true);
    try {
      const reqBody = {
        type: "insight",
        portfolio_context: `Current Value: ${data.total},Invested: ${snapshot?.Totalpurchase},Gain/Loss: ${snapshot?.Gainloss},CAGR: ${snapshot?.Finalcagr},Portfolio Switch: ${data.performance_summary.find((s) => s.name === "Switch")?.currentValue ?? 0},Satisfactory Performance: ${data.performance_summary.find((s) => s.name === "Satisfactory Performance")?.currentValue ?? 0},Under Watch: ${data.performance_summary.find((s) => s.name === "Under Watch")?.currentValue ?? 0}`,
      }
      const token = localStorage.getItem("token")
      const response = await axios.post<AiInsightResponse>(import.meta.env.VITE_GEMINI_API_URL + endPoints.aiChat, reqBody, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.insight) {
        setAiInsight(response.data.insight);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setInsightLoading(false);
    }
  }

  const currentValue = activeSnapshot?.Totalmarketvalue ?? 0;
  const invested = activeSnapshot?.Totalpurchase ?? 0;
  const gainLoss = activeSnapshot?.Gainloss ?? 0;
  const cagr = activeSnapshot?.Finalcagr ?? "0";
  const dayChange = activeSnapshot?.Totaldayschange ?? 0;

  const formatAmount = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(2)}K`;
    return `₹${val.toLocaleString("en-IN")}`;
  };



  const activePerson = selectedMember ?? adminUser;
  const activePersonLabel = activePerson
    ? `${activePerson.name} (${activePerson.hold_n_code === "SI" ? "Single" : "Joint"})`
    : "Select member";

  return (
    <div className="portfolio-outer-wrap">

      {/* ── Family Member Selector ── */}
      {peopleList.length > 1 && (
        <div className="portfolio-member-select">
          <button
            type="button"
            className="portfolio-member-select-btn"
            onClick={() => setMemberDropdownOpen((open) => !open)}
          >
            <span className="portfolio-member-select-icon">
              <PersonFill size={12} />
            </span>
            <span className="portfolio-member-select-name">{activePersonLabel}</span>
            <ChevronDown size={12} className={`portfolio-member-select-chevron ${memberDropdownOpen ? "open" : ""}`} />
          </button>

          {memberDropdownOpen && (
            <>
              <div className="portfolio-member-backdrop" onClick={() => setMemberDropdownOpen(false)} />
              <div className="portfolio-member-dropdown">
                {peopleList.map((person) => {
                  const isActive = (selectedMember?.ucc ?? adminUser?.ucc) === person.ucc;
                  return (
                    <button
                      type="button"
                      key={person.ucc}
                      className={`portfolio-member-item ${isActive ? "active" : ""}`}
                      onClick={() => handleMemberSelect(person)}
                    >
                      {person.name} ({person.hold_n_code === "SI" ? "Single" : "Joint"})
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Tab Switcher ── */}
      {hasFamily && (
        <div className="portfolio-tab-bar">
          <button
            className={`portfolio-tab-btn ${activeTab === "my" ? "active" : ""}`}
            onClick={() => setActiveTab("my")}
          >
            My Portfolio
          </button>
          <button
            className={`portfolio-tab-btn ${activeTab === "family" ? "active" : ""}`}
            onClick={() => setActiveTab("family")}
          >
            Family
          </button>
        </div>
      )}

      {/* ── Main Unified Card ── */}
      <div className="portfolio-main-card">

        {/* Top White Section */}
        <div className="portfolio-card-section">
          {memberLoading ? (
            <div className="portfolio-member-loading">
              <Spinner animation="border" size="sm" />
              <span className="portfolio-member-loading-text">Loading {selectedMember?.name}'s portfolio...</span>
            </div>
          ) : (
            <>
          {/* Current Value */}
          <p className="portfolio-label">Current Value</p>
          <h2 className="portfolio-big-amount">
            ₹{currentValue.toLocaleString("en-IN")}
          </h2>

          {/* Day change pill */}
          <div className={`portfolio-day-pill ${dayChange >= 0 ? "positive" : "negative"}`}>
            {dayChange >= 0
              ? <ArrowUpCircleFill size={12} />
              : <ArrowDownCircleFill size={12} />}
            <span className="portfolio-day-pill-text">
              ₹{Math.abs(dayChange).toLocaleString("en-IN")} today
            </span>
          </div>

          {/* Divider */}
          <div className="portfolio-divider" />

          {/* Stats row */}
          <div className="portfolio-stats-row">
            <div className="portfolio-stat-item">
              <span className="portfolio-stat-label">Invested</span>
              <span className="portfolio-stat-value">
                ₹{invested >= 100000
                  ? `${(invested / 100000).toFixed(2)}L`
                  : invested.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="portfolio-stat-divider" />
            <div className="portfolio-stat-item">
              <span className="portfolio-stat-label">Gain / Loss</span>
              <span className={`portfolio-stat-value emphasis ${gainLoss >= 0 ? "positive" : "negative"}`}>
                {gainLoss >= 0 ? "+" : ""}
                {formatAmount(gainLoss)}
              </span>
            </div>
            <div className="portfolio-stat-divider" />
            <div className="portfolio-stat-item">
              <span className="portfolio-stat-label">CAGR</span>
              <span className={`portfolio-stat-value emphasis ${Number(cagr) >= 0 ? "positive" : "negative"}`}>
                {Number(cagr) >= 0 ? "+" : ""}
                {cagr}%
              </span>
            </div>
          </div>
            </>
          )}

          {/* ── Fund Performance Summary (only for My Portfolio) ── */}
          {!memberLoading && activeTab === "my" && summary && summary.performance_summary?.length > 0 && (
            <>
              <div className="portfolio-divider" />
              <p className="portfolio-section-title">Fund Performance Summary</p>
              {summary.performance_summary.map((item: summaryInsideKeys, i: number) => {
                const key = item.name?.toLowerCase().replace(/ /g, "_");
                const barClass = performanceClassMap[key] ?? "default";
                const label = performanceLabelMap[key] ?? item.name;
                const fillPct = Math.min(100, (item.currentValue / summary?.total) * 100);
                return (
                  <div key={i} className={`portfolio-perf-item ${i < summary.performance_summary.length - 1 ? "with-margin" : ""}`}>
                    <div className="portfolio-perf-row">
                      <span className="portfolio-perf-label">{label} ({item.scheme_count})</span>
                      <span className="portfolio-perf-amount">{formatAmount(item.currentValue)}</span>
                    </div>
                    <div className="portfolio-perf-bar-bg">
                      <div className={`portfolio-perf-bar-fill ${barClass}`} style={{ width: `${fillPct}%` }} />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* ── AI Insight ── */}
        {(insightLoading || aiInsight) && (
          <div className="portfolio-insight-section">
            <div className="portfolio-insight-header">
              <div className="portfolio-insight-icon">
                <Stars size={16} color="#3B5BDB" />
              </div>
              <span className="portfolio-insight-title">AI Insight</span>
            </div>
            {insightLoading ? (
              <div className="portfolio-insight-loading-row">
                <Spinner animation="border" size="sm" className="portfolio-insight-spinner" />
                <span className="portfolio-insight-loading-text">Generating insight...</span>
              </div>
            ) : (
              <p className="portfolio-insight-text">{aiInsight}</p>
            )}
          </div>
        )}

        {/* ── View Portfolio Link ── */}
        <div className="portfolio-link-section">
          <button
            className="portfolio-link-btn"
            onClick={() => navigate("/portfolio-review")}
          >
            View detailed portfolio review →
          </button>
        </div>

      </div>
    </div>
  );
};

export default Portfolio;
