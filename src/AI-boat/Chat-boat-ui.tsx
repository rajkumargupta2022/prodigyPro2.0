
import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import logo from "/title-icon.svg";
import { ArrowClockwise, Send, X } from "react-bootstrap-icons";
import { GoogleGenAI } from "@google/genai";
import { initialPrompt, initialPrompt2 } from "./promts";
import { handleAIIntent } from "./Ai-services";
import SchemeList from "./Scheme-list";
import Portfolio from "./Portfolio";
import TopPerformers from "./Top-performers";
import NfoLive from "./Nfo-live";
import { foliosKeys, schemeDeatilDataKeys } from "../pages/data-interfaces/transact";
import { searchKeys } from "../pages/data-interfaces/explore";
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
  profileOptions?: any
  recommendedSchemes?: schemeDeatilDataKeys[]
  recommendRisk?: number
  showSupportButton?: boolean
}

const ChatBoatUi: React.FC<Props> = ({ show, setShow }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: assistant,
      text: initialPrompt,
    },
  ]);

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
    }
  }, [show])

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
                    : msg.portfolioData || msg.topPerformersData || msg.nfoLiveData ? "bg-light border-0 shadow-none" : "bg-white shadow-sm border"
                    }`}
                  style={{
                    maxWidth: msg.schemeOptions || msg.portfolioData || msg.topPerformersData || msg.nfoLiveData ? "95%" : "80%",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.4",
                    width: msg.schemeOptions || msg.portfolioData || msg.topPerformersData || msg.nfoLiveData ? "95%" : undefined,
                    padding: msg.portfolioData || msg.topPerformersData || msg.nfoLiveData ? "0" : undefined,
                    background: msg.portfolioData || msg.topPerformersData || msg.nfoLiveData ? "transparent" : undefined,
                  }}
                >
                  {!msg.portfolioData && !msg.topPerformersData && !msg.nfoLiveData && msg.text}
                  {msg.portfolioData && (
                    <Portfolio />
                  )}
                  {msg.topPerformersData && (
                    <div style={{ width: "100%", textAlign: "left" }}>
                      <p style={{ color: "#374151", margin: "0 0 12px 12px", whiteSpace: "pre-wrap" }}>{msg.text}</p>
                      <TopPerformers />
                    </div>
                  )}
                  {msg.nfoLiveData && (
                    <div style={{ width: "100%", textAlign: "left" }}>
                      <p style={{ color: "#374151", margin: "0 0 12px 12px", whiteSpace: "pre-wrap" }}>{msg.text}</p>
                      <NfoLive />
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

export default ChatBoatUi;

