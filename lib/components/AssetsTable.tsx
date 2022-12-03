import Link from "next/link";
import { useState } from "react";
import { Asset } from "../models/asset";

export default function AssetsTable({ assets }: { assets: Asset[] }) {
  const [selectedAsset, selectAsset] = useState<Asset | null>(null);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sector</th>
            <th>Market</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr
              key={asset.id}
              onClick={() => selectAsset(asset)}
              className={`${
                selectedAsset?.id === asset.id ? "is-selected" : ""
              }`}
            >
              <td>{asset.attributes.name}</td>
              <td>{asset.attributes.sector}</td>
              <td>{asset.attributes.market.data.attributes.name}</td>
              <td>
                <Link
                  href={asset.attributes.link}
                  className="button is-link"
                  target="_blank"
                >
                  See Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
