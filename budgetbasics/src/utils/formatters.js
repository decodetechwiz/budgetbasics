// Utility helpers for currency formatting, numbers, and string display.

export const formatCurrency = (amount) => {
  const num = typeof amount === "number" ? amount : parseFloat(amount) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const sanitizeNumberInput = (value, fallback = 0) => {
  if (value === "" || value === null || value === undefined) return fallback;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? fallback : parsed;
};
