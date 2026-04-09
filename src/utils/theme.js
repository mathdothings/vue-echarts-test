/**
 * A curated, premium color palette for ECharts.
 * Each color is chosen to look good in both light and dark backgrounds.
 */
export const CHART_PALETTE = [
  '#3b82f6', // Bright Blue
  '#10b981', // Emerald
  '#6366f1', // Indigo
  '#f59e0b', // Amber
  '#f43f5e', // Rose
  '#8b5cf6', // Violet
  '#06b6d4', // Cyan
  '#ec4899', // Pink
];

/**
 * Standard text colors for chart elements
 */
export const TEXT_COLORS = {
  primary: '#111827',   // Slate 900 - For titles and strong values
  secondary: '#4b5563', // Slate 600 - For axis labels and descriptions
  muted: '#9ca3af',     // Slate 400 - For legends and subtle info
};

/**
 * Gradient colors for Gauge progress bars
 */
export const GAUGE_GRADIENT = {
  start: '#3b82f6',
  end: '#2563eb'
};

/**
 * Helper to get a color from the palette by index (loops if index > length)
 */
export const getColor = (index) => {
  return CHART_PALETTE[index % CHART_PALETTE.length];
};
