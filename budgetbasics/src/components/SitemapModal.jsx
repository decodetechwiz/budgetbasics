import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X, Network, ArrowRight, CheckCircle2 } from "lucide-react";
import sitemapData from "../data/sitemapData.json";
import "./SitemapModal.css";

const SitemapModal = ({ isOpen, onClose }) => {
  const modalContentRef = useRef(null);
  const { pages } = sitemapData;

  // Close on Escape key and prevent background body scrolling without layout shift
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Compensate for scrollbar width on PC to eliminate sudden page layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="sitemap-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sitemap-modal-title"
    >
      {/* Responsive sitemap card */}
      <div ref={modalContentRef} className="sitemap-card">
        {/* Modal header */}
        <header className="sitemap-header">
          <div className="d-flex align-items-center gap-2 gap-sm-3">
            <div className="sitemap-header-icon" aria-hidden="true">
              <Network size={20} />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h2 id="sitemap-modal-title" className="fs-5 fw-bold text-body mb-0">
                  BudgetBasics Sitemap
                </h2>
                <span className="badge bg-success-subtle text-success small d-none d-sm-inline-block">
                  6 Core Modules
                </span>
              </div>
              <p className="small text-muted mb-0 mt-1">
                Explore every page, module, game, and core feature across the platform.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="sitemap-close-btn"
            aria-label="Close sitemap modal"
            title="Close (Esc)"
          >
            <X size={18} />
          </button>
        </header>

        {/* Modal scrollable body */}
        <div className="sitemap-body">
          <div className="sitemap-grid">
            {pages.map((page) => (
              <article
                key={page.id}
                className="sitemap-item-card"
                style={{ "--item-accent": page.badgeColor }}
              >
                <div>
                  {/* Route & category header */}
                  <div className="sitemap-item-header">
                    <span
                      className="sitemap-route-badge"
                      style={{
                        backgroundColor: `${page.badgeColor}18`,
                        color: page.badgeColor,
                        border: `1px solid ${page.badgeColor}35`,
                      }}
                    >
                      {page.path}
                    </span>
                    <span className="sitemap-category-badge">
                      {page.badge}
                    </span>
                  </div>

                  <h3 className="sitemap-item-title">{page.title}</h3>
                  <p className="sitemap-item-subtitle">{page.subtitle}</p>

                  {/* Core features box */}
                  <div className="sitemap-features-box">
                    <div className="sitemap-features-label">
                      Core Features Included:
                    </div>
                    <ul className="sitemap-features-list">
                      {page.coreFeatures.map((feat, fIdx) => (
                        <li key={fIdx} className="sitemap-feature-item">
                          <CheckCircle2 size={15} className="sitemap-feature-icon" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Visit CTA */}
                <Link
                  to={page.path}
                  onClick={onClose}
                  className="sitemap-action-btn"
                >
                  <span>Visit {page.title}</span>
                  <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Modal footer */}
        <footer className="sitemap-footer">
          <span>
            💡 <strong>Quick navigation:</strong> Tap any card to navigate seamlessly without page reload.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="sitemap-footer-close-btn"
          >
            Close Sitemap
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
};

export default SitemapModal;
