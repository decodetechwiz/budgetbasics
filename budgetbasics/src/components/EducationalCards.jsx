import { TrendingUp, PiggyBank, AlertTriangle } from "lucide-react";
import educationalData from "../data/educationalCardsData.json";

// Map string icon names to Lucide icons
const iconMap = {
  TrendingUp,
  PiggyBank,
  AlertTriangle,
};

const EducationalCards = () => {
  const { concepts } = educationalData;

  return (
    <div className="row g-4 mb-4">
      {concepts.map((card) => {
        const IconComponent = iconMap[card.iconName] || TrendingUp;
        return (
          <div
            key={card.id}
            className="col-12 col-md-4"
            data-aos="fade-up"
            data-aos-delay={card.delay}
          >
            <div className="custom-card p-4 h-100 d-flex flex-column">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "44px",
                  height: "44px",
                  backgroundColor: card.bgColor,
                  color: card.color,
                }}
              >
                <IconComponent size={22} />
              </div>
              <h3 className="fs-5 fw-bold mb-2 text-body">{card.title}</h3>
              <p className="small text-muted mb-0 lh-base flex-grow-1">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EducationalCards;
