import { Link } from "react-router-dom";
import { Wallet, ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-body border-top mt-auto pt-5 pb-4">
      <div className="container-xl">
        <div className="row g-4 mb-4">
          {/* Brandname and logo */}
          <div className="col-12 col-md-4">
            <Link to="/" className="d-flex align-items-center gap-2 mb-2 text-decoration-none">
              <div
                className="p-2 rounded-3 text-white d-flex align-items-center justify-content-center shadow-xs"
                style={{
                  backgroundColor: "#10b981",
                  width: "36px",
                  height: "36px",
                }}
              >
                <Wallet size={18} />
              </div>
              <span className="fs-5 fw-bold text-body">
                Budget<span style={{ color: "#10b981" }}>Basics</span>
              </span>
            </Link>
            <p
              className="small text-muted mb-3"
              style={{ maxWidth: "340px", lineHeight: "1.6" }}
            >
              Empowering students and young learners with foundational financial
              literacy, 50/30/20 budgeting habits, and practical spending
              discipline.
            </p>
          </div>

          {/* Quick links */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold small text-uppercase text-body mb-3">
              Quick Links
            </h6>
            <ul className="list-unstyled small vstack gap-2 mb-0">
              <li>
                <Link
                  to="/"
                  className="text-decoration-none text-muted"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-decoration-none text-muted"
                >
                  About Us & Feedback
                </Link>
              </li>
              <li>
                <Link
                  to="/basics"
                  className="text-decoration-none text-muted"
                >
                  Basics
                </Link>
              </li>
              <li>
                <Link
                  to="/calculator"
                  className="text-decoration-none text-muted"
                >
                  50/30/20 Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/exptracker"
                  className="text-decoration-none text-muted"
                >
                  Expense Tracker
                </Link>
              </li>
              <li>
                <Link
                  to="/infographics"
                  className="text-decoration-none text-muted"
                >
                  Infographics
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational description */}
          <div className="col-12 col-md-3">
            <h6 className="fw-bold small text-uppercase text-body mb-3 d-flex align-items-center gap-1">
              <ShieldCheck size={16} style={{ color: "#10b981" }} />
              Educational Scope
            </h6>
            <p
              className="small text-muted mb-0"
              style={{ fontSize: "0.8rem", lineHeight: "1.5" }}
            >
              BudgetBasics is an educational learning portal. It demonstrates
              budgeting rules and calculators, but does not claim to offer
              banking services, credit products, or permanent server storage.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-3 border-top d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 small text-muted">
          <div>© 2026 BudgetBasics</div>
          <div className="d-flex align-items-center gap-1">
            <span>For Inquiries:</span>
            <a
              href="mailto:decode@aptechgdn.net"
              className="fw-semibold text-decoration-none"
              style={{ color: "#10b981" }}
            >
              decode@aptechgdn.net
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
