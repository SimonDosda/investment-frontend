import { StrapiData } from "./api";

interface BaseMarket {
  name: string;
  country: string;
  currency: string;
}

export type Market = StrapiData<BaseMarket>;

export const sectors = [
  "Industry",
  "Finance",
  "Tech",
  "Health",
  "Luxury",
  "Goods",
  "Automotive",
] as const;
