export const assetTypes = ["Stock", "ETF", "Crypto", "Commodity"] as const;
export type AssetType = typeof assetTypes[number];

export interface Asset {
  id: number;
  symbol: string;
  name: string;
  asset_type: AssetType;
  exchange_id: number;
}
