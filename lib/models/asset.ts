import { Analysis } from "./analysis";
import { StrapiData, StrapiResponse } from "./api";
import { Market } from "./market";

interface BaseAsset {
  name: string;
  sector: string;
  link: string;
  market: StrapiResponse<Market>;
  analyses: StrapiResponse<Analysis[]>;
}

export type Asset = StrapiData<BaseAsset>;
