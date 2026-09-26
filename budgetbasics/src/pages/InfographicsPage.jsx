import { useEffect, useRef } from "react";
import InfographicsGallery from "../components/InfographicsGallery";
import SEO from "../components/SEO";
import gsap from "gsap";
import AOS from "aos";

const InfographicsPage = () => {
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
        title="Financial Infographics & Guides"
        description="Comprehensive visual guides on budgeting, emergency funds, debt avoidance, compound interest, Roth IRAs, and cutting wasteful student expenses."
        keywords="student infographics, financial literacy infographics, visual budget guide, student savings blueprints, compound interest guide"
      />
      <div ref={pageRef} className="py-2">
        <InfographicsGallery />
      </div>
    </>
  );
};

export default InfographicsPage;
