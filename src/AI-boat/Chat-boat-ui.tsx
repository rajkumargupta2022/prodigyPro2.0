
import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import logo from "/title-icon.svg";
import { ArrowClockwise, Send, X } from "react-bootstrap-icons";
import { GoogleGenAI } from "@google/genai";
import { initialPrompt, initialPrompt2 } from "./promts";
import { handleAIIntent, fetchRiskDurationOptions, RiskDurationOptions } from "./Ai-services";
import SchemeList from "./Scheme-list";
import Portfolio from "./Portfolio";
import TopPerformers from "./Top-performers";
import NfoLive from "./Nfo-live";
import RecommendedFunds from "./Recommended-funds";
import { foliosKeys, schemeDeatilDataKeys } from "../pages/data-interfaces/transact";
import { searchKeys, durationKeys, riskKeys } from "../pages/data-interfaces/explore";
import { mandateKeys } from "../pages/data-interfaces/bank-and-mandate";
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
  investmentResult?: any
  folioOptions?: foliosKeys[]
  mandateOptions?: mandateKeys[]
  portfolioData?: any
  topPerformersData?: boolean
  nfoLiveData?: boolean
  recommendedFundsData?: boolean
  recommendRisk?: number
  recommendDuration?: number
  profileOptions?: any
  recommendedSchemes?: schemeDeatilDataKeys[]
  showSupportButton?: boolean
}

type QuickReplyStage = "risk" | "horizon" | null;

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

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!show) {
      setMessages([
        {
          role: assistant,
          text: initialPrompt,
        },
      ]);
      setQuickReplyStage(null);
      setPendingRisk(null);
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

  const sendMessage = async (
    e?: React.FormEvent | React.MouseEvent
  ) => {
    e?.preventDefault();

    if (!input.trim() || loading) return;

    const userText = input;

    const userMessage: Message = {
      role: user,
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setQuickReplyStage(null);

    try {
      const reqBody = { type: "intent", message: userText }
      const token = localStorage.getItem("token")
      const response = await axios.post<aiChatResponse>(import.meta.env.VITE_GEMINI_API_URL + endPoints.aiChat, reqBody, { headers: { Authorization: `Bearer ${token}` } });

      const aiText = response.data?.message || "Sorry, I could not generate a response.";
      const aiParams = response.data?.params;
      const intent = response.data?.intent;

      const intentResult = await handleAIIntent(intent, aiParams);

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
    setMessages([
      {
        role: assistant,
        text: initialPrompt,
      },
    ]);
    setQuickReplyStage(null);
    setPendingRisk(null);
  }

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
      contentClassName="border-0 rounded-4 overflow-hidden shadow-lg"
    >
      <Modal.Header closeButton={false}>
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Left Side */}
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="logo"
              width={35}
              className="me-2"
            />

            <div className="d-flex flex-column">
              <h6 className="text-black mb-0 mt-1">Prodigy AI</h6>
              {loading ? (
                <small className="text-warning fs12px">Thinking...</small>

              ) : <small className="text-success fs12px">Online</small>}
            </div>
          </div>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3">
            <ArrowClockwise
              size={22}
              role="button"
              className="text-secondary"
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
          className="d-flex flex-column"
          style={{
            height: "75vh",
          }}
        >
          {/* Chat Messages */}
          <div
            className="flex-grow-1 p-2 overflow-auto bg-light"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 ${msg.role === user
                  ? "text-end"
                  : "text-start"
                  }`}
              >
                <div
                  className={`d-inline-block p-2 rounded-3 ${msg.role === user
                    ? "logobg_color text-white"
                    : msg.portfolioData || msg.topPerformersData || msg.nfoLiveData || msg.recommendedFundsData ? "bg-light border-0 shadow-none" : "bg-white shadow-sm border"
                    }`}
                  style={{
                    maxWidth: msg.schemeOptions || msg.portfolioData || msg.topPerformersData || msg.nfoLiveData || msg.recommendedFundsData ? "95%" : "80%",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.4",
                    width: msg.schemeOptions || msg.portfolioData || msg.topPerformersData || msg.nfoLiveData || msg.recommendedFundsData ? "95%" : undefined,
                    padding: msg.portfolioData || msg.topPerformersData || msg.nfoLiveData || msg.recommendedFundsData ? "0" : undefined,
                    background: msg.portfolioData || msg.topPerformersData || msg.nfoLiveData || msg.recommendedFundsData ? "transparent" : undefined,
                  }}
                >
                  {!msg.portfolioData && !msg.topPerformersData && !msg.nfoLiveData && !msg.recommendedFundsData && renderMessageText(msg.text)}
                  {msg.portfolioData && (
                    <Portfolio />
                  )}
                  {msg.topPerformersData && (
                    <div style={{ width: "100%", textAlign: "left" }}>
                      <p style={{ color: "#374151", margin: "0 0 12px 12px", whiteSpace: "pre-wrap" }}>{renderMessageText(msg.text)}</p>
                      <TopPerformers />
                    </div>
                  )}
                  {msg.nfoLiveData && (
                    <div style={{ width: "100%", textAlign: "left" }}>
                      <p style={{ color: "#374151", margin: "0 0 12px 12px", whiteSpace: "pre-wrap" }}>{renderMessageText(msg.text)}</p>
                      <NfoLive />
                    </div>
                  )}
                  {msg.recommendedFundsData && msg.recommendRisk !== undefined && msg.recommendDuration !== undefined && (
                    <div style={{ width: "100%", textAlign: "left" }}>
                      <p style={{ color: "#374151", margin: "0 0 12px 12px", whiteSpace: "pre-wrap" }}>{renderMessageText(msg.text)}</p>
                      <RecommendedFunds risk={msg.recommendRisk} duration={msg.recommendDuration} />
                    </div>
                  )}
                  {msg.schemeOptions && msg.schemeOptions.length > 0 && (
                    <div className="mt-2">
                      <SchemeList schemes={msg.schemeOptions} />
                    </div>
                  )}

                </div>
              </div>
            ))}

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
            <div className="d-flex overflow-auto bg-white px-3 pt-2" style={{ gap: 8 }}>
              {quickReplyStage === "risk" && (riskDurationOptions?.dataRisk ?? []).map((item, i) => (
                <button
                  key={i}
                  type="button"
                  style={styles.quickReplyPill}
                  onClick={() => handleRiskSelect(item)}
                >
                  {item.Constellation} {riskEmoji(item.risk)}
                </button>
              ))}
              {quickReplyStage === "horizon" && (riskDurationOptions?.dataDuration ?? []).map((item, i) => (
                <button
                  key={i}
                  type="button"
                  style={styles.quickReplyPill}
                  onClick={() => handleHorizonSelect(item)}
                >
                  {item.duration}
                </button>
              ))}
            </div>
          )}

          {/* Input Section */}
          <div className="border-top bg-white p-3">
            <Form onSubmit={sendMessage}>
              <div
                className="d-flex align-items-center bg-light rounded-pill px-2"
                style={{
                  height: "60px",
                }}
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
                  className="rounded-circle logobg_color no-hover"
                  style={{
                    width: "45px",
                    height: "45px",
                  }}
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

const styles: Record<string, React.CSSProperties> = {
  quickReplyPill: {
    background: "#e8ecff",
    color: "#3B5BDB",
    border: "1px solid #c7d2fe",
    borderRadius: 20,
    padding: "8px 18px",
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
};

export default ChatBoatUi;

