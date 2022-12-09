import Link from "next/link";
import { useState } from "react";
import { Asset } from "../models/asset";
import { getLastAnalysis, getOrderAggregate } from "../utils/asset";

export default function AssetsTable({ assets }: { assets: Asset[] }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sector</th>
            <th>Market</th>
            <th>PER</th>
            <th>Trend</th>
            <th>Dividend</th>
            <th>Aristocrat</th>
            <th>Rate</th>
            <th>Bought</th>
            <th>Expected</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => {
            const analysis = getLastAnalysis(asset);
            const orderAgreggate = getOrderAggregate(asset);
            return (
              <tr key={asset.id}>
                <td>
                  <Link href={`/assets/${asset.id}`}>
                    {asset.attributes.name}
                  </Link>
                </td>
                <td>{asset.attributes.sector}</td>
                <td>{asset.attributes.market.data.attributes.name}</td>
                <td>{analysis?.PER || "-"}</td>
                <td>{analysis?.trend || "-"}</td>
                <td>{analysis?.dividendYield || "-"}</td>
                <td>{analysis?.aristocrat ? "Y" : "N"}</td>
                <td>{analysis?.rate || "-"}</td>
                <td>{orderAgreggate.current || "-"}</td>
                <td>{orderAgreggate.expected || "-"}</td>
                <td>
                  {asset.attributes.link && (
                    <Link
                      href={asset.attributes.link}
                      className="button is-link"
                      target="_blank"
                    >
                      See Details
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
