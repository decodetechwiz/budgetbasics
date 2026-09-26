import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, MessageSquare, Sparkles, Check, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import chatbotData from "../data/chatbotData.json";

const { sugPrompts, knowledgeBase, defaultResponse } = chatbotData;

const createMessageId = (sender) =>
  `${sender}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome-msg",
      sender: "bot",
      text: "👋 Hey there! I'm BudgetBee, your student budgeting sidekick. Ask me anything about allowances, the 50/30/20 rule, or distinguishing needs from wants!",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [usedPrompts, setUsedPrompts] = useState([]);

  const chatWindowRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const presetsScrollRef = useRef(null);

  const scrollPresets = (direction) => {
    if (presetsScrollRef.current) {
      const scrollAmount = direction === "left" ? -150 : 150;
      presetsScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Window opening animation
  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      gsap.fromTo(
        chatWindowRef.current,
        { opacity: 0, scale: 0.9, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.28, ease: "power2.out" },
      );
    }
  }, [isOpen]);

  // Contained smooth scroll to latest message inside chat container only
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome-msg",
        sender: "bot",
        text: "👋 Hey there! I'm BudgetBee, your student budgeting sidekick. Ask me anything about allowances, the 50/30/20 rule, or distinguishing needs from wants!",
      },
    ]);
    setUsedPrompts([]);
    setInputText("");
  };

  const getKnowledgeResponse = (rawQuery) => {
    const q = rawQuery.toLowerCase();

    for (const item of knowledgeBase) {
      if (item.matchAll) {
        if (item.keywords.every((kw) => q.includes(kw))) {
          return item.response;
        }
      } else {
        if (item.keywords.some((kw) => q.includes(kw))) {
          return item.response;
        }
      }
    }

    return defaultResponse;
  };

  const handleSend = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    // Track used preset prompts
    if (textToSend && !usedPrompts.includes(textToSend)) {
      setUsedPrompts((prev) => [...prev, textToSend]);
    }

    const userMessage = {
      id: createMessageId("user"),
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    // Response delay
    setTimeout(() => {
      const responseText = getKnowledgeResponse(query);
      const botMessage = {
        id: createMessageId("bot"),
        sender: "bot",
        text: responseText,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Reorder prompts so unused ones appear first, followed by used ones
  const orderedPrompts = [
    ...sugPrompts.filter((p) => !usedPrompts.includes(p)),
    ...sugPrompts.filter((p) => usedPrompts.includes(p)),
  ];

  return (
    <>
      {/* Floating chat window */}
      {isOpen && (
        <div ref={chatWindowRef} className="chat-window-panel shadow-lg">
          {/* Header */}
          <div
            className="p-3 text-white d-flex align-items-center justify-content-between flex-shrink-0"
            style={{ backgroundColor: "#10b981" }}
          >
            <div className="d-flex align-items-center gap-2">
              <Bot size={20} />
              <div>
                <span className="fw-bold small d-block lh-1">
                  BudgetBee Assistant
                </span>
                <span style={{ fontSize: "0.7rem", opacity: 0.85 }}>
                  Online • Student Guidance
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-sm btn-link text-white p-0 opacity-75 hover-opacity-100"
                aria-label="Restart conversation"
                title="Restart conversation"
              >
                <RotateCcw size={16} />
              </button>
              <button
                type="button"
                onClick={toggleChat}
                className="btn btn-sm btn-link text-white p-0 opacity-75 hover-opacity-100"
                aria-label="Close chat"
                title="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages scroll area */}
          <div
            ref={messagesContainerRef}
            className="p-3 overflow-y-auto flex-grow-1 vstack gap-2 small bg-body chat-messages-container"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.sender === "user" ? "chat-bubble-user" : "chat-bubble-bot"
                }
                style={{ whiteSpace: "pre-line" }}
              >
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-bot text-muted fst-italic">
                BudgetBee is typing...
              </div>
            )}
          </div>

          {/* Dedicated suggestion presets tray */}
          <div className="chat-presets-tray">
            <div className="d-flex align-items-center justify-content-between mb-1 px-1">
              <span className="chat-presets-title d-flex align-items-center gap-1">
                <Sparkles size={12} className="text-warning" />
                <span>Suggested Questions</span>
              </span>
              <div className="d-flex align-items-center gap-2">
                <span className="chat-presets-count">
                  {sugPrompts.length - usedPrompts.length > 0
                    ? `${sugPrompts.length - usedPrompts.length} remaining`
                    : "All explored"}
                </span>
                {/* Arrow navigation buttons for bigger screens */}
                <div className="d-none d-md-flex align-items-center gap-1 chat-presets-nav">
                  <button
                    type="button"
                    onClick={() => scrollPresets("left")}
                    className="chat-presets-arrow-btn"
                    aria-label="Scroll presets left"
                    title="Scroll left"
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollPresets("right")}
                    className="chat-presets-arrow-btn"
                    aria-label="Scroll presets right"
                    title="Scroll right"
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>

            <div ref={presetsScrollRef} className="chat-presets-scroll">
              {orderedPrompts.map((prompt, idx) => {
                const isUsed = usedPrompts.includes(prompt);
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`chat-preset-chip ${isUsed ? "is-used" : ""}`}
                    onClick={() => handleSend(prompt)}
                    title={isUsed ? "Already asked - tap to ask again" : prompt}
                  >
                    {isUsed ? (
                      <Check size={12} className="text-muted flex-shrink-0" />
                    ) : (
                      <span className="chat-preset-dot" />
                    )}
                    <span className="text-truncate">{prompt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input form */}
          <div className="p-2 border-top bg-body-tertiary flex-shrink-0">
            <div className="d-flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about budgeting, 50/30/20..."
                className="form-control form-control-sm"
                aria-label="Ask chatbot"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                className="btn btn-emerald btn-sm px-3 d-flex align-items-center justify-content-center"
                aria-label="Send message"
                disabled={!inputText.trim()}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating chat button */}
      <button
        type="button"
        onClick={toggleChat}
        className="chat-float-btn"
        aria-label="Open BudgetBee Assistant"
        title="Open BudgetBee Assistant"
      >
        <MessageSquare size={24} />
      </button>
    </>
  );
};

export default ChatbotWidget;
