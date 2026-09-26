import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUp } from "lucide-react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy-loaded route components for high performance and fast initial page loads
const LandingPage = lazy(() => import("./pages/LandingPage"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const BasicsPage = lazy(() => import("./pages/BasicsPage"));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage"));
const ExpenseTrackerPage = lazy(() => import("./pages/ExpenseTrackerPage"));
const InfographicsPage = lazy(() => import("./pages/InfographicsPage"));

// Lazy-loaded floating chatbot assistant
const ChatbotWidget = lazy(() => import("./components/ChatbotWidget"));

// Lightweight smooth fallback for route transitions
const PageLoader = () => (
  <div
    className="page-loader-wrapper"
    role="status"
    aria-label="Loading page content"
  >
    <div className="page-loader-spinner" />
    <span className="text-secondary small fw-medium">Loading content...</span>
  </div>
);

function MainApp() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Initialize Animate On Scroll with optimized scroll listeners
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true, // Prevents expensive scroll re-calculations on mobile and PC
      offset: 25,
      easing: "ease-out-cubic",
      disableMutationObserver: false,
    });

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowBackToTop(window.scrollY > 240);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navbar with live clock, theme switch and progress line */}
      <Navbar />

      {/* Main Routes */}
      <main className="flex-grow-1 container-xl py-4 py-md-5" id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/basics" element={<BasicsPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/exptracker" element={<ExpenseTrackerPage />} />
            <Route path="/infographics" element={<InfographicsPage />} />
            {/* Catch-all route gracefully redirects to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer with quick links & support */}
      <Footer />

      {/* Floating AI Peer Assistant */}
      <Suspense fallback={null}>
        <ChatbotWidget />
      </Suspense>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="btn-back-to-top"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

export default App;
