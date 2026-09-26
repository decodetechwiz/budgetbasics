import { useState, useEffect, lazy, Suspense, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wallet, Users, Sun, Moon, Menu, X, Network, Clock } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import TopProgressBar from "./TopProgressBar";
import Authentication from "./Authentication";

// Lazily load sitemap modal to improve initial page load performance
const SitemapModal = lazy(() => import("./SitemapModal"));

// Isolated memoized clock: prevents the entire Navbar from re-rendering every second
const LiveClock = memo(() => {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTimeFull = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedTimeCompact = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="live-clock-badge shadow-2xs"
      title={`Live local time • ${formattedDate}`}
      aria-label={`Current local time: ${formattedTimeFull}`}
      role="timer"
      aria-live="polite"
    >
      <div className="d-flex align-items-center gap-1">
        <Clock size={13} className="text-success flex-shrink-0" />
        <span className="live-clock-time fw-medium font-monospace">
          <span className="d-none d-sm-inline">{formattedTimeFull}</span>
          <span className="d-inline d-sm-none">{formattedTimeCompact}</span>
        </span>
      </div>
    </div>
  );
});
LiveClock.displayName = "LiveClock";

const navTabs = [
  { path: "/", label: "Home" },
  { path: "/about", label: "AboutUs" },
  { path: "/basics", label: "Basics" },
  { path: "/calculator", label: "Calculator" },
  { path: "/exptracker", label: "ExpTracker" },
  { path: "/infographics", label: "Infographics" },
];

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  // Local state for visitor count
  const [visitorCount] = useState(() => {
    try {
      const previousVisits = parseInt(
        localStorage.getItem("budget_visits") || "0",
        10,
      );
      const currentVisits = previousVisits + 1;
      localStorage.setItem("budget_visits", currentVisits.toString());
      return currentVisits;
    } catch {
      return 1;
    }
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);

  // Close mobile menu on route change without triggering cascading effects
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    setIsMobileMenuOpen(false);
  }

  return (
    <header
      className="app-navbar sticky-top bg-body bg-opacity-75 border-bottom"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1030,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Progress bar line */}
      <TopProgressBar />

      <div className="container-xl py-3">
        <div className="d-flex align-items-center justify-content-between">
          {/* Website Logo */}
          <Link
            to="/"
            className="d-flex align-items-center gap-2 text-decoration-none"
            aria-label="BudgetBasics Home"
          >
            <div
              className="p-2 rounded-3 text-white d-flex align-items-center justify-content-center shadow-xs"
              style={{
                backgroundColor: "#10b981",
                width: "38px",
                height: "38px",
              }}
            >
              <Wallet size={20} />
            </div>
            <span className="fs-5 fw-bold tracking-tight text-body">
              Budget<span style={{ color: "#10b981" }}>Basics</span>
            </span>
          </Link>

          {/* Desktop Nav links */}
          <nav
            className="d-none d-lg-flex align-items-center gap-1"
            aria-label="Main navigation"
          >
            {navTabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`custom-nav-btn text-decoration-none ${
                    isActive ? "active" : ""
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          {/* Status icons, live clock, sitemap button & theme toggle */}
          <div className="d-flex align-items-center gap-2 gap-sm-3 small">
            {/* Live clock (memoized child component, zero parent re-renders) */}
            <LiveClock />

            {/* Sitemap modal trigger button */}
            <button
              type="button"
              onClick={() => setIsSitemapOpen(true)}
              className="btn btn-sm btn-outline-success d-none d-lg-flex align-items-center rounded-circle px-2 py-2 px-sm-2 shadow-2xs"
              title="Open website sitemap"
              aria-label="View Sitemap"
              style={{
                borderColor: "rgba(16, 185, 129, 0.45)",
                color: "#10b981",
              }}
            >
              <Network size={15} />
            </button>

            {/* User Authentication: Button on bigger screens (changes to avatar icon button when logged in) */}
            <div className="d-none d-lg-flex align-items-center">
              <Authentication variant="desktop" />
            </div>

            {/* Visitor counter */}
            <div
              className="d-none d-sm-flex align-items-center gap-1 px-2 py-1 rounded-pill"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "#10b981",
              }}
            >
              <Users size={13} />
              <span>
                Visits: <strong>{visitorCount}</strong>
              </span>
            </div>

            {/* Dark / light mode toggle switch */}
            <button
              type="button"
              onClick={toggleTheme}
              className="btn btn-sm btn-outline-secondary rounded-3 d-flex align-items-center justify-content-center p-2"
              title={
                darkMode ? "Switch to daylight mode" : "Switch to dark mode"
              }
              aria-label="Toggle theme color"
            >
              {darkMode ? (
                <Sun size={16} className="text-warning" />
              ) : (
                <Moon size={16} />
              )}
            </button>

            {/* Mobile drawer button */}
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary d-lg-none p-2 rounded-3"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav dropdown list */}
        {isMobileMenuOpen && (
          <div className="d-lg-none pt-3 pb-2 border-top mt-2 animate__animated animate__fadeIn">
            <div className="vstack gap-1">
              {navTabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                return (
                  <Link
                    key={tab.path}
                    to={tab.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`custom-nav-btn text-start w-100 text-decoration-none ${
                      isActive ? "active" : ""
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
              {/* Mobile Sitemap button in dropdown */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSitemapOpen(true);
                }}
                className="btn btn-sm btn-outline-success text-start w-100 d-flex align-items-center gap-2 mt-2 py-2 px-3 rounded-3"
              >
                <Network size={16} />
                <span>Open Website Sitemap & Features</span>
              </button>

              {/* User Authentication in drop down menu on smaller screens */}
              <Authentication
                variant="mobile"
                onMobileClose={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Lazily loaded sitemap modal with background blur */}
      {isSitemapOpen && (
        <Suspense fallback={null}>
          <SitemapModal
            isOpen={isSitemapOpen}
            onClose={() => setIsSitemapOpen(false)}
          />
        </Suspense>
      )}
    </header>
  );
};

export default Navbar;
