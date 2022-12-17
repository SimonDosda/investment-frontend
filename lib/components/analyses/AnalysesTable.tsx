import { Asset } from "../../models/asset";
import {
  getCurrentyParser,
  parseBool,
  parseDate,
  parsePercent,
} from "../../utils/parsers";

export default function AnalysesTable({ asset }: { asset: Asset }) {
  const analyses = asset.attributes.analyses.data
    .map(({ id, attributes }) => ({ ...attributes, id }))
    .sort(
      (a1, a2) =>
        new Date(a1.createdAt).getTime() - new Date(a2.createdAt).getTime()
    );
  const currency = asset.attributes.market.data.attributes.currency;
  const parseCurrency = getCurrentyParser(currency);
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            {analyses.map((analysis) => (
              <th key={analysis.id}>
                {parseDate(new Date(analysis.createdAt))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Value</td>
            {analyses.map((analysis) => (
              <td key={analysis.id}>{parseCurrency(analysis.value)}</td>
            ))}
          </tr>
          <tr>
            <td>PER</td>
            {analyses.map((analysis) => (
              <td key={analysis.id}>{parseCurrency(analysis.PER, currency)}</td>
            ))}
          </tr>
          <tr>
            <td>Dividend</td>
            {analyses.map((analysis) => (
              <td key={analysis.id}>{parsePercent(analysis.dividendYield)}</td>
            ))}
          </tr>
          <tr>
            <td>Trend</td>
            {analyses.map((analysis) => (
              <td key={analysis.id}>{analysis.trend}</td>
            ))}
          </tr>
          <tr>
            <td>Aristocrat</td>
            {analyses.map((analysis) => (
              <td key={analysis.id}>{parseBool(analysis.aristocrat)}</td>
            ))}
          </tr>
          <tr>
            <td>Rate</td>
            {analyses.map((analysis) => (
              <td key={analysis.id}>{analysis.rate}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
