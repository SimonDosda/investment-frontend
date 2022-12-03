export interface Market {
  name: string;
  country: string;
  currency: string;
}

export const sectors = [
  "Industry",
  "Finance",
  "Tech",
  "Health",
  "Luxury",
  "Goods",
  "Automotive",
] as const;
