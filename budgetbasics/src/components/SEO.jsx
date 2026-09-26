import { useEffect } from "react";

const SEO = ({ title, description, keywords }) => {
  useEffect(() => {
    if (title) {
      if (title.includes("BudgetBasics")) {
        document.title = title;
      } else if (title === "Student Financial Literacy") {
        document.title = "BudgetBasics | Student Financial Literacy";
      } else {
        document.title = `${title} | BudgetBasics`;
      }
    } else {
      document.title = "BudgetBasics | Student Financial Literacy";
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.content = description;
    }

    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }
  }, [title, description, keywords]);

  return null;
};

export default SEO;
