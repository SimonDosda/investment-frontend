import { StrapiData } from "./api";

interface BaseOrder {
  count: number;
  price: number;
  executionDate: Date | null;
}

export type Order = StrapiData<BaseOrder>;
