import { useEffect, useRef } from "react";
import ExpenseTracker from "../components/ExpenseTracker";
import SEO from "../components/SEO";
import gsap from "gsap";
import AOS from "aos";

const ExpenseTrackerPage = () => {
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
        title="Student Expense Tracker"
        description="Fast, private session expense tracker designed for students. Log campus expenses, sort needs vs wants, detect wasteful leaks, and keep cash flow positive."
        keywords="student expense tracker, session budget tracker, college spending logger, no bank link expense tracker"
      />
      <div ref={pageRef} className="py-2">
        <ExpenseTracker />
      </div>
    </>
  );
};

export default ExpenseTrackerPage;
