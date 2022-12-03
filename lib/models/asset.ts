import { StrapiData, StrapiResponse } from "./api";
import { Market } from "./market";

interface BaseAsset {
  name: string;
  sector: string;
  link: string;
  market: StrapiResponse<Market>;
}

export type Asset = StrapiData<BaseAsset>;
