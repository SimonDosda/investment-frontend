import Link from "next/link";
import { Asset } from "../models/asset";
import { getLastAnalysis, getOrderAggregate } from "../utils/asset";
import {
  getCurrentyParser,
  handleNull,
  parseBool,
  parsePercent,
} from "../utils/parsers";

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
            const currency = asset.attributes.market.data.attributes.currency;
            const parseCurrency = getCurrentyParser(currency);
            return (
              <tr key={asset.id}>
                <td>
                  <Link href={`/assets/${asset.id}`}>
                    {asset.attributes.name}
                  </Link>
                </td>
                <td>{asset.attributes.sector}</td>
                <td>{asset.attributes.market.data.attributes.name}</td>
                <td>{handleNull(analysis?.PER, parseCurrency)}</td>
                <td>{handleNull(analysis?.trend)}</td>
                <td>{handleNull(analysis?.dividendYield, parsePercent)}</td>
                <td>{handleNull(analysis?.aristocrat, parseBool)}</td>
                <td>{handleNull(analysis?.rate)}</td>
                <td>{handleNull(orderAgreggate?.current, parseCurrency)}</td>
                <td>{handleNull(orderAgreggate?.expected, parseCurrency)}</td>
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
