export type RetailPositioning = {
  label: string;
  value: number;
  interpretation: string;
  trend: "bullish" | "bearish" | "neutral";
};

export const retailPositioning: RetailPositioning = {
  label: "Non-Reportable",
  value: 63,
  interpretation: "Retail participants remain net long.",
  trend: "bullish",
};

export function generateRetailNarrative(value: number): string {
  if (value > 60) return "Retail crowd heavily long. Potential contrarian risk.";
  if (value < 40) return "Retail defensive. Positioning compressed.";
  return "Balanced participation.";
}

// Future-ready COT shape for real API integration
export type CotSnapshot = {
  commercial: number;
  nonCommercial: number;
  nonReportable: number;
  openInterest: number;
  netChange: number;
};