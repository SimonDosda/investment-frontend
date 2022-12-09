import { Analysis } from "./analysis";
import { StrapiData, StrapiResponse } from "./api";
import { Market } from "./market";
import { Order } from "./order";

interface BaseAsset {
  name: string;
  sector: string;
  link: string;
  market: StrapiResponse<Market>;
  analyses: StrapiResponse<Analysis[]>;
  orders: StrapiResponse<Order[]>;
}

export type Asset = StrapiData<BaseAsset>;

export type AssetInputs = Omit<BaseAsset, "analysis" | "orders">;
