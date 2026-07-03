
import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import logo from "/title-icon.svg";
import { ArrowClockwise, Send, X, Search, ArrowRepeat, GraphUpArrow, PieChartFill, StarFill, PatchCheckFill } from "react-bootstrap-icons";
import { initialPrompt } from "./promts";
import {
  handleAIIntent,
  fetchRiskDurationOptions,
  RiskDurationOptions,
  InvestData,
  InvestPrefill,
  TransactionTypeChoice,
  fetchSchemeDetails,
  fetchSchemeList,
  fetchInvestFolios,
  fetchInvestMandates,
  submitInvestTransaction,
  ordinalSuffix,
} from "./Ai-services";
import SchemeList from "./Scheme-list";
import SchemeDetail from "./Scheme-detail";
import InvestFolioList from "./Invest-folio-list";
import InvestMandateList from "./Invest-mandate-list";
import InvestSummary from "./Invest-summary";
import InvestResult from "./Invest-result";
import Portfolio from "./Portfolio";
import TopPerformers from "./Top-performers";
import NfoLive from "./Nfo-live";
import RecommendedFunds from "./Recommended-funds";
import { foliosKeys, bankMandateKeys, schemeDeatilDataKeys, sipPurchaseRedemptionKey } from "../pages/data-interfaces/transact";
import { searchKeys, durationKeys, riskKeys } from "../pages/data-interfaces/explore";
import axios from "axios";
import { aiChatResponse } from "../pages/data-interfaces/ai";
import { endPoints } from "../services/utils/urls";


const assistant = "assistant"
const user = "user";
interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

interface Message {
  role: typeof user | typeof assistant;
  text: string;
  schemeOptions?: searchKeys[];
  schemeDetails?: schemeDeatilDataKeys
  folioOptions?: foliosKeys[]
  mandateOptions?: bankMandateKeys[]
  investSummary?: InvestData
  investResult?: { success: boolean; results: sipPurchaseRedemptionKey[]; transactionType?: TransactionTypeChoice }
  portfolioData?: any
  topPerformersData?: boolean
  nfoLiveData?: boolean
  recommendedFundsData?: boolean
  recommendRisk?: number
  recommendDuration?: number
}

type QuickReplyStage = "risk" | "horizon" | "transactionType" | "sipDate" | null;

const riskEmoji = (risk: number): string => (risk === 1 ? "🛡️" : risk === 3 ? "🚀" : "⚖️");

const riskDescription = (risk: number): string =>
  risk === 1
    ? "capital protection with steady, low-volatility returns"
    : risk === 3
      ? "higher equity exposure aiming for maximum long-term growth"
      : "a balanced mix of equity and debt funds designed for steady, long-term growth";

const renderMessageText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{part}</React.Fragment>
  );
};

type QuickAction = "search" | "sip" | "top_performers" | "portfolio" | "nfo" | "recommended";

const quickActions: { action: QuickAction; label: string; icon: React.ReactNode }[] = [
  { action: "search", label: "Search a fund", icon: <Search size={15} /> },
  { action: "sip", label: "Invest in SIP", icon: <ArrowRepeat size={15} /> },
  { action: "top_performers", label: "Top performers", icon: <GraphUpArrow size={15} /> },
  { action: "portfolio", label: "My portfolio", icon: <PieChartFill size={15} /> },
  { action: "nfo", label: "Live NFOs", icon: <StarFill size={15} /> },
  { action: "recommended", label: "Recommended Funds", icon: <PatchCheckFill size={15} /> },
];

