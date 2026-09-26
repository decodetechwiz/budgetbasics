import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import gameData from "../data/needsWantsGameData.json";

const { studentItems } = gameData;

const NeedsWantsGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState({
    text: "",
    isCorrect: null,
    tip: "",
  });
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const cardRef = useRef(null);
  const timerRef = useRef(null);

  // Clean up any pending advance timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const currentItem = studentItems[currentIndex];

  const handleClassify = (chosenCategory) => {
    if (hasAnswered) return;
    setHasAnswered(true);

    const isCorrect = chosenCategory === currentItem.category;
    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback({
        text: `Spot on! "${currentItem.name}" is indeed a ${currentItem.category}.`,
        isCorrect: true,
        tip: currentItem.tip,
      });
    } else {
      setFeedback({
        text: `Not quite! "${currentItem.name}" is classified as a ${currentItem.category}.`,
        isCorrect: false,
        tip: currentItem.tip,
      });
    }

    // Auto-advance to next item with GSAP transition
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0.4, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
        );
      }
      setCurrentIndex((prev) => (prev + 1) % studentItems.length);
      setFeedback({ text: "", isCorrect: null, tip: "" });
      setHasAnswered(false);
    }, 1800);
  };

  return (
    <div className="custom-card p-4 p-sm-5" data-aos="fade-up">
      {/* Title & score */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">
        <div>
          <h2 className="fs-4 fw-bold mb-1 text-body">Needs vs Wants</h2>
          <p className="small text-muted mb-0">
            Train your decision-making instincts before tapping your card at
            checkout.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span
            className="badge px-3 py-1 rounded-pill small fw-semibold"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              color: "#10b981",
            }}
          >
            Score: {score} / {studentItems.length}
          </span>
        </div>
      </div>

      {/* Interactive item card */}
      <div
        ref={cardRef}
        className="p-4 rounded-4 text-center mx-auto bg-body-tertiary border shadow-xs"
        style={{ maxWidth: "560px" }}
      >
        <span
          className="badge px-3 py-1 rounded-pill text-uppercase fw-semibold mb-3"
          style={{
            backgroundColor: "rgba(107, 114, 128, 0.15)",
            color: "var(--text-muted)",
            letterSpacing: "0.05em",
            fontSize: "0.75rem",
          }}
        >
          Question {currentIndex + 1} of {studentItems.length}
        </span>

        <h3 className="fs-3 fw-bolder mb-4 text-body px-2">
          {currentItem.name}
        </h3>

        <div className="d-flex justify-content-center gap-3 mb-3">
          <button
            type="button"
            className="btn btn-emerald px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-1"
            onClick={() => handleClassify("Need")}
            disabled={hasAnswered}
          >
            <span>It's a Need</span>
          </button>
          <button
            type="button"
            className="btn btn-amber px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-1"
            onClick={() => handleClassify("Want")}
            disabled={hasAnswered}
          >
            <span>It's a Want</span>
          </button>
        </div>

        {/* Feedback message area */}
        <div style={{ minHeight: "44px" }}>
          {feedback.text && (
            <div className="animate__animated animate__fadeIn">
              <p
                className={`small fw-bold mb-1 ${
                  feedback.isCorrect ? "text-success" : "text-warning"
                }`}
              >
                {feedback.text}
              </p>
              {feedback.tip && (
                <p className="small text-muted mb-0 fst-italic">
                  💡 {feedback.tip}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NeedsWantsGame;
