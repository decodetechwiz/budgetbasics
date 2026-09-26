import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  PiggyBank,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  DollarSign,
  Compass,
  BookOpen,
  MoveRight,
} from "lucide-react";
import landingData from "../data/landingPageData.json";
import SEO from "../components/SEO";
import "./LandingPage.css";

const { treeBranches, faqItems } = landingData;

const LandingPage = ({ onSelectTab }) => {
  const navigate = useNavigate();
  // Track open FAQ accordion items
  const [openFaqId, setOpenFaqId] = useState("faq-1");

  const handleTabRoute = (target) => {
    const routeMap = {
      landing: "/",
      calculator: "/calculator",
      learn: "/basics",
      basics: "/basics",
      tracker: "/exptracker",
      gallery: "/infographics",
      infographics: "/infographics",
      about: "/about",
    };
    const dest = routeMap[target] || target;
    if (onSelectTab) onSelectTab(target);
    navigate(dest);
  };

  // Re-trigger AOS on mount to ensure smooth on-scroll animations
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, []);

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <SEO
        title="BudgetBasics | Student Financial Literacy"
        description="Master student budgeting with BudgetBasics. Free 50/30/20 budget calculator, interactive Needs vs Wants game, student expense tracker, and visual money management guides with zero bank linking."
        keywords="budget basics, student budgeting, 50 30 20 rule calculator, college expense tracker, needs vs wants game, financial literacy for students, student money guide"
      />
      <div className="vstack gap-5">
      {/* What is BudgetBasics & How it benefits students */}
      <section className="landing-hero" aria-label="BudgetBasics Overview">
        <div className="landing-hero-backdrop-glow" />

        <div className="position-relative z-2">
          <div className="mb-3" data-aos="fade-down" data-aos-duration="600">
            <span className="hero-pill-badge">
              <Sparkles size={14} />
              Manage money | Build freedom.
            </span>
          </div>

          <div className="row g-4 align-items-center">
            <div
              className="col-12 col-lg-7"
              data-aos="fade-right"
              data-aos-duration="700"
            >
              <h1 className="hero-title mb-3">
                Master Your Money. <br className="d-none d-sm-inline" />
                Eliminate Debt Fear. <br className="d-none d-sm-inline" />
                <span style={{ color: "#6ee7b7" }}>Own Your Future.</span>
              </h1>

              {/* What Is BudgetBasics */}
              <div className="hero-definition-box mb-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <GraduationCap size={20} className="text-warning" />
                  <span className="fw-bold text-white fs-6">
                    What Is BudgetBasics?
                  </span>
                </div>
                <p
                  className="mb-0 text-white-50"
                  style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
                >
                  <strong>BudgetBasics</strong> is an interactive, zero-jargon
                  financial literacy platform engineered specifically for
                  college students and young adults. Instead of intimidating
                  corporate spreadsheets, confusing financial formulas, or
                  expensive banking apps, BudgetBasics transforms personal
                  finance into hands-on simulations, practical 50/30/20
                  calculators, and bite-sized habits you can master in minutes.
                </p>
              </div>

              {/* Action buttons */}
              <div className="d-flex flex-column flex-sm-row flex-wrap gap-2 gap-sm-3 align-items-stretch align-items-sm-center">
                <button
                  type="button"
                  onClick={() => handleTabRoute("calculator")}
                  className="btn btn-light px-4 py-3 rounded-4 fw-bold shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
                  style={{ color: "#047857" }}
                >
                  <span>Try 50/30/20 Calculator</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => handleTabRoute("learn")}
                  className="btn btn-outline-light px-4 py-3 rounded-4 fw-semibold d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <span>Explore Basics & Games</span>
                </button>
              </div>
            </div>

            {/* How it helps & benefits students */}
            <div
              className="col-12 col-lg-5"
              data-aos="fade-left"
              data-aos-duration="750"
            >
              <div
                className="p-3 p-sm-4 rounded-4"
                style={{
                  background: "rgba(0, 0, 0, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <h2 className="fs-5 fw-bold text-white mb-3 d-flex align-items-center gap-2">
                  <HeartHandshake size={20} className="text-warning" />
                  How It Helps & Benefits Students
                </h2>

                <div className="vstack gap-2">
                  {/* Benefit 1 */}
                  <div className="benefit-card-hero d-flex align-items-start gap-3">
                    <div
                      className="p-2 rounded-3 flex-shrink-0"
                      style={{
                        backgroundColor: "rgba(16, 185, 129, 0.25)",
                        color: "#6ee7b7",
                      }}
                    >
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <h3
                        className="fw-semibold text-white mb-1"
                        style={{ fontSize: "0.95rem" }}
                      >
                        Halt Sneaky Micro-Leaks
                      </h3>
                      <p className="text-white-50 small mb-0">
                        Identify forgotten streaming subscriptions and impulse
                        delivery fees before they drain your semester allowance.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 2 */}
                  <div className="benefit-card-hero d-flex align-items-start gap-3">
                    <div
                      className="p-2 rounded-3 flex-shrink-0"
                      style={{
                        backgroundColor: "rgba(59, 130, 246, 0.25)",
                        color: "#93c5fd",
                      }}
                    >
                      <PiggyBank size={18} />
                    </div>
                    <div>
                      <h3
                        className="fw-semibold text-white mb-1"
                        style={{ fontSize: "0.95rem" }}
                      >
                        Guilt-Free Spending Balance
                      </h3>
                      <p className="text-white-50 small mb-0">
                        Safeguard 50% for core bills and 20% for savings while
                        enjoying a designated 30% for social fun without
                        anxiety.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 3 */}
                  <div className="benefit-card-hero d-flex align-items-start gap-3">
                    <div
                      className="p-2 rounded-3 flex-shrink-0"
                      style={{
                        backgroundColor: "rgba(245, 158, 11, 0.25)",
                        color: "#fcd34d",
                      }}
                    >
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h3
                        className="fw-semibold text-white mb-1"
                        style={{ fontSize: "0.95rem" }}
                      >
                        Graduate Confident & Debt-Free
                      </h3>
                      <p className="text-white-50 small mb-0">
                        Build emergency cushions and budgeting discipline that
                        carry you into graduation ahead of your peers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust stat */}
                <div className="mt-3 pt-3 border-top border-white-50 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 text-white-50 small">
                  <span>🔒 100% Free & Private</span>
                  <span>⚡ Instant Calculations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & solution tree structure */}
      <section
        aria-label="Problem and Solution Tree Structure"
        className="py-2"
      >
        {/* Section heading */}
        <div className="text-center mb-4 mb-sm-5" data-aos="fade-up">
          <span
            className="badge px-3 py-1 rounded-pill small fw-semibold text-uppercase mb-2"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              color: "#10b981",
            }}
          >
            🌿 The Financial Reality Tree
          </span>
          <h2 className="fs-2 fw-bold text-body mb-2">
            Bridging The Student Financial Gap
          </h2>
          <p
            className="text-muted mx-auto mb-0"
            style={{ maxWidth: "680px", fontSize: "0.95rem" }}
          >
            College students face unique financial hurdles every semester. Here
            is how BudgetBasics systematically branches each real-world struggle
            into a practical, lifelong solution.
          </p>
        </div>

        {/* Tree structure layout */}
        <div className="tree-container">
          {/* Central line for Desktop & Tablets */}
          <div
            className="tree-trunk-line t-line d-none d-md-block"
            aria-hidden="true"
          />

          <div
            className="tree-root-card p-3 p-sm-4 text-center mb-4 mb-sm-5"
            data-aos="fade-up"
            data-aos-duration="650"
          >
            <div
              className="mx-auto mb-2 p-2 rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "46px",
                height: "46px",
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
              }}
            >
              <Compass size={24} />
            </div>
            <h3 className="fs-5 fw-bold text-body mb-1">
              The Student Financial Reality
            </h3>
            <p
              className="text-muted small mb-0 mx-auto"
              style={{ maxWidth: "560px" }}
            >
              Most students transition to university living on tight allowances
              or work-study wages with zero prior financial education. Without
              clear guidance, everyday expenses quickly become stressful.
            </p>
          </div>

          {/* Problem vs solution cards */}
          <div className="vstack gap-4">
            {treeBranches.map((branch) => (
              <div key={branch.id} className="tree-branch-row">
                {/* The problem */}
                <div
                  className="tree-col-side"
                  data-aos="fade-right"
                  data-aos-delay={branch.delay}
                  data-aos-duration="600"
                >
                  <div className="tree-node-problem h-100">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span
                        className="badge bg-danger-subtle text-danger fw-semibold px-2 py-1"
                        style={{ fontSize: "0.75rem" }}
                      >
                        Challenge #{branch.branchNumber}
                      </span>
                      <AlertTriangle
                        size={18}
                        className="text-danger flex-shrink-0"
                      />
                    </div>
                    <h4 className="fs-6 fw-bold text-body mb-2">
                      {branch.problem.title}
                    </h4>
                    <p
                      className="text-muted small mb-3 flex-grow-1"
                      style={{ lineHeight: "1.6" }}
                    >
                      {branch.problem.desc}
                    </p>
                    <div className="small text-danger-emphasis fst-italic p-2 rounded-2 bg-danger-subtle bg-opacity-50">
                      ⚠️ {branch.problem.impact}
                    </div>
                  </div>
                </div>

                {/* Tree center junction with lines & arrow */}
                <div
                  className="tree-center-junction"
                  data-aos="zoom-in"
                  data-aos-delay={branch.delay + 30}
                >
                  <div
                    className="tree-junction-pill d-none d-md-flex"
                    title={`Branch ${branch.branchNumber}`}
                  >
                    <span className="tree-junction-num">
                      {branch.branchNumber}
                    </span>
                    <MoveRight size={14} />
                  </div>
                  {/* Mobile connector */}
                  <div className="tree-mobile-connector d-md-none py-1">
                    <span>🌱 Solution #{branch.branchNumber} ↓</span>
                  </div>
                </div>

                {/* The solution */}
                <div
                  className="tree-col-side"
                  data-aos="fade-left"
                  data-aos-delay={branch.delay}
                  data-aos-duration="600"
                >
                  <div className="tree-node-solution h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span
                          className="badge fw-semibold px-2 py-1"
                          style={{
                            backgroundColor: "rgba(16, 185, 129, 0.15)",
                            color: "#10b981",
                            fontSize: "0.75rem",
                          }}
                        >
                          BudgetBasics Solution
                        </span>
                        <CheckCircle2
                          size={18}
                          className="text-success flex-shrink-0"
                        />
                      </div>
                      <h4 className="fs-6 fw-bold text-body mb-2">
                        {branch.solution.title}
                      </h4>
                      <p
                        className="text-muted small mb-3"
                        style={{ lineHeight: "1.6" }}
                      >
                        {branch.solution.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTabRoute(branch.solution.routeTarget || branch.solution.tabTarget)}
                      className="btn btn-sm btn-outline-success rounded-pill fw-semibold d-inline-flex align-items-center gap-1 align-self-start"
                    >
                      <span>{branch.solution.actionLabel}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* The long-term outcome */}
          <div
            className="tree-crown-card p-3 p-sm-4 text-center mt-4 mt-sm-5"
            data-aos="fade-up"
            data-aos-duration="650"
          >
            <div
              className="mx-auto mb-2 p-2 rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "46px",
                height: "46px",
                backgroundColor: "#10b981",
                color: "#ffffff",
              }}
            >
              <Lightbulb size={24} />
            </div>
            <h3 className="fs-5 fw-bold text-body mb-1">
              Financial Independence & Peace of Mind
            </h3>
            <p
              className="text-muted small mb-0 mx-auto"
              style={{ maxWidth: "560px" }}
            >
              By connecting everyday challenges with structured habits, you
              graduate university free of panic, with an established emergency
              cushion and healthy wealth-building reflexes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ's section */}
      <section aria-label="Frequently Asked Questions Section" className="py-2">
        <div className="text-center mb-4" data-aos="fade-up">
          <span
            className="badge px-3 py-1 rounded-pill small fw-semibold text-uppercase mb-2"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.12)",
              color: "#3b82f6",
            }}
          >
            <HelpCircle size={13} className="me-1 d-inline" />
            Got Questions?
          </span>
          <h2 className="fs-2 fw-bold text-body mb-2">
            Frequently Asked Questions
          </h2>
          <p
            className="text-muted mx-auto mb-0"
            style={{ maxWidth: "600px", fontSize: "0.95rem" }}
          >
            Got questions about student budgeting, data privacy, or how our
            calculations work? We've got clear, direct answers for you.
          </p>
        </div>

        {/* Accordion list */}
        <div className="mx-auto" style={{ maxWidth: "800px" }}>
          <div className="vstack gap-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className={`faq-item-card ${isOpen ? "is-open" : ""}`}
                  data-aos-delay={index * 60}
                >
                  <button
                    type="button"
                    className="faq-trigger-btn"
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <span>{item.question}</span>
                    <ChevronDown size={18} className="faq-icon-arrow" />
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      className="faq-content-body animate__animated animate__fadeIn"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Assistance card */}
          <div
            className="mt-4 p-3 rounded-4 bg-body-tertiary border text-center small text-muted"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <span>Have a specific student question not listed here? </span>
            <span className="fw-semibold text-body">
              Click the AI Peer Assistant on the bottom right or write to us
              at{" "}
            </span>
            <a
              href="mailto:decode@aptechgdn.net"
              className="fw-bold text-decoration-none"
              style={{ color: "#10b981" }}
            >
              decode@aptechgdn.net
            </a>
          </div>
        </div>
      </section>

      {/* Interactive - Call To Action */}
      <section aria-label="Get Started Call To Action" data-aos="fade-up">
        <div className="landing-cta-banner">
          <div className="mx-auto" style={{ maxWidth: "680px" }}>
            <span
              className="badge px-3 py-1 rounded-pill small fw-semibold text-uppercase mb-3"
              style={{ backgroundColor: "#10b981", color: "#ffffff" }}
            >
              Ready To Take Control?
            </span>
            <h2 className="fs-2 fw-bold text-body mb-3">
              Start Your Financial Journey Today
            </h2>
            <p
              className="text-muted mb-4"
              style={{ fontSize: "1rem", lineHeight: "1.6" }}
            >
              Explore our interactive modules to calculate your semester budget,
              practice Needs vs Wants, or track daily spending with zero stress.
            </p>

            <div className="d-flex flex-column flex-sm-row flex-wrap justify-content-center gap-2 gap-sm-3">
              <button
                type="button"
                onClick={() => handleTabRoute("calculator")}
                className="btn btn-emerald px-4 py-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
              >
                <span>50/30/20 Calculator</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => handleTabRoute("learn")}
                className="btn btn-outline-secondary px-4 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2"
              >
                <BookOpen size={16} />
                <span>Financial Basics</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabRoute("tracker")}
                className="btn btn-outline-secondary px-4 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2"
              >
                <DollarSign size={16} />
                <span>Expense Tracker</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default LandingPage;
