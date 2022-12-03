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
      <h2>Add new asset</h2>
      <form action="/api/assets/new" method="post">
        <label htmlFor="name">Asset</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="sector">Sector</label>
        <select name="sector" id="sector">
          {sectors.map((sector) => (
            <option value={sector}>{sector}</option>
          ))}
        </select>

        <label htmlFor="link">Link</label>
        <input type="text" id="link" name="link" />

        <label htmlFor="market">Market</label>
        <select name="market" id="market">
          {markets.map((market) => (
            <option value={market.id}>{market.attributes.name}</option>
          ))}
        </select>

        <button type="submit">Submit</button>
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
