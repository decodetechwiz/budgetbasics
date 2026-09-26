import { useEffect, useRef } from "react";
import BudgetCalculator from "../components/BudgetCalculator";
import SEO from "../components/SEO";
import gsap from "gsap";
import AOS from "aos";

const CalculatorPage = () => {
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
        title="50/30/20 Budget Calculator"
        description="Free student 50/30/20 budget calculator. Split your monthly income or campus stipend into 50% Needs, 30% Wants, and 20% Savings with quick student presets."
        keywords="50 30 20 calculator, student budget calculator, allowance calculator, student finance ratio, saving calculator"
      />
      <div ref={pageRef} className="py-2">
        <BudgetCalculator />
      </div>
    </>
  );
};

export default CalculatorPage;
