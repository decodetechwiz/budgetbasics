import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Trash2,
  RotateCcw,
  DollarSign,
  AlertCircle,
  TrendingUp,
  PiggyBank,
  ShieldAlert,
  Lightbulb,
  CheckCircle2,
  Wallet,
  Landmark,
  Building2,
  Sparkles,
  Scissors,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { formatCurrency, sanitizeNumberInput } from "../utils/formatters";
import expenseData from "../data/expenseTrackerData.json";

const { defaultStudentExpenses, incomePresets } = expenseData;

const generateExpenseId = () => Date.now() + Math.floor(Math.random() * 1000);

const ExpenseTracker = () => {
  // Monthly income state fetched from localStorage
  const [monthlyIncomeInput, setMonthlyIncomeInput] = useState(() => {
    try {
      const savedIncome = localStorage.getItem("budgetbasics_income");
      if (savedIncome !== null) return savedIncome;
    } catch {
      // localStorage disabled or blocked
    }
    return "1200";
  });

  // Expenses list state fetched from localStorage
  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem("budgetbasics_expenses");
      if (savedExpenses) return JSON.parse(savedExpenses);
    } catch {
      // localStorage disabled or blocked
    }
    return defaultStudentExpenses;
  });

  // Expense form inputs
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Need");
  const [editingId, setEditingId] = useState(null);

  // Save income to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("budgetbasics_income", monthlyIncomeInput);
    } catch {
      // localStorage error handling
    }
  }, [monthlyIncomeInput]);

  // Save Expenses to localStorage whenever list changes
  useEffect(() => {
    try {
      localStorage.setItem("budgetbasics_expenses", JSON.stringify(expenses));
    } catch {
      // localStorage error handling
    }
  }, [expenses]);

  // numeric income
  const monthlyIncome = sanitizeNumberInput(monthlyIncomeInput, 0);

  // calculations
  const totalSpendings = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  const totalWants = useMemo(() => {
    return expenses
      .filter((item) => item.category === "Want")
      .reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  const totalWorthless = useMemo(() => {
    return expenses
      .filter((item) => item.category === "Worthless")
      .reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  // Total discretionary, worthless + wants
  const totalCuttable = totalWorthless + totalWants;

  // Net savings / income - spendings
  const netSavings = monthlyIncome - totalSpendings;
  const isDebt = netSavings < 0;
  const debtAmount = Math.abs(netSavings);

  // Filtered items that can be cut
  const worthlessItems = useMemo(() => {
    return expenses.filter(
      (item) => item.category === "Worthless" || item.category === "Want",
    );
  }, [expenses]);

  // Add or update expense
  const handleSaveExpense = (e) => {
    e.preventDefault();
    const cleanDesc = description.trim();
    const parsedAmount = parseFloat(amount);

    if (!cleanDesc || isNaN(parsedAmount) || parsedAmount <= 0) return;

    if (editingId) {
      // Update existing item
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, desc: cleanDesc, amount: parsedAmount, category }
            : item,
        ),
      );
      handleCancelEdit();
    } else {
      // Create new entry
      const newEntry = {
        id: generateExpenseId(),
        desc: cleanDesc,
        amount: parsedAmount,
        category,
      };
      setExpenses((prev) => [newEntry, ...prev]);
      setDescription("");
      setAmount("");
      setCategory("Need");
    }
  };

  // Start editing an expense
  const handleStartEdit = (exp) => {
    setEditingId(exp.id);
    setDescription(exp.desc);
    setAmount(exp.amount.toString());
    setCategory(exp.category);

    // Scroll smoothly to form for easy editing
    const formElement = document.getElementById("expense-input-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingId(null);
    setDescription("");
    setAmount("");
    setCategory("Need");
  };

  // Delete expense
  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      handleCancelEdit();
    }
  };

  // Reset to default sample student data
  const handleResetToDefaults = () => {
    setExpenses(defaultStudentExpenses);
    setMonthlyIncomeInput("1200");
    handleCancelEdit();
  };

  return (
    <div className="vstack gap-4" data-aos="fade-up">
      {/* Header & quick reset */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span
            className="badge px-3 py-1 rounded-pill small fw-semibold text-uppercase mb-2"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              color: "#10b981",
            }}
          ></span>
          <h2 className="fs-3 fw-bold mb-1 text-body">
            Expense Planner & Financial Analyzer
          </h2>
          <p className="small text-muted mb-0">
            Log your income and monthly purchases. Discover wasteful leaks,
            eliminate debt, and learn where to invest your saved cash.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetToDefaults}
          className="btn btn-sm btn-outline-secondary rounded-pill d-inline-flex align-items-center gap-1 align-self-start align-self-md-auto"
          title="Reset to sample student data"
        >
          <RotateCcw size={14} />
          <span>Reset Sample Data</span>
        </button>
      </div>

      {/* Monthly income configuration card */}
      <div className="custom-card p-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-5">
            <label
              htmlFor="monthly-income-input"
              className="form-label small fw-semibold text-body d-flex align-items-center gap-2 mb-1"
            >
              <Wallet
                size={16}
                className="text-emerald"
                style={{ color: "#10b981" }}
              />
              Monthly Income / Allowance ($)
            </label>
            <div className="input-group">
              <span className="input-group-text bg-body-tertiary fw-bold text-muted">
                $
              </span>
              <input
                type="number"
                id="monthly-income-input"
                className="form-control fw-bold fs-5 text-body"
                value={monthlyIncomeInput}
                onChange={(e) => setMonthlyIncomeInput(e.target.value)}
                placeholder="e.g. 1200"
                min="0"
                step="50"
              />
            </div>
          </div>

          <div className="col-12 col-md-7">
            <span className="small text-muted d-block mb-1">
              Quick Income Presets:
            </span>
            <div className="d-flex flex-wrap gap-2">
              {incomePresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() =>
                    setMonthlyIncomeInput(preset.amount.toString())
                  }
                  className={`btn btn-sm rounded-pill px-3 ${
                    monthlyIncomeInput === preset.amount.toString()
                      ? "btn-emerald"
                      : "btn-outline-secondary"
                  }`}
                >
                  {preset.label} (${preset.amount})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spendings, savings & status cards */}
      <div className="row g-3">
        {/* Income Card */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="custom-card p-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">
                Monthly Inflow
              </span>
              <div
                className="p-2 rounded-3"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.12)",
                  color: "#10b981",
                }}
              >
                <DollarSign size={18} />
              </div>
            </div>
            <div>
              <h3 className="fs-4 fw-bold text-body mb-0">
                {formatCurrency(monthlyIncome)}
              </h3>
              <span className="text-muted small">Verified monthly budget</span>
            </div>
          </div>
        </div>

        {/* Total spendings card */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="custom-card p-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">
                Total Spendings
              </span>
              <div
                className="p-2 rounded-3"
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.12)",
                  color: "#ef4444",
                }}
              >
                <TrendingUp size={18} />
              </div>
            </div>
            <div>
              <h3 className="fs-4 fw-bold text-body mb-0">
                {formatCurrency(totalSpendings)}
              </h3>
              <span className="text-muted small">
                {expenses.length} logged purchase
                {expenses.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Net savings & bebt card */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className={`custom-card p-3 h-100 d-flex flex-column justify-content-between ${
              isDebt ? "border-danger border-2" : "border-success border-2"
            }`}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">
                {isDebt ? "Monthly Debt / Deficit" : "Net Monthly Savings"}
              </span>
              <div
                className="p-2 rounded-3"
                style={{
                  backgroundColor: isDebt
                    ? "rgba(239, 68, 68, 0.15)"
                    : "rgba(16, 185, 129, 0.15)",
                  color: isDebt ? "#ef4444" : "#10b981",
                }}
              >
                {isDebt ? <ShieldAlert size={18} /> : <PiggyBank size={18} />}
              </div>
            </div>
            <div>
              <h3
                className={`fs-4 fw-bold mb-0 ${
                  isDebt ? "text-danger" : "text-success"
                }`}
              >
                {isDebt
                  ? `-${formatCurrency(debtAmount)}`
                  : `+${formatCurrency(netSavings)}`}
              </h3>
              <span className="small text-muted">
                {isDebt
                  ? "⚠️ Spending exceeds income"
                  : "Available for investment"}
              </span>
            </div>
          </div>
        </div>

        {/* Unimportant purchases card */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="custom-card p-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">
                Recoverable Money
              </span>
              <div
                className="p-2 rounded-3"
                style={{
                  backgroundColor: "rgba(245, 158, 11, 0.15)",
                  color: "#f59e0b",
                }}
              >
                <Scissors size={18} />
              </div>
            </div>
            <div>
              <h3
                className="fs-4 fw-bold text-amber mb-0"
                style={{ color: "#d97706" }}
              >
                {formatCurrency(totalCuttable)}
              </h3>
              <span className="text-muted small">
                From {worthlessItems.length} discretionary item
                {worthlessItems.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis & bebt solution */}
      {isDebt ? (
        /* debt alert & recovery plan */
        <div
          className="p-4 rounded-4 border border-danger bg-danger-subtle text-body animate__animated animate__fadeIn"
          role="alert"
        >
          <div className="d-flex align-items-start gap-3">
            <div
              className="p-2 rounded-3 bg-danger text-white flex-shrink-0"
              style={{
                width: "42px",
                height: "42px",
                display: "grid",
                placeItems: "center",
              }}
            >
              <AlertCircle size={22} />
            </div>
            <div className="flex-grow-1">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-2">
                <h3 className="fs-5 fw-bold text-danger mb-0">
                  Critical Debt Warning: You Are Spending Beyond Your Income
                </h3>
                <span className="badge bg-danger text-white px-3 py-1 rounded-pill">
                  Deficit: -{formatCurrency(debtAmount)} / month
                </span>
              </div>
              <p className="small mb-3" style={{ lineHeight: "1.6" }}>
                Your total outflow of{" "}
                <strong>{formatCurrency(totalSpendings)}</strong> exceeds your
                verified monthly inflow of{" "}
                <strong>{formatCurrency(monthlyIncome)}</strong>. If left
                unaddressed, this will force borrowing, overdraft fees, or
                high-interest credit debt.
              </p>

              {/* Solution based on user spending */}
              <div className="p-3 rounded-3 bg-body border mb-3">
                <h4 className="fs-6 fw-bold text-body mb-2 d-flex align-items-center gap-2">
                  <Scissors size={16} className="text-danger" />
                  Direct Solution: Eliminate Discretionary Items to Wipe Out
                  Debt
                </h4>
                {totalCuttable >= debtAmount ? (
                  <p className="small text-muted mb-0">
                    💡 <strong>Great News:</strong> You have logged{" "}
                    <strong>{formatCurrency(totalCuttable)}</strong> in optional
                    lifestyle & wasteful purchases. By cutting or reducing these
                    items (such as delivery fees, unused subscriptions, or
                    splurges), you will{" "}
                    <span className="text-success fw-bold">
                      completely wipe out your {formatCurrency(debtAmount)} debt
                    </span>{" "}
                    and generate an estimated{" "}
                    <span className="text-success fw-bold">
                      +{formatCurrency(totalCuttable - debtAmount)} monthly
                      surplus
                    </span>
                    !
                  </p>
                ) : (
                  <p className="small text-muted mb-0">
                    ⚠️ Cutting all logged non-essential purchases (worth{" "}
                    <strong>{formatCurrency(totalCuttable)}</strong>) will
                    reduce your debt, but leaves a remaining deficit of{" "}
                    <strong>
                      {formatCurrency(debtAmount - totalCuttable)}
                    </strong>
                    . You must negotiate rent/transit or take on 3–4 extra hours
                    of campus work-study shifts.
                  </p>
                )}
              </div>

              {/* Where to invest once recovered */}
              <div className="small text-body-secondary">
                🚀 <strong>Once Debt is Cleared:</strong> Direct your recovered
                funds into a High-Yield Savings Account (HYSA) or S&P 500 Index
                Fund (see investment guides below).
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Healty budget insight */
        <div className="p-4 rounded-4 custom-card border-success border-start border-4">
          <div className="d-flex align-items-start gap-3">
            <div
              className="p-2 rounded-3 text-white flex-shrink-0"
              style={{
                backgroundColor: "#10b981",
                width: "40px",
                height: "40px",
                display: "grid",
                placeItems: "center",
              }}
            >
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h3 className="fs-5 fw-bold text-body mb-1">
                Healthy Spending Status: +{formatCurrency(netSavings)} Monthly
                Savings Buffer
              </h3>
              <p
                className="small text-muted mb-2"
                style={{ lineHeight: "1.6" }}
              >
                You are currently living within your monthly means! However, you
                still have{" "}
                <strong className="text-body">
                  {formatCurrency(totalCuttable)}
                </strong>{" "}
                in discretionary & wasteful purchases. By trimming those, your
                monthly savings could surge to{" "}
                <strong className="text-success">
                  {formatCurrency(netSavings + totalCuttable)}
                </strong>{" "}
                per month!
              </p>
              <span
                className="small text-emerald fw-semibold"
                style={{ color: "#10b981" }}
              >
                👉 Check our Investment & Banking Guide below to put your
                surplus cash to work.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Monthly purchase form */}
      <form
        id="expense-input-form"
        onSubmit={handleSaveExpense}
        className={`custom-card p-4 transition-all ${
          editingId ? "border-warning border-2 shadow-sm" : ""
        }`}
      >
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="fs-5 fw-bold text-body mb-0 d-flex align-items-center gap-2">
            {editingId ? (
              <>
                <Pencil size={18} className="text-warning" />
                <span>Editing Selected Purchase</span>
              </>
            ) : (
              <>
                <Plus
                  size={18}
                  className="text-emerald"
                  style={{ color: "#10b981" }}
                />
                <span>Add Monthly Purchase / Spending</span>
              </>
            )}
          </h3>

          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn btn-sm btn-outline-secondary rounded-pill d-inline-flex align-items-center gap-1"
            >
              <X size={14} />
              <span>Cancel Edit</span>
            </button>
          )}
        </div>

        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-4">
            <label
              htmlFor="exp-desc"
              className="form-label small fw-semibold text-body mb-1"
            >
              Purchase Description
            </label>
            <input
              type="text"
              id="exp-desc"
              placeholder="e.g. Textbook, Groceries, DoorDash"
              required
              className="form-control form-control-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <label
              htmlFor="exp-amount"
              className="form-label small fw-semibold text-body mb-1"
            >
              Amount ($)
            </label>
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-body-tertiary text-muted">
                $
              </span>
              <input
                type="number"
                id="exp-amount"
                placeholder="0.00"
                step="0.01"
                min="0.01"
                required
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <label
              htmlFor="exp-cat"
              className="form-label small fw-semibold text-body mb-1"
            >
              Utility Classification
            </label>
            <select
              id="exp-cat"
              className="form-select form-select-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Need">
                Need (Living Essential: Rent, Groceries, Transit)
              </option>
              <option value="Want">Want (Campus Lifestyle & Fun)</option>
              <option value="Worthless">
                Worthless / Cut Candidate (Subscriptions, Splurges)
              </option>
            </select>
          </div>

          <div className="col-12 col-md-2 mt-md-4 pt-md-2">
            <button
              type="submit"
              className={`btn btn-sm w-100 d-flex align-items-center justify-content-center gap-1 py-2 fw-semibold ${
                editingId ? "btn-warning text-dark" : "btn-emerald"
              }`}
            >
              {editingId ? (
                <>
                  <Check size={16} />
                  <span>Update Purchase</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Log Expense</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Logged expenses section */}
      <div className="custom-card overflow-hidden">
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom bg-body-tertiary">
          <span className="small text-muted fw-semibold">
            All Logged Purchases & Bills ({expenses.length})
          </span>
          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted">
              Total Outflow:{" "}
              <strong className="text-body">
                {formatCurrency(totalSpendings)}
              </strong>
            </span>
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table mb-0 text-start">
            <thead>
              <tr>
                <th>Description</th>
                <th>Utility Classification</th>
                <th>Amount</th>
                <th className="text-end" style={{ minWidth: "140px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted small">
                    No purchases logged yet. Add your first spending item above
                    or tap "Reset Sample Data".
                  </td>
                </tr>
              ) : (
                expenses.map((exp) => {
                  const isCurrentEditing = editingId === exp.id;
                  return (
                    <tr
                      key={exp.id}
                      className={
                        isCurrentEditing ? "table-warning bg-opacity-25" : ""
                      }
                    >
                      <td className="fw-medium text-body">
                        {exp.desc}
                        {isCurrentEditing && (
                          <span className="badge bg-warning text-dark ms-2 small">
                            Editing
                          </span>
                        )}
                      </td>
                      <td>
                        <span
                          className="badge px-2 py-1 rounded small fw-semibold"
                          style={
                            exp.category === "Need"
                              ? {
                                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                                  color: "#10b981",
                                }
                              : exp.category === "Want"
                                ? {
                                    backgroundColor: "rgba(245, 158, 11, 0.15)",
                                    color: "#f59e0b",
                                  }
                                : {
                                    backgroundColor: "rgba(239, 68, 68, 0.15)",
                                    color: "#ef4444",
                                  }
                          }
                        >
                          {exp.category === "Need"
                            ? "Essential Need"
                            : exp.category === "Want"
                              ? "Lifestyle Want"
                              : "Worthless / Cut Candidate"}
                        </span>
                      </td>
                      <td className="fw-bold text-body">
                        {formatCurrency(exp.amount)}
                      </td>
                      {/* Edit & delete buttons */}
                      <td className="text-end">
                        <div className="d-flex align-items-center justify-content-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(exp)}
                            className={`btn btn-sm ${
                              isCurrentEditing
                                ? "btn-warning text-dark"
                                : "btn-outline-secondary"
                            } d-inline-flex align-items-center gap-1 py-1 px-2`}
                            title="Edit purchase details"
                            aria-label={`Edit ${exp.desc}`}
                          >
                            <Pencil size={13} />
                            <span className="d-none d-sm-inline small">
                              Edit
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteExpense(exp.id)}
                            className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1 py-1 px-2"
                            title="Delete purchase"
                            aria-label={`Delete ${exp.desc}`}
                          >
                            <Trash2 size={13} />
                            <span className="d-none d-sm-inline small">
                              Delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Opportunities section */}
      {worthlessItems.length > 0 && (
        <div className="custom-card p-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h3 className="fs-5 fw-bold text-body mb-1 d-flex align-items-center gap-2">
                <Scissors size={18} className="text-warning" />
                Opportunities to Cut & Recover Cash
              </h3>
              <p className="small text-muted mb-0">
                These {worthlessItems.length} logged items were classified as
                non-essential or wasteful. Cutting them recovers up to{" "}
                <strong className="text-success">
                  {formatCurrency(totalCuttable)}/month
                </strong>{" "}
                (<strong>{formatCurrency(totalCuttable * 12)}/year</strong>).
              </p>
            </div>
            <span
              className="badge px-3 py-1 rounded-pill small fw-bold"
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.15)",
                color: "#d97706",
              }}
            >
              Recoverable: {formatCurrency(totalCuttable)}
            </span>
          </div>

          <div className="row g-2">
            {worthlessItems.map((item) => (
              <div key={item.id} className="col-12 col-md-6">
                <div className="p-3 rounded-3 bg-body-tertiary border d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-semibold text-body d-block small">
                      {item.desc}
                    </span>
                    <span
                      className="badge px-2 py-0 rounded small"
                      style={
                        item.category === "Worthless"
                          ? {
                              backgroundColor: "rgba(239, 68, 68, 0.15)",
                              color: "#ef4444",
                            }
                          : {
                              backgroundColor: "rgba(245, 158, 11, 0.15)",
                              color: "#f59e0b",
                            }
                      }
                    >
                      {item.category === "Worthless"
                        ? "Worthless / Waste"
                        : "Discretionary Want"}
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="fw-bold text-danger d-block">
                      -{formatCurrency(item.amount)}
                    </span>
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.72rem" }}
                    >
                      Saves {formatCurrency(item.amount * 12)}/yr
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Where to invest the saved money section */}
      <div className="custom-card p-4">
        <div className="mb-4">
          <span
            className="badge px-3 py-1 rounded-pill small fw-semibold text-uppercase mb-2"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.12)",
              color: "#3b82f6",
            }}
          >
            Wealth Growth Blueprint
          </span>
          <h3 className="fs-4 fw-bold text-body mb-1">
            Where to Put Your Saved Money: Banks & Markets
          </h3>
          <p className="small text-muted mb-0">
            If you eliminate wasteful spending and debt, here is exactly where
            to invest your recovered dollars to achieve guaranteed interest and
            exponential compound growth.
          </p>
        </div>

        <div className="row g-3">
          {/* High yield savings account */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 rounded-4 bg-body-tertiary border h-100 d-flex flex-column justify-content-between">
              <div>
                <div
                  className="p-2 rounded-3 d-inline-flex align-items-center justify-content-center mb-2"
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                    color: "#10b981",
                  }}
                >
                  <Building2 size={20} />
                </div>
                <h4 className="fs-6 fw-bold text-body mb-1">
                  High-Yield Savings (HYSA)
                </h4>
                <span className="badge bg-success-subtle text-success small mb-2">
                  4.0% – 5.0% APY
                </span>
                <p
                  className="small text-muted mb-3"
                  style={{ lineHeight: "1.5" }}
                >
                  Replace traditional bank accounts that pay 0.01%. Top
                  student-friendly banks pay up to 5% with zero minimums and
                  zero monthly maintenance fees.
                </p>
                <div className="small fw-semibold text-body mb-1">
                  Top Student Banks:
                </div>
                <ul className="list-unstyled small text-muted vstack gap-1 mb-3">
                  <li>• Ally Bank (No fees, easy buckets)</li>
                  <li>• Marcus by Goldman Sachs</li>
                  <li>• Capital One 360 Performance</li>
                </ul>
              </div>
              <div
                className="p-2 rounded-2 bg-body border text-emerald small fw-semibold text-center"
                style={{ color: "#10b981" }}
              >
                Risk Level: Zero (FDIC Insured)
              </div>
            </div>
          </div>

          {/* Index funds */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 rounded-4 bg-body-tertiary border h-100 d-flex flex-column justify-content-between">
              <div>
                <div
                  className="p-2 rounded-3 d-inline-flex align-items-center justify-content-center mb-2"
                  style={{
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                    color: "#3b82f6",
                  }}
                >
                  <TrendingUp size={20} />
                </div>
                <h4 className="fs-6 fw-bold text-body mb-1">
                  Broad Market Index Funds
                </h4>
                <span className="badge bg-primary-subtle text-primary small mb-2">
                  ~7% – 10% Historical Return
                </span>
                <p
                  className="small text-muted mb-3"
                  style={{ lineHeight: "1.5" }}
                >
                  Invest in the top 500 companies at once. Investing $50/month
                  in an S&P 500 ETF compounds into tens of thousands of dollars
                  over your early career.
                </p>
                <div className="small fw-semibold text-body mb-1">
                  Top Platforms & Tickers:
                </div>
                <ul className="list-unstyled small text-muted vstack gap-1 mb-3">
                  <li>• VOO (Vanguard 500 Index)</li>
                  <li>• VTI (Total US Stock Market)</li>
                  <li>• Fidelity / Schwab (Fractional shares)</li>
                </ul>
              </div>
              <div
                className="p-2 rounded-2 bg-body border text-primary small fw-semibold text-center"
                style={{ color: "#3b82f6" }}
              >
                Strategy: Long-Term Compounding
              </div>
            </div>
          </div>

          {/* Student roth IRA */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 rounded-4 bg-body-tertiary border h-100 d-flex flex-column justify-content-between">
              <div>
                <div
                  className="p-2 rounded-3 d-inline-flex align-items-center justify-content-center mb-2"
                  style={{
                    backgroundColor: "rgba(139, 92, 246, 0.15)",
                    color: "#8b5cf6",
                  }}
                >
                  <Landmark size={20} />
                </div>
                <h4 className="fs-6 fw-bold text-body mb-1">
                  Tax-Free Roth IRA
                </h4>
                <span
                  className="badge bg-purple-subtle text-purple small mb-2"
                  style={{ color: "#7c3aed" }}
                >
                  100% Tax-Free Gains
                </span>
                <p
                  className="small text-muted mb-3"
                  style={{ lineHeight: "1.5" }}
                >
                  If you have earned income from work-study, summer jobs, or
                  tutoring, invest inside a Roth IRA so your profits are
                  completely tax-free forever.
                </p>
                <div className="small fw-semibold text-body mb-1">
                  Key Advantages:
                </div>
                <ul className="list-unstyled small text-muted vstack gap-1 mb-3">
                  <li>• Lowest tax bracket in life right now</li>
                  <li>• Withdraw original contributions anytime</li>
                  <li>• Automated recurring deposits</li>
                </ul>
              </div>
              <div
                className="p-2 rounded-2 bg-body border small fw-semibold text-center"
                style={{ color: "#7c3aed" }}
              >
                Best For: Earned Campus Wages
              </div>
            </div>
          </div>

          {/* Liquid cash emergency buffer */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 rounded-4 bg-body-tertiary border h-100 d-flex flex-column justify-content-between">
              <div>
                <div
                  className="p-2 rounded-3 d-inline-flex align-items-center justify-content-center mb-2"
                  style={{
                    backgroundColor: "rgba(245, 158, 11, 0.15)",
                    color: "#f59e0b",
                  }}
                >
                  <Sparkles size={20} />
                </div>
                <h4 className="fs-6 fw-bold text-body mb-1">
                  $300 – $500 Starter Cushion
                </h4>
                <span className="badge bg-warning-subtle text-warning small mb-2">
                  First Step Priority
                </span>
                <p
                  className="small text-muted mb-3"
                  style={{ lineHeight: "1.5" }}
                >
                  Never invest in the stock market before having a liquid
                  emergency cushion. This stops unexpected laptop repairs or
                  health copays from forcing credit debt.
                </p>
                <div className="small fw-semibold text-body mb-1">
                  Rules to Follow:
                </div>
                <ul className="list-unstyled small text-muted vstack gap-1 mb-3">
                  <li>• Keep in a separate savings account</li>
                  <li>• Do not attach a debit card to it</li>
                  <li>• Refill immediately after an emergency</li>
                </ul>
              </div>
              <div className="p-2 rounded-2 bg-body border text-warning-emphasis small fw-semibold text-center">
                Action: Build This Buffer First!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student money saving & investing tips */}
      <div className="custom-card p-4">
        <h3 className="fs-5 fw-bold text-body mb-3 d-flex align-items-center gap-2">
          <Lightbulb size={20} className="text-warning" />
          Everyday Student Money Habits to Save Even More
        </h3>

        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="p-3 rounded-3 bg-body-tertiary border h-100">
              <span className="fw-bold text-body d-block small mb-1">
                ⏱️ The 24-Hour Purchase Pause
              </span>
              <p
                className="small text-muted mb-0"
                style={{ lineHeight: "1.5" }}
              >
                Add non-essential items to an online cart, but wait 24 hours
                before buying. Over 60% of impulse buying urges dissolve
                overnight, keeping your cash intact.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="p-3 rounded-3 bg-body-tertiary border h-100">
              <span className="fw-bold text-body d-block small mb-1">
                🎓 Claim Your 50% .edu Discounts
              </span>
              <p
                className="small text-muted mb-0"
                style={{ lineHeight: "1.5" }}
              >
                Never pay full price for Spotify, Apple Music, GitHub, or Amazon
                Prime. Use your verified student email to slash software and
                streaming bills in half.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="p-3 rounded-3 bg-body-tertiary border h-100">
              <span className="fw-bold text-body d-block small mb-1">
                🍳 Batch Meal Prep vs Delivery
              </span>
              <p
                className="small text-muted mb-0"
                style={{ lineHeight: "1.5" }}
              >
                Spending $25 on delivery four times a week costs over
                $400/month. Cooking basic pasta, rice bowls, or wraps takes 20
                minutes and drops your food bill below $150.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
