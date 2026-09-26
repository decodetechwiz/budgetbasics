import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import EducationalCards from "../components/EducationalCards";
import NeedsWantsGame from "../components/NeedsWantsGame";
import SEO from "../components/SEO";
import gsap from "gsap";
import AOS from "aos";

const BasicsPage = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    AOS.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO
        title="Basics & Needs vs Wants"
        description="Master foundational financial principles, understand cash flow differences, and test your spending habits with the interactive Needs vs Wants simulation game."
        keywords="budget basics, needs vs wants, student finance basics, 24 hour rule, impulse buys, income vs expenses"
      />
      <div ref={pageRef} className="vstack gap-4">
        <HeroBanner onGoToCalculator={() => navigate("/calculator")} />
        <EducationalCards />
        <NeedsWantsGame />
      </div>
    </>
  );
};

export default BasicsPage;
