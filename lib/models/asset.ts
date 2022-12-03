import { StrapiData, StrapiResponse } from "./api";
import { Market } from "./market";

export interface Asset {
  name: string;
  sector: string;
  link: string;
  market: StrapiResponse<StrapiData<Market>>;
}
