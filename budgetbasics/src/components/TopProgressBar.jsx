import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const TopProgressBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Only animate if the path actually changed
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;

      setVisible(true);
      setProgress(25);

      const timer1 = setTimeout(() => {
        setProgress(75);
      }, 80);

      const timer2 = setTimeout(() => {
        setProgress(100);
      }, 200);

      const timer3 = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 420);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [location.pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        overflow: "hidden",
        zIndex: 1090,
        pointerEvents: "none",
        backgroundColor: "transparent",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #10b981, #34d399, #059669, #10b981)",
          backgroundSize: "200% 100%",
          boxShadow: "0 0 10px rgba(16, 185, 129, 0.8), 0 0 5px rgba(52, 211, 153, 0.6)",
          transition: "width 0.22s ease-out, opacity 0.25s ease-in-out",
          opacity: visible ? 1 : 0,
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );
};

export default TopProgressBar;
