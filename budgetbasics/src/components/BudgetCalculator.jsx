import { useState } from "react";
import { formatCurrency, sanitizeNumberInput } from "../utils/formatters";
import calculatorData from "../data/budgetCalculatorData.json";

const { studentPresets } = calculatorData;

const BudgetCalculator = () => {
  const [incomeInput, setIncomeInput] = useState("3000");

  const monthlyIncome = sanitizeNumberInput(incomeInput, 0);

  // 50-30-20 rule calculations
  const needsBudget = monthlyIncome * 0.5;
  const wantsBudget = monthlyIncome * 0.3;
  const savingsBudget = monthlyIncome * 0.2;

  const handlePresetClick = (amount) => {
    setIncomeInput(amount.toString());
  };

  return (
    <div className="mx-auto" style={{ maxWidth: "800px" }} data-aos="fade-up">
      <div className="custom-card p-4 p-sm-5">
        <div className="mb-4">
          <span
            className="badge px-3 py-1 rounded-pill small fw-semibold text-uppercase mb-2"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              color: "#10b981",
            }}
          >
            Rule of Thumb
          </span>
          <h2 className="fs-3 fw-bold mb-1 text-body">
            50/30/20 Budget Calculator
          </h2>
          <p className="small text-muted mb-0">
            A simple framework to divide your monthly earnings between essential
            bills, lifestyle fun, and future freedom.
          </p>
        </div>

        {/* Income input field */}
        <div className="mb-3">
          <label
            htmlFor="calc-income"
            className="form-label small fw-semibold text-body"
          >
            Monthly Income / Allowance ($)
          </label>
          <div className="input-group">
            <span className="input-group-text bg-body-tertiary fw-bold text-muted">
              $
            </span>
            <input
              type="number"
              id="calc-income"
              value={incomeInput}
              onChange={(e) => setIncomeInput(e.target.value)}
              className="form-control fw-bold"
              placeholder="e.g. 3000"
              min="0"
              step="50"
            />
          </div>
        </div>

        {/* Presets */}
        <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
          <span className="small text-muted me-1">Try quick presets:</span>
          {studentPresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handlePresetClick(preset.amount)}
              className={`btn btn-sm rounded-pill px-3 ${
                incomeInput === preset.amount.toString()
                  ? "btn-emerald"
                  : "btn-outline-secondary"
              }`}
            >
              {preset.label} (${preset.amount})
            </button>
          ))}
        </div>

        {/* 50-30-20 visual breakdown */}
        <div className="vstack gap-4 pt-2">
          {/* Needs */}
          <div>
            <div className="d-flex justify-content-between align-items-baseline mb-1">
              <div>
                <span
                  className="small fw-bold text-emerald"
                  style={{ color: "#10b981" }}
                >
                  Needs (50%)
                </span>
                <span className="text-muted small ms-2 d-none d-sm-inline">
                  — Rent, groceries, transit, prescription meds
                </span>
              </div>
              <span className="text-body fw-bold">
                {formatCurrency(needsBudget)}
              </span>
            </div>
            <div className="progress progress-thin">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "50%", backgroundColor: "#10b981" }}
                aria-valuenow={50}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>

          {/* Wants */}
          <div>
            <div className="d-flex justify-content-between align-items-baseline mb-1">
              <div>
                <span
                  className="small fw-bold text-amber"
                  style={{ color: "#f59e0b" }}
                >
                  Wants (30%)
                </span>
                <span className="text-muted small ms-2 d-none d-sm-inline">
                  — Dining out with friends, concerts, hobbies, gaming
                </span>
              </div>
              <span className="text-body fw-bold">
                {formatCurrency(wantsBudget)}
              </span>
            </div>
            <div className="progress progress-thin">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "30%", backgroundColor: "#f59e0b" }}
                aria-valuenow={30}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>

          {/* Savings */}
          <div>
            <div className="d-flex justify-content-between align-items-baseline mb-1">
              <div>
                <span
                  className="small fw-bold text-primary"
                  style={{ color: "#3b82f6" }}
                >
                  Savings & Safety Buffer (20%)
                </span>
                <span className="text-muted small ms-2 d-none d-sm-inline">
                  — Emergency fund, laptop upgrades, paying down student debt
                </span>
              </div>
              <span className="text-body fw-bold">
                {formatCurrency(savingsBudget)}
              </span>
            </div>
            <div className="progress progress-thin">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "20%", backgroundColor: "#3b82f6" }}
                aria-valuenow={20}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>

        {/* Tip for students */}
        <div className="p-3 rounded-3 bg-body-tertiary border mt-4 text-muted small">
          💡 <strong>Tip For Students:</strong> If your campus housing or city
          transit eats up more than 50%, don't worry. Many college students
          temporarily adjust this split to{" "}
          <strong>60% Needs / 25% Wants / 15% Savings</strong>. The most
          important habit is staying consistent!
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;
