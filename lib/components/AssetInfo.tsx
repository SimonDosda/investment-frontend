import { Asset } from "../models/asset";

export default function AssetInfo({ asset }: { asset: Asset }) {
  const market = asset.attributes.market.data.attributes;
  return (
    <section>
      <h2 className="title">{asset.attributes.name}</h2>
      <h3 className="subtitle">{asset.attributes.sector}</h3>
      <div>
        Market: {market.name} ({market.country})
      </div>
    </section>
  );
}
