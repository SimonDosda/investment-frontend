import Link from "next/link";
import { Asset } from "../models/asset";

export default function AssetAnalyses({ asset }: { asset: Asset }) {
  const analyses = asset.attributes.analyses.data.map(({ attributes }) => ({
    ...attributes,
    createdAt: new Date(attributes.createdAt),
  }));
  return (
    <section className="section">
      <div className="level">
        <h2 className="title">Analysis</h2>
        <Link
          href={`/assets/${asset.id}/analyses/new`}
          className="button is-link"
        >
          New Analysis
        </Link>
      </div>
      {analyses.map((analysis) => (
        <div>
          <div>{analysis.PER}</div>
          <div>{analysis.dividendYield}</div>
        </div>
      ))}
    </section>
  );
}
