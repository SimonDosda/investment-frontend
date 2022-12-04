import { StrapiData } from "./api";

interface BaseAnalysis {
  PER: number;
  trend: Trend;
  dividendYiel: number;
  aristocrat: boolean;
  rate: number;
}

export type Analysis = StrapiData<BaseAnalysis>;

export const trends = ["rising", "stable", "declining"] as const;

export type Trend = typeof trends[number];
