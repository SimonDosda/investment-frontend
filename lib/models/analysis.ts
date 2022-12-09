import { ParsedStapiAttributes, StrapiData } from "./api";

interface BaseAnalysis {
  value: number;
  PER: number;
  trend: Trend;
  dividendYield: number;
  aristocrat: boolean;
  rate: number;
}

export type Analysis = StrapiData<BaseAnalysis>;

export type AnalysisInputs = BaseAnalysis;

export type ParsedAnalysis = BaseAnalysis & ParsedStapiAttributes;

export const trends = ["rising", "stable", "declining"] as const;

export type Trend = typeof trends[number];
