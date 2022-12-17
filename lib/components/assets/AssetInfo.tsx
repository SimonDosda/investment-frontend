import Link from "next/link";
import { Asset } from "../../models/asset";

export default function AssetInfo({ asset }: { asset: Asset }) {
  const market = asset.attributes.market.data.attributes;
  return (
    <section>
      <div className="level">
        <div>
          <h2 className="title">{asset.attributes.name}</h2>
          <h3 className="subtitle">
            {asset.attributes.sector} - {market.name} ({market.country})
          </h3>
        </div>
        <Link
          className="button is-link"
          href={asset.attributes.link}
          target="_blank"
        >
          See Details
        </Link>
      </div>
    </section>
  );
}
