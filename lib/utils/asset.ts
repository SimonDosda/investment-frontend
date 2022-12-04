import { Asset } from "../models/asset";

export const getLastAnalysis = (asset: Asset) => {
  const analyses = asset.attributes.analyses.data.map(({ attributes }) => ({
    ...attributes,
    createdAt: new Date(attributes.createdAt),
  }));
  const lastAnalysesTime = Math.max(
    ...analyses.map(({ createdAt }) => createdAt.getTime())
  );
  return analyses.find(
    ({ createdAt }) => createdAt.getTime() === lastAnalysesTime
  );
};
