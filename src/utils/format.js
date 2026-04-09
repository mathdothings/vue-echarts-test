/**
 * Standard currency formatter for Brazilian Real (BRL)
 */
export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
});

/**
 * Standard number formatter with PT-BR grouping
 */
export const numberFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 2,
});

/**
 * Formats a value as an integer percentage
 */
export const formatAsIntegerPercent = (value) => {
  return `${Math.round(value)}%`;
};

/**
 * Formats a value as currency or a standard number based on the condition
 */
export const formatValue = (value, isMonetary = false) => {
  if (isMonetary) {
    return currencyFormatter.format(value);
  }
  return numberFormatter.format(value);
};