const ChatBoatUi: React.FC<Props> = ({ show, setShow }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: assistant,
      text: initialPrompt,
    },
  ]);

  const [quickReplyStage, setQuickReplyStage] = useState<QuickReplyStage>(null);
  const [riskDurationOptions, setRiskDurationOptions] = useState<RiskDurationOptions | null>(null);
  const [pendingRisk, setPendingRisk] = useState<number | null>(null);

  const [investData, setInvestData] = useState<InvestData | null>(null);
  const [awaitingAmount, setAwaitingAmount] = useState(false);
  const [awaitingSchemeQuery, setAwaitingSchemeQuery] = useState(false);
  const [pendingInvestPrefill, setPendingInvestPrefill] = useState<InvestPrefill | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const resetChat = () => {
    setMessages([
      {
        role: assistant,
        text: initialPrompt,
      },
    ]);
    setQuickReplyStage(null);
    setPendingRisk(null);
    setInvestData(null);
    setAwaitingAmount(false);
    setAwaitingSchemeQuery(false);
    setPendingInvestPrefill(null);
  };

  useEffect(() => {
    if (!show) {
      resetChat();
    }
  }, [show])

  const startRecommendFundsFlow = async () => {
    const options = await fetchRiskDurationOptions();
    setRiskDurationOptions(options);
    setPendingRisk(null);
    setQuickReplyStage("risk");
  };

  const handleRiskSelect = (item: riskKeys) => {
    setQuickReplyStage(null);
    setPendingRisk(item.risk);
    setMessages((prev) => [
      ...prev,
      { role: user, text: `${item.Constellation} ${riskEmoji(item.risk)}` },
      {
        role: assistant,
        text: `Great! **${item.Constellation}** investors typically look for ${riskDescription(item.risk)}.\n\nWhat is your **investment horizon**?`,
      },
    ]);
    setQuickReplyStage("horizon");
  };

  const handleHorizonSelect = (item: durationKeys) => {
    setQuickReplyStage(null);
    const riskLabel = riskDurationOptions?.dataRisk.find((r) => r.risk === pendingRisk)?.Constellation ?? "";
    setMessages((prev) => [
      ...prev,
      { role: user, text: item.duration },
      {
        role: assistant,
        text: `For a **${riskLabel}** investor with a **${item.duration}** horizon, here are funds that balance growth and stability — a smart choice for steady, long-term wealth building:`,
        recommendedFundsData: true,
        recommendRisk: pendingRisk ?? undefined,
        recommendDuration: item.durationValues,
      },
    ]);
    setPendingRisk(null);
  };

  const handleQuickAction = async (action: QuickAction, label: string) => {
    setMessages((prev) => [...prev, { role: user, text: label }]);

    switch (action) {
      case "search":
        setPendingInvestPrefill(null);
        setAwaitingSchemeQuery(true);
        setMessages((prev) => [
          ...prev,
          { role: assistant, text: "Sure! Which scheme or AMC would you like to search for?" },
        ]);
        break;
      case "sip":
        setPendingInvestPrefill({ transactionType: "SIP" });
        setAwaitingSchemeQuery(true);
        setMessages((prev) => [
          ...prev,
          { role: assistant, text: "Sure! Which scheme or AMC would you like to invest in?" },
        ]);
        break;
      case "top_performers":
        setMessages((prev) => [
          ...prev,
          { role: assistant, text: "Here are today's top performing funds:", topPerformersData: true },
        ]);
        break;
      case "portfolio":
        setMessages((prev) => [
          ...prev,
          { role: assistant, text: "Here's an overview of your portfolio:", portfolioData: true },
        ]);
        break;
      case "nfo":
        setMessages((prev) => [
          ...prev,
          { role: assistant, text: "Here are the live NFOs you can apply for:", nfoLiveData: true },
        ]);
        break;
      case "recommended":
        setMessages((prev) => [
          ...prev,
          { role: assistant, text: "Let's find the right funds for you! What's your risk appetite?" },
        ]);
        await startRecommendFundsFlow();
        break;
    }
  };

  //invest flow=====================================================
  const startInvestFlow = async (
    scheme: searchKeys,
    prefill?: InvestPrefill | null
  ) => {
    setLoading(true);
    const detail = await fetchSchemeDetails(scheme.accord_scheme_code);
    setLoading(false);

    if (!detail) {
      setMessages((prev) => [
        ...prev,
        { role: assistant, text: "Sorry, I couldn't fetch the details for this scheme." },
      ]);
      return;
    }

    const sipAllowed = !!detail.sipAllowed;
    const purchaseAllowed = !!detail.purchaseAllowed;

    let transactionType = prefill?.transactionType;
    let mismatchNote: string | null = null;
    if (transactionType === "SIP" && !sipAllowed) {
      transactionType = undefined;
      mismatchNote = `Sorry, **${detail.scheme}** doesn't support SIP investments.`;
    }
    if (transactionType === "PURCHASE" && !purchaseAllowed) {
      transactionType = undefined;
      mismatchNote = `Sorry, **${detail.scheme}** doesn't support one-time (lumpsum) investments.`;
    }
    if (!transactionType) {
      if (sipAllowed && !purchaseAllowed) transactionType = "SIP";
      else if (purchaseAllowed && !sipAllowed) transactionType = "PURCHASE";
    }

    const data: InvestData = {
      scheme: detail,
      transactionType,
      amount: prefill?.amount,
      sipDate: prefill?.sipDate,
    };
    setInvestData(data);

    setMessages((prev) => [
      ...prev,
      {
        role: assistant,
        text: `Here are the details for ${detail.scheme}. Let me know if you'd like to invest or have any questions!`,
        schemeDetails: detail,
      },
    ]);

    if (!sipAllowed && !purchaseAllowed) {
      setMessages((prev) => [
        ...prev,
        { role: assistant, text: "Sorry, this scheme currently doesn't support SIP or one-time investments." },
      ]);
      setInvestData(null);
      return;
    }

    if (mismatchNote) {
      setMessages((prev) => [
        ...prev,
        {
          role: assistant,
          text: transactionType
            ? `${mismatchNote} We'll proceed with ${transactionType === "SIP" ? "a monthly SIP" : "a one-time investment"} instead — let us know if you'd like a different fund.`
            : `${mismatchNote} Please choose a different investment type below.`,
        },
      ]);
    }

    if (data.transactionType) {
      await proceedAfterTransactionType(data);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: assistant, text: "Would you prefer a one-time investment or a monthly SIP?" },
      ]);
      setQuickReplyStage("transactionType");
    }
  };

  const proceedAfterTransactionType = async (data: InvestData) => {
    setInvestData(data);
    if (!data.amount) {
      const minRequired = data.transactionType === "SIP" ? data.scheme.minSIPAmt : data.scheme.minLumSumAmt;
      setMessages((prev) => [
        ...prev,
        {
          role: assistant,
          text: `What amount would you like to invest? (Minimum ₹${minRequired ?? 0})`,
        },
      ]);
      setAwaitingAmount(true);
      return;
    }
    await proceedAfterAmount(data);
  };

  const handleTransactionTypeSelect = async (type: TransactionTypeChoice) => {
    setQuickReplyStage(null);
    const label = type === "SIP" ? "Monthly SIP" : "One-time (Lumpsum)";
    setMessages((prev) => [...prev, { role: user, text: label }]);
    if (!investData) return;
    await proceedAfterTransactionType({ ...investData, transactionType: type });
  };

  const proceedAfterAmount = async (data: InvestData) => {
    setInvestData(data);
    if (data.transactionType === "SIP" && data.scheme.sipDateList && data.scheme.sipDateList.length > 0) {
      if (data.sipDate && data.scheme.sipDateList.includes(data.sipDate)) {
        await proceedToFolioSelection(data);
        return;
      }
      setMessages((prev) => [
        ...prev,
        { role: assistant, text: "Which date of the month would you like for your SIP installments?" },
      ]);
      setQuickReplyStage("sipDate");
      return;
    }
    await proceedToFolioSelection(data);
  };

  const handleSipDateSelect = async (day: number) => {
    setQuickReplyStage(null);
    setMessages((prev) => [...prev, { role: user, text: ordinalSuffix(day) }]);
    if (!investData) return;
    const data: InvestData = { ...investData, sipDate: day };
    await proceedToFolioSelection(data);
  };

  const proceedToFolioSelection = async (data: InvestData) => {
    setInvestData(data);
    setLoading(true);
    const folios = await fetchInvestFolios(data.scheme.accordSchemeCode);
    setLoading(false);

    setMessages((prev) => [
      ...prev,
      {
        role: assistant,
        text: folios.length > 0
          ? "I found existing folios for this fund. Would you like to add to an existing one or start a new folio?"
          : "You don't have an existing folio for this fund yet. Let's create a new one.",
        folioOptions: folios,
      },
    ]);
  };

  const handleFolioSelect = async (folio: foliosKeys | null) => {
    setMessages((prev) => [
      ...prev,
      { role: user, text: folio ? `Folio ${folio.folio_number}` : "Create New Folio" },
    ]);
    if (!investData) return;
    const data: InvestData = { ...investData, folio: folio ?? undefined, isNewFolio: !folio };

    if (data.transactionType === "SIP") {
      await proceedToMandateSelection(data);
    } else {
      showInvestSummary(data);
    }
  };

  const proceedToMandateSelection = async (data: InvestData) => {
    setInvestData(data);
    setLoading(true);
    const mandates = await fetchInvestMandates(data.amount ?? 0);
    setLoading(false);

    if (mandates.length === 0) {
      setMessages((prev) => [
        ...prev,
        {
          role: assistant,
          text: "You don't have an active bank mandate that covers this amount. Please create a mandate to continue with the SIP.",
        },
      ]);
      setInvestData(null);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { role: assistant, text: "Please choose a bank mandate for your SIP:", mandateOptions: mandates },
    ]);
  };

  const handleMandateSelect = (mandate: bankMandateKeys) => {
    setMessages((prev) => [...prev, { role: user, text: `${mandate.bank_name} (${mandate.umrn_no})` }]);
    if (!investData) return;
    showInvestSummary({ ...investData, mandate });
  };

  const showInvestSummary = (data: InvestData) => {
    setInvestData(data);
    setMessages((prev) => [...prev, { role: assistant, text: "", investSummary: data }]);
  };

  const handleCancelInvest = () => {
    setInvestData(null);
    setMessages((prev) => [
      ...prev,
      { role: user, text: "Cancel" },
      { role: assistant, text: "No problem! Let me know if you'd like to explore other investment options." },
    ]);
  };

  const handleConfirmInvest = async () => {
    if (!investData) return;
    const transactionType = investData.transactionType;
    setMessages((prev) => [...prev, { role: user, text: "Yes, confirm" }]);
    setLoading(true);
    const result = await submitInvestTransaction(investData);
    setLoading(false);

    const allPassed = result.success && result.results.length > 0 && result.results.every((r) => r.reg_status);

    setMessages((prev) => [
      ...prev,
      {
        role: assistant,
        text: allPassed
          ? "🎉 Your investment has been placed successfully! You can track it in the Orders section."
          : "Something went wrong while placing your investment. Please try again.",
        investResult: { ...result, transactionType },
      },
    ]);
    setInvestData(null);
  };

  const sendMessage = async (
    e?: React.FormEvent | React.MouseEvent
  ) => {
    e?.preventDefault();

    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");

    if (awaitingAmount && investData) {
      setAwaitingAmount(false);
      setMessages((prev) => [...prev, { role: user, text: userText }]);

      const parsedAmount = Number(userText.replace(/[^0-9.]/g, ""));
      const minRequired = investData.transactionType === "SIP" ? investData.scheme.minSIPAmt : investData.scheme.minLumSumAmt;

      if (!parsedAmount || parsedAmount <= 0) {
        setMessages((prev) => [...prev, { role: assistant, text: "Please enter a valid amount." }]);
        setAwaitingAmount(true);
        return;
      }
      if (minRequired && parsedAmount < minRequired) {
        setMessages((prev) => [
          ...prev,
          { role: assistant, text: `Minimum investment amount is ₹${minRequired}. Please enter a valid amount.` },
        ]);
        setAwaitingAmount(true);
        return;
      }

      await proceedAfterAmount({ ...investData, amount: parsedAmount });
      return;
    }

    if (awaitingSchemeQuery) {
      setAwaitingSchemeQuery(false);
      setMessages((prev) => [...prev, { role: user, text: userText }]);
      setLoading(true);
      const schemeList = await fetchSchemeList(userText);
      setLoading(false);

      if (!schemeList || schemeList.length === 0) {
        setMessages((prev) => [
          ...prev,
          { role: assistant, text: `I couldn't find any schemes matching "${userText}". Please try another name.` },
        ]);
        setAwaitingSchemeQuery(true);
        return;
      }

      if (schemeList.length === 1) {
        const prefill = pendingInvestPrefill;
        setPendingInvestPrefill(null);
        await startInvestFlow(schemeList[0], prefill);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: assistant,
            text: `Here are the top results for "${userText}". Select one to proceed with your investment:`,
            schemeOptions: schemeList,
          },
        ]);
      }
      return;
    }

    const userMessage: Message = {
      role: user,
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuickReplyStage(null);

    try {
      const reqBody = { type: "intent", message: userText }
      const token = localStorage.getItem("token")
      const response = await axios.post<aiChatResponse>(import.meta.env.VITE_GEMINI_API_URL + endPoints.aiChat, reqBody, { headers: { Authorization: `Bearer ${token}` } });

      const aiText = response.data?.message || "Sorry, I could not generate a response.";
      const aiParams = response.data?.params;
      const intent = response.data?.intent;

      const intentResult = await handleAIIntent(intent, aiParams,userText);

      setMessages((prev) => [
        ...prev,
        {
          role: assistant,
          text: aiText,
          ...(intentResult.portfolioData ? { portfolioData: true } : {}),
          ...(intentResult.topPerformersData ? { topPerformersData: true } : {}),
          ...(intentResult.nfoLiveData ? { nfoLiveData: true } : {}),
        },
      ]);

      if (intentResult.startRecommendFlow) {
        await startRecommendFundsFlow();
      }

      if (intentResult.followUp) {
        setMessages((prev) => [
          ...prev,
          {
            role: assistant,
            text: intentResult.followUp!.text,
            ...(intentResult.followUp!.schemeOptions ? { schemeOptions: intentResult.followUp!.schemeOptions } : {}),
          },
        ]);
        setPendingInvestPrefill(intentResult.followUp!.investPrefill ?? null);
      }

      if (intentResult.investFlow) {
        const { scheme, ...prefill } = intentResult.investFlow;
        await startInvestFlow(scheme, prefill);
      }

      if (intentResult.askInvestScheme) {
        setMessages((prev) => [
          ...prev,
          { role: assistant, text: "Sure! Which scheme or AMC would you like to invest in?" },
        ]);
        setPendingInvestPrefill(intentResult.askInvestScheme);
        setAwaitingSchemeQuery(true);
      }

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: assistant,
          text: "Something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };
  const handleRefreshChat = () => {
    resetChat();
  }

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
      contentClassName="border-0 rounded-4 overflow-hidden shadow-lg"
    >
      <Modal.Header closeButton={false} className="chat-header">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Left Side */}
          <div className="d-flex align-items-center">
            <div className="chat-header-avatar me-2">
              <img
                src={logo}
                alt="logo"
                width={22}
              />
            </div>

            <div className="d-flex flex-column">
              <h6 className="text-black mb-0">Prodigy AI</h6>
              <small className={`chat-status-row ${loading ? "thinking" : "online"}`}>
                <span className="chat-status-dot" />
                {loading ? "Thinking..." : "Online"}
              </small>
            </div>
          </div>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3">
            <ArrowClockwise
              size={22}
              role="button"
              className="text-secondary chat-header-icon-btn"
              onClick={handleRefreshChat}
              title="New Chat"
            />

            <Button
              variant="link"
              className="p-0 border-0 text-dark shadow-none"
              onClick={() => setShow(false)}
            >
              <X size={26} />
            </Button>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-0">
        <div
          className="d-flex flex-column chat-modal-body-wrap"
        >
          {/* Chat Messages */}
          <div
            className="flex-grow-1 p-2 overflow-auto bg-light"
          >
            {messages.length === 1 && !loading && (
              <div className="chat-empty-state">
                <div className="chat-empty-avatar">
                  <img src={logo} alt="Prodigy AI" width={30} />
                </div>
                <p className="chat-empty-greeting">{renderMessageText(messages[0].text)}</p>

                <div className="chat-quick-action-grid">
                  {quickActions.map((qa) => (
                    <button
                      key={qa.action}
                      type="button"
                      className="chat-quick-action-btn"
                      onClick={() => handleQuickAction(qa.action, qa.label)}
                    >
                      <span className="chat-quick-action-icon">{qa.icon}</span>
                      <span className="chat-quick-action-label">{qa.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!(messages.length === 1 && !loading) && messages.map((msg, index) => {
              const isCardMessage = !!(
                msg.portfolioData || msg.topPerformersData || msg.nfoLiveData || msg.recommendedFundsData ||
                msg.schemeDetails || msg.folioOptions || msg.mandateOptions || msg.investSummary || msg.investResult
              );

              return (
              <div
                key={index}
                className={`mb-3 ${msg.role === user
                  ? "text-end"
                  : "text-start"
                  }`}
              >
                <div
                  className={`chat-message-bubble d-inline-block p-2 rounded-3 ${msg.role === user
                    ? "logobg_color text-white"
                    : isCardMessage ? "bg-light border-0 shadow-none" : "bg-white shadow-sm border"
                    } ${msg.schemeOptions || isCardMessage ? "wide" : ""} ${isCardMessage ? "card" : ""}`}
                >
                  {!isCardMessage && renderMessageText(msg.text)}
                  {msg.portfolioData && (
                    <Portfolio />
                  )}
                  {msg.topPerformersData && (
                    <div className="chat-card-wrapper">
                      <p className="chat-card-message-text">{renderMessageText(msg.text)}</p>
                      <TopPerformers />
                    </div>
                  )}
                  {msg.nfoLiveData && (
                    <div className="chat-card-wrapper">
                      <p className="chat-card-message-text">{renderMessageText(msg.text)}</p>
                      <NfoLive />
                    </div>
                  )}
                  {msg.recommendedFundsData && msg.recommendRisk !== undefined && msg.recommendDuration !== undefined && (
                    <div className="chat-card-wrapper">
                      <p className="chat-card-message-text">{renderMessageText(msg.text)}</p>
                      <RecommendedFunds risk={msg.recommendRisk} duration={msg.recommendDuration} />
                    </div>
                  )}
                  {msg.schemeDetails && (
                    <div className="chat-card-wrapper">
                      <p className="chat-card-message-text">{renderMessageText(msg.text)}</p>
                      <SchemeDetail scheme={msg.schemeDetails} />
                    </div>
                  )}
                  {msg.folioOptions && (
                    <div className="chat-card-wrapper">
                      <p className="chat-card-message-text">{renderMessageText(msg.text)}</p>
                      <InvestFolioList folios={msg.folioOptions} onSelect={handleFolioSelect} />
                    </div>
                  )}
                  {msg.mandateOptions && (
                    <div className="chat-card-wrapper">
                      <p className="chat-card-message-text">{renderMessageText(msg.text)}</p>
                      <InvestMandateList mandates={msg.mandateOptions} onSelect={handleMandateSelect} />
                    </div>
                  )}
                  {msg.investSummary && (
                    <InvestSummary
                      data={msg.investSummary}
                      onCancel={handleCancelInvest}
                      onConfirm={handleConfirmInvest}
                      disabled={loading}
                    />
                  )}
                  {msg.investResult && (
                    <div className="chat-card-wrapper">
                      <p className="chat-card-message-text">{renderMessageText(msg.text)}</p>
                      <InvestResult
                        success={msg.investResult.success}
                        results={msg.investResult.results}
                        transactionType={msg.investResult.transactionType}
                      />
                    </div>
                  )}
                  {msg.schemeOptions && msg.schemeOptions.length > 0 && (
                    <div className="mt-2">
                      <SchemeList
                        schemes={msg.schemeOptions}
                        onSelect={(scheme) => {
                          const prefill = pendingInvestPrefill;
                          setPendingInvestPrefill(null);
                          startInvestFlow(scheme, prefill);
                        }}
                      />
                    </div>
                  )}

                </div>
              </div>
              );
            })}

            {loading && (
              <div className="text-start mb-3">
                <div className="bg-white border rounded-4 p-3 d-inline-block">
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Thinking...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Reply Pills */}
          {quickReplyStage && (
            <div className="d-flex overflow-auto bg-white px-3 py-3 chat-quick-reply-row">
              {quickReplyStage === "risk" && (riskDurationOptions?.dataRisk ?? []).map((item, i) => (
                <button
                  key={i}
                  type="button"
                  className="chat-quick-reply-pill"
                  onClick={() => handleRiskSelect(item)}
                >
                  {item.Constellation} {riskEmoji(item.risk)}
                </button>
              ))}
              {quickReplyStage === "horizon" && (riskDurationOptions?.dataDuration ?? []).map((item, i) => (
                <button
                  key={i}
                  type="button"
                  className="chat-quick-reply-pill"
                  onClick={() => handleHorizonSelect(item)}
                >
                  {item.duration}
                </button>
              ))}
              {quickReplyStage === "transactionType" && (
                <>
                  {investData?.scheme.purchaseAllowed && (
                    <button
                      type="button"
                      className="chat-quick-reply-pill"
                      onClick={() => handleTransactionTypeSelect("PURCHASE")}
                    >
                      One-time (Lumpsum)
                    </button>
                  )}
                  {investData?.scheme.sipAllowed && (
                    <button
                      type="button"
                      className="chat-quick-reply-pill"
                      onClick={() => handleTransactionTypeSelect("SIP")}
                    >
                      Monthly SIP
                    </button>
                  )}
                </>
              )}
              {quickReplyStage === "sipDate" && (investData?.scheme.sipDateList ?? []).map((day, i) => (
                <button
                  key={i}
                  type="button"
                  className="chat-quick-reply-pill"
                  onClick={() => handleSipDateSelect(day)}
                >
                  {ordinalSuffix(day)}
                </button>
              ))}
            </div>
          )}

          {/* Input Section */}
          <div className="border-top bg-white p-3">
            <Form onSubmit={sendMessage}>
              <div
                className="d-flex align-items-center bg-light rounded-pill px-2 chat-input-row"
              >
                <Form.Control
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about mutual funds..."
                  className="border-0 bg-transparent shadow-none"
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="rounded-circle logobg_color no-hover chat-send-btn"
                >
                  <Send />
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChatBoatUi;
