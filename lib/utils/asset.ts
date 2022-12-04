import { ParsedAnalysis } from "../models/analysis";
import { Asset } from "../models/asset";
import { OrderAggregate } from "../models/order";
import { parseStrapiAttributes } from "./api";

export const getLastAnalysis = (asset: Asset): ParsedAnalysis | null => {
  const analyses: ParsedAnalysis[] = asset.attributes.analyses.data.map(
    ({ attributes }) => ({
      ...attributes,
      ...parseStrapiAttributes(attributes),
    })
  );
  const lastAnalysesTime = Math.max(
    ...analyses.map(({ createdAt }) => createdAt.getTime())
  );
  return (
    analyses.find(
      ({ createdAt }) => createdAt.getTime() === lastAnalysesTime
    ) || null
  );
};

export const getOrderAggregate = (asset: Asset): OrderAggregate => {
  return asset.attributes.orders.data.reduce(
    (aggregate: OrderAggregate, { attributes }): OrderAggregate => ({
      current:
        aggregate.current +
        attributes.count * attributes.price * (attributes.createdAt ? 1 : 0),
      expected: aggregate.expected + attributes.count * attributes.price,
    }),
    { current: 0, expected: 0 }
  );
};
