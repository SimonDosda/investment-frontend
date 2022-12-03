import { GetServerSideProps } from "next";
import Link from "next/link";
import { fetchAPI } from "../../lib/api";
import { StrapiData } from "../../lib/models/api";
import { Asset } from "../../lib/models/asset";
import { Market, sectors } from "../../lib/models/market";

interface Props {
  markets: StrapiData<Market>[];
}

export default function NewAsset({ markets }: Props) {
  return (
    <div>
      <h2 className="title">Add new asset</h2>
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
          <div className="select">
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
          <div className="select">
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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data } = await fetchAPI<StrapiData<Market>[]>(`markets`);

  return {
    props: { markets: data },
  };
};
