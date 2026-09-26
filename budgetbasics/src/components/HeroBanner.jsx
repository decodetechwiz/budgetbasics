import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const HeroBanner = ({ onGoToCalculator }) => {
  const bannerRef = useRef(null);

  // Smooth entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bannerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.75,
        ease: "power3.out",
      });
    }, bannerRef);

    return () => ctx.revert(); // Clean up GSAP memory
  }, []);

  return (
    <div
      ref={bannerRef}
      className="hero-gradient p-4 p-md-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4 mb-4"
    >
      <div style={{ maxWidth: "640px" }}>
        <span
          className="badge px-3 py-1 rounded-pill text-uppercase mb-2 fw-semibold"
          style={{
            backgroundColor: "rgba(6, 78, 59, 0.65)",
            color: "#a7f3d0",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
          }}
        >
          Give every dollar a destination.
        </span>
        <h1 className="fw-bolder display-6 mb-2 text-white tracking-tight">
          Build a Budget That Works
        </h1>
        <p
          className="mb-0 text-white-50"
          style={{ fontSize: "1rem", lineHeight: "1.6" }}
        >
          Create realistic budgets around your income, expenses, and goals so
          you can enjoy today while preparing for tomorrow.
        </p>
      </div>

      <button
        type="button"
        onClick={onGoToCalculator}
        className="btn btn-light px-4 py-3 rounded-4 fw-bold shadow-sm d-inline-flex align-items-center justify-content-center gap-2 text-nowrap flex-shrink-0"
        style={{ color: "#047857" }}
      >
        <span>Try 50/30/20 Rule</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default HeroBanner;
