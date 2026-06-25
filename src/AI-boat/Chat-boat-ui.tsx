
import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import logo from "../assets/img/logo/logo.png";
import { Send } from "react-bootstrap-icons";
import { GoogleGenAI } from "@google/genai";
import { initialPrompt, initialPrompt2 } from "./propts";
import { fetchSchemeList } from "./Ai-services";
import SchemeList from "./Scheme-list";

const GEMINI_API_KEY = "AIzaSyATElLwb63BcJBuu5hBHkVUUBdx4lU923c";

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});
const assistant = "assistant"
const user = "user";
interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

interface Message {
  role: typeof user | typeof assistant;
  text: string;
  
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
      const prompt = `${initialPrompt2}  ${userText} `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const aiText = response?.candidates?.[0]?.content?.parts?.[0]?.text ||"Sorry, I could not generate a response.";

      let aiResponseText = aiText;
      let isSchemeSearch = false;
      let schemeName = "";

      try {
        const jsonStr = aiText.replace(/```json\n?|```/g, "").trim();
        const parsedData = JSON.parse(jsonStr);

        aiResponseText = parsedData.message || "Processed your request.";

        if (parsedData.intent === "search_scheme" && parsedData.params?.scheme_name) {
          isSchemeSearch = true;
          schemeName = parsedData.params.scheme_name;
        }
      } catch (err) {
        console.log("Response is not JSON format", err);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: assistant,
          text: aiResponseText,
        },
      ]);

      if (isSchemeSearch) {
        try {
          const schemeList = await fetchSchemeList(schemeName);
          if (schemeList && schemeList.length > 0) {
            const schemesText = schemeList.map((s: any) => `• ${s.scheme_name}`).join('\n');
            setMessages((prev) => [
              ...prev,
              {
                role: assistant,
                text: `Here are the top results for "${schemeName}":\n${schemesText}`,
              },
            ]);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                role: assistant,
                text: `I couldn't find any schemes matching "${schemeName}".`,
              },
            ]);
          }
        } catch (err) {
          console.error(err);
          setMessages((prev) => [
            ...prev,
            {
              role: assistant,
              text: `An error occurred while fetching the scheme list.`,
            },
          ]);
        }
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

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
      contentClassName="border-0 rounded-4 overflow-hidden shadow-lg"
    >
      <Modal.Header closeButton>
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="logo"
            width={100}
            className="me-2"
          />

          <div>
            {/* <small className="text-success fs12px">Online</small> */}
            {/* <h5 className="">AI</h5> */}
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
          <SchemeList/>
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
                    : "bg-white shadow-sm border"
                    }`}
                  style={{
                    maxWidth: "80%",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.4",
                  }}
                >
                  {msg.text}
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

