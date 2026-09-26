import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Award,
  ShieldCheck,
  Heart,
  Star,
  Send,
  Sparkles,
  MessageSquare,
  ArrowRight,
  CheckCheck,
  RefreshCw,
} from "lucide-react";
import AOS from "aos";
import SEO from "../components/SEO";
import aboutUsData from "../data/aboutUsData.json";
import "./AboutUs.css";

const { teamMembers, projectPillars, initialTestimonials } = aboutUsData;

const pillarIconMap = {
  ShieldCheck,
  Award,
  Heart,
  Sparkles,
};

const AboutUs = ({ onSelectTab }) => {
  const navigate = useNavigate();
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "College Student",
    category: "Overall Experience",
    rating: 5,
    message: "",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Feedbacks loaded from localStorage + initial
  const [feedbackList, setFeedbackList] = useState(() => {
    try {
      const saved = localStorage.getItem("budgetbasics_user_feedback");
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...initialTestimonials];
      }
    } catch {
      // ignore localStorage error
    }
    return initialTestimonials;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    AOS.refresh();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
  };

  const handleRatingClick = (ratingVal) => {
    setFormData((prev) => ({ ...prev, rating: ratingVal }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      setFormError("Please write a brief feedback comment before submitting.");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      name: formData.name.trim() || "Anonymous Student",
      role: formData.role,
      rating: formData.rating,
      category: formData.category,
      comment: formData.message.trim(),
      date: "Just now",
    };

    try {
      const existingSaved = JSON.parse(
        localStorage.getItem("budgetbasics_user_feedback") || "[]",
      );
      const updatedSaved = [newFeedback, ...existingSaved];
      localStorage.setItem(
        "budgetbasics_user_feedback",
        JSON.stringify(updatedSaved),
      );
    } catch {
      // localStorage error fallback
    }

    setFeedbackList((prev) => [newFeedback, ...prev]);
    setIsSubmitted(true);
    setFormError("");
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "College Student",
      category: "Overall Experience",
      rating: 5,
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <>
      <SEO
        title="About Us & Team Decode"
        description="Learn about Team Decode, our mission to empower college students with practical financial literacy, our 4 guiding pillars, and verified student feedback."
        keywords="about budgetbasics, team decode, student financial literacy, college budgeting mission"
      />
      <div className="vstack gap-5">
      {/* Hero introduction */}
      <section className="about-hero" aria-label="About BudgetBasics Overview">
        <div className="about-hero-backdrop-glow" />

        <div className="position-relative z-2">
          <div className="mb-3" data-aos="fade-down" data-aos-duration="600">
            <span className="hero-pill-badge">
              <Users size={14} />
              Plan Today. Grow Tomorrow.
            </span>
          </div>

          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-8" data-aos="fade-right">
              <h1 className="hero-title mb-3">
                Empowering Students. <br className="d-none d-sm-inline" />
                Demystifying Money. <br className="d-none d-sm-inline" />
                <span style={{ color: "#6ee7b7" }}>
                  Built By Students, For Students.
                </span>
              </h1>
              <p
                className="text-white-50 mb-4"
                style={{
                  fontSize: "1.05rem",
                  lineHeight: "1.7",
                  maxWidth: "680px",
                }}
              >
                <strong>BudgetBasics</strong> was founded by the{" "}
                <span className="text-white fw-semibold">Decode</span>{" "}
                development team to solve a universal struggle, university
                students transitioning into adult life without ever having
                received practical, stress-free financial education. We created
                a private, interactive learning hub that equips students with
                real spending confidence.
              </p>
            </div>

            {/* Project stats snapshot */}
            <div className="col-12 col-lg-4" data-aos="fade-left">
              <div
                className="p-3 p-sm-4 rounded-4"
                style={{
                  background: "rgba(0, 0, 0, 0.22)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                <h2 className="fs-6 fw-bold text-white text-uppercase tracking-wider mb-3 d-flex align-items-center gap-2">
                  <Award size={18} className="text-warning" />
                  Project Highlights
                </h2>
                <div className="vstack gap-2 small text-white-50">
                  <div className="d-flex justify-content-between py-2 border-bottom border-white-50 border-opacity-10">
                    <span>Project Name</span>
                    <strong className="text-white">BudgetBasics</strong>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom border-white-50 border-opacity-10">
                    <span>Design</span>
                    <strong className="text-white">Responsive/SPA</strong>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom border-white-50 border-opacity-10">
                    <span>Team Name</span>
                    <strong
                      className="text-success-emphasis"
                      style={{ color: "#6ee7b7" }}
                    >
                      Decode
                    </strong>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <span>Target Audience</span>
                    <strong className="text-white">Students</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core pillars */}
      <section aria-label="Our Core Principles" className="py-2">
        <div className="text-center mb-4 mb-sm-5" data-aos="fade-up">
          <span
            className="badge px-3 py-1 rounded-pill small fw-semibold text-uppercase mb-2"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              color: "#10b981",
            }}
          >
            🛡️ What Guides Us
          </span>
          <h2 className="fs-2 fw-bold text-body mb-2">Our Guiding Pillars</h2>
          <p className="text-muted mx-auto mb-0" style={{ maxWidth: "600px" }}>
            Every feature in BudgetBasics is designed around student safety,
            transparency, and ease of use.
          </p>
        </div>

        <div className="row g-3 g-sm-4">
          {projectPillars.map((pillar, idx) => {
            const Icon = pillarIconMap[pillar.iconName] || ShieldCheck;
            return (
              <div
                key={pillar.id}
                className="col-12 col-sm-6 col-lg-3"
                data-aos="fade-up"
                data-aos-delay={idx * 60}
              >
                <div className="pillar-card d-flex flex-column justify-content-between">
                  <div>
                    <div
                      className="p-2 rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        backgroundColor: pillar.bgColor,
                        color: pillar.iconColor,
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="fs-6 fw-bold text-body mb-2">
                      {pillar.title}
                    </h3>
                    <p
                      className="small text-muted mb-0"
                      style={{ lineHeight: "1.55" }}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The development team section */}
      <section aria-label="Team Members Behind BudgetBasics" className="py-2">
        <div className="text-center mb-4 mb-sm-5" data-aos="fade-up">
          <span
            className="badge px-3 py-1 rounded-pill small fw-semibold text-uppercase mb-2"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.12)",
              color: "#3b82f6",
            }}
          >
            👥 The Creators
          </span>
          <h2 className="fs-2 fw-bold text-body mb-2">Meet - Team Decode</h2>
          <p className="text-muted mx-auto mb-0" style={{ maxWidth: "620px" }}>
            The passionate team of creators, engineers, and designers who
            envisioned, coded, and polished BudgetBasics for fellow students
            worldwide.
          </p>
        </div>

        <div className="row g-3 g-sm-4">
          {teamMembers.map((member, index) => {
            return (
              <div
                key={member.id}
                className="col-12 col-sm-6 col-lg-3"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="team-card">
                  {/* Avatar image & badge */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="team-avatar-wrapper position-relative">
                      <img
                        src={member.avatar}
                        alt={`${member.name} - ${member.role}`}
                        className="team-avatar-img shadow-sm"
                        loading="lazy"
                        decoding="async"
                        width="60"
                        height="60"
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: `3px solid ${member.avatarBg}`,
                          display: "block",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            member.name,
                          )}&background=${member.avatarBg.replace("#", "")}&color=fff&bold=true`;
                        }}
                      />
                    </div>
                    <span
                      className="badge px-2 py-1 rounded small fw-semibold"
                      style={{
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        color: "#10b981",
                        fontSize: "0.75rem",
                      }}
                    >
                      Creator
                    </span>
                  </div>

                  <h3 className="fs-5 fw-bold text-body mb-1">{member.name}</h3>
                  <div
                    className="small fw-semibold mb-3"
                    style={{ color: member.avatarBg, fontSize: "0.82rem" }}
                  >
                    {member.role}
                  </div>

                  <p
                    className="small text-muted mb-3 flex-grow-1"
                    style={{ lineHeight: "1.55" }}
                  >
                    {member.bio}
                  </p>

                  {/* Key contribution */}
                  <div className="p-2 rounded-3 bg-body-tertiary border mb-3 small">
                    <span
                      className="d-block text-muted"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Key Focus:
                    </span>
                    <span
                      className="fw-semibold text-body"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {member.contribution}
                    </span>
                  </div>

                  {/* Skills badges */}
                  <div className="d-flex flex-wrap gap-1">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="badge bg-body-secondary text-body-secondary fw-normal"
                        style={{ fontSize: "0.72rem" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feedback section */}
      <section aria-label="Student Feedback & Reviews" className="py-2">
        <div className="text-center mb-4 mb-sm-5" data-aos="fade-up">
          <span
            className="badge px-3 py-1 rounded-pill small fw-semibold text-uppercase mb-2"
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.12)",
              color: "#d97706",
            }}
          >
            <MessageSquare size={13} className="me-1 d-inline" />
            We Value Your Voice
          </span>
          <h2 className="fs-2 fw-bold text-body mb-2">
            Student Feedback & Reviews
          </h2>
          <p className="text-muted mx-auto mb-0" style={{ maxWidth: "620px" }}>
            Have ideas for new calculator formulas, discovered a bug, or want to
            share how BudgetBasics helped your monthly savings? Let us know
            below!
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Feedback form */}
          <div className="col-12 col-lg-7" data-aos="fade-right">
            <div className="feedback-card">
              {isSubmitted ? (
                <div className="text-center py-4 animate__animated animate__fadeIn">
                  <div
                    className="mx-auto mb-3 p-3 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "rgba(16, 185, 129, 0.15)",
                      color: "#10b981",
                    }}
                  >
                    <CheckCheck size={32} />
                  </div>
                  <h3 className="fs-4 fw-bold text-body mb-2">
                    Thank You For Your Feedback!
                  </h3>
                  <p
                    className="text-muted small mx-auto mb-4"
                    style={{ maxWidth: "480px" }}
                  >
                    Your response has been saved locally and added to our
                    feedback board. Team NextGen BudgetBee reviews student
                    feedback continuously to make budgeting even easier!
                  </p>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="btn btn-outline-secondary btn-sm px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1"
                  >
                    <RefreshCw size={14} />
                    <span>Submit Another Response</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h3 className="fs-5 fw-bold text-body mb-0">
                      Share Your Experience
                    </h3>
                    <span className="badge bg-body-tertiary text-muted border small">
                      Client-Side Secure
                    </span>
                  </div>

                  {formError && (
                    <div className="alert alert-warning py-2 px-3 small rounded-3 mb-3">
                      ⚠️ {formError}
                    </div>
                  )}

                  {/* Star rating */}
                  <div className="mb-3 p-3 rounded-3 bg-body-tertiary border">
                    <label className="form-label small fw-semibold text-body d-block mb-1">
                      How would you rate BudgetBasics?
                    </label>
                    <div className="d-flex align-items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const activeVal = hoverRating || formData.rating;
                        const isFilled = star <= activeVal;
                        return (
                          <button
                            key={star}
                            type="button"
                            className="star-btn"
                            onClick={() => handleRatingClick(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                          >
                            <Star
                              size={24}
                              className={
                                isFilled ? "text-warning" : "text-muted"
                              }
                              fill={isFilled ? "#f59e0b" : "transparent"}
                            />
                          </button>
                        );
                      })}
                      <span className="small text-muted ms-2">
                        {formData.rating === 5 && "⭐ Excellent"}
                        {formData.rating === 4 && "👍 Very Good"}
                        {formData.rating === 3 && "👌 Good"}
                        {formData.rating === 2 && "🤔 Needs Improvement"}
                        {formData.rating === 1 && "⚠️ Needs Serious Work"}
                      </span>
                    </div>
                  </div>

                  {/* Name and role inputs */}
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label
                        htmlFor="fb-name"
                        className="form-label small fw-semibold text-body"
                      >
                        Your Name / Nickname (Optional)
                      </label>
                      <input
                        type="text"
                        id="fb-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Maya P. or Leave blank for Anon"
                        className="form-control form-control-sm"
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label
                        htmlFor="fb-role"
                        className="form-label small fw-semibold text-body"
                      >
                        Your Role / Background
                      </label>
                      <select
                        id="fb-role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="form-select form-select-sm"
                      >
                        <option value="College Student">College Student</option>
                        <option value="High Schooler">
                          High School Student
                        </option>
                        <option value="University Faculty">
                          Educator / Teacher
                        </option>
                        <option value="Recent Graduate">Recent Graduate</option>
                        <option value="Working Professional">
                          Working Professional
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Feedback category & optional email */}
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label
                        htmlFor="fb-category"
                        className="form-label small fw-semibold text-body"
                      >
                        Feedback Topic
                      </label>
                      <select
                        id="fb-category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="form-select form-select-sm"
                      >
                        <option value="Overall Experience">
                          Overall Platform Experience
                        </option>
                        <option value="50/30/20 Calculator">
                          50/30/20 Calculator Formula
                        </option>
                        <option value="Expense Tracker">
                          Session Expense Tracker
                        </option>
                        <option value="Needs vs Wants Game">
                          Needs vs Wants Simulator
                        </option>
                        <option value="Feature Suggestion">
                          Feature Suggestion
                        </option>
                        <option value="Bug Report">Bug / Issue Report</option>
                      </select>
                    </div>

                    <div className="col-12 col-sm-6">
                      <label
                        htmlFor="fb-email"
                        className="form-label small fw-semibold text-body"
                      >
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        id="fb-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. student@university.edu"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>

                  {/* Message textarea */}
                  <div className="mb-4">
                    <label
                      htmlFor="fb-message"
                      className="form-label small fw-semibold text-body"
                    >
                      Your Comments & Suggestions{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="fb-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="What did you like most? What features would you love to see added in future updates?"
                      className="form-control form-control-sm"
                      required
                    />
                    <div
                      className="d-flex justify-content-between mt-1 text-muted"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <span>
                        Helpful feedback helps us build better tools for
                        everyone.
                      </span>
                      <span>{formData.message.length} characters</span>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-emerald w-100 py-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 fw-semibold"
                  >
                    <Send size={16} />
                    <span>Submit Feedback</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Student reviews & testimonials section */}
          <div className="col-12 col-lg-5" data-aos="fade-left">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h3 className="fs-5 fw-bold text-body mb-0">
                Community Highlights
              </h3>
              <span className="small text-muted">
                {feedbackList.length} response
                {feedbackList.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div
              className="vstack gap-3"
              style={{
                maxHeight: "580px",
                overflowY: "auto",
                paddingRight: "4px",
              }}
            >
              {feedbackList.map((item) => (
                <div key={item.id} className="testimonial-card">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < item.rating ? "text-warning" : "text-muted"
                          }
                          fill={i < item.rating ? "#f59e0b" : "transparent"}
                        />
                      ))}
                    </div>
                    <span
                      className="badge px-2 py-1 rounded small"
                      style={{
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        color: "#10b981",
                        fontSize: "0.72rem",
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <p
                    className="small text-body mb-2 fst-italic"
                    style={{ lineHeight: "1.5" }}
                  >
                    "{item.comment}"
                  </p>

                  <div className="d-flex align-items-center justify-content-between small text-muted pt-2 border-top">
                    <div
                      className="fw-semibold text-body"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {item.name}
                      <span
                        className="text-muted fw-normal d-block"
                        style={{ fontSize: "0.74rem" }}
                      >
                        {item.role}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.72rem" }}>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Direct contact banner */}
      <section aria-label="Contact Information" data-aos="fade-up">
        <div className="landing-cta-banner">
          <div className="mx-auto" style={{ maxWidth: "680px" }}>
            <span
              className="badge px-3 py-1 rounded-pill small fw-semibold text-uppercase mb-3"
              style={{ backgroundColor: "#10b981", color: "#ffffff" }}
            >
              Direct Academic Inquiries
            </span>
            <h2 className="fs-2 fw-bold text-body mb-3">
              Questions For The Team?
            </h2>
            <p
              className="text-muted mb-4"
              style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
            >
              Have academic inquiries, workshop collaboration suggestions, or
              institutional feedback? Reach out directly to our project mailbox
              at{" "}
              <a
                href="mailto:decode@aptechgdn.net"
                className="fw-bold text-decoration-none"
                style={{ color: "#10b981" }}
              >
                decode@aptechgdn.net
              </a>
              .
            </p>

            <div className="d-flex flex-column flex-sm-row flex-wrap justify-content-center gap-2 gap-sm-3">
              <button
                type="button"
                onClick={() => {
                  if (onSelectTab) onSelectTab("landing");
                  navigate("/");
                }}
                className="btn btn-emerald px-4 py-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
              >
                <span>Back to Home</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default AboutUs;
