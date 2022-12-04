import Link from "next/link";
import { ParsedAnalysis, trends } from "../models/analysis";
import { sectors } from "../models/market";

export default function AnalysisForm({
  analysis,
}: {
  analysis: ParsedAnalysis | null;
}) {
  return (
    <form action="/api/analysis/new" method="post">
      <div className="field">
        <label className="label" htmlFor="value">
          Value
        </label>
        <input
          className="input"
          type="number"
          id="value"
          name="value"
          defaultValue={analysis?.value}
        />
      </div>

      <div className="field">
        <label className="label" htmlFor="PER">
          PER
        </label>
        <input
          className="input"
          type="number"
          id="PER"
          name="PER"
          defaultValue={analysis?.PER}
        />
      </div>

      <div className="field">
        <label className="label" htmlFor="trend">
          Trend
        </label>
        <div className="select is-fullwidth">
          <select name="trend" id="trend" defaultValue={analysis?.trend}>
            {trends.map((trend) => (
              <option value={trend} key={trend}>
                {trend}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="dividendYield">
          Dividend Yield
        </label>
        <input
          className="input"
          type="number"
          id="dividendYield"
          name="dividendYield"
          defaultValue={analysis?.dividendYield}
        />
      </div>

      <div className="field">
        <label className="checkbox">
          <input
            type="checkbox"
            id="aristocrat"
            name="aristocrat"
            checked={analysis?.aristocrat || false}
          />
          Aristocrat
        </label>
      </div>

      <div className="field">
        <label className="label" htmlFor="rate">
          Rate
        </label>
        <input
          className="input"
          type="number"
          id="rate"
          name="rate"
          min={0}
          max={10}
          defaultValue={analysis?.rate}
        />
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
        <div className="control">
          <Link href="/assets" className="button is-link is-light">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
