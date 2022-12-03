import Link from "next/link";
import { Market, sectors } from "../models/market";

export default function AssetForm({ markets }: { markets: Market[] }) {
  return (
    <form action="/api/assets/new" method="post">
      <div className="field">
        <label className="label" htmlFor="name">
          Asset
        </label>
        <input className="input" type="text" id="name" name="name" />
      </div>

      <div className="field">
        <label className="label" htmlFor="market">
          Market
        </label>
        <div className="select is-fullwidth">
          <select name="market" id="market">
            {markets.map((market) => (
              <option value={market.id} key={market.id}>
                {market.attributes.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="sector">
          Sector
        </label>
        <div className="select is-fullwidth">
          <select name="sector" id="sector">
            {sectors.map((sector) => (
              <option value={sector} key={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="link">
          Link
        </label>
        <input className="input" type="text" id="link" name="link" />
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
