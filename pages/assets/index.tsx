import { GetServerSideProps } from "next";
import Link from "next/link";
import { fetchAPI } from "../../lib/api";
import { StrapiData } from "../../lib/models/api";
import { Asset } from "../../lib/models/asset";

interface Props {
  assets: StrapiData<Asset>[];
}

export default function Assets({ assets }: Props) {
  return (
    <div>
      <h2>Assets</h2>
      <Link href="assets/new">New Asset</Link>
      {assets.map(({ id, attributes }) => (
        <div key={id}>
          {attributes.name} - {attributes.sector} -
          {attributes.market.data.attributes.country}
          <Link href={attributes.link} target="_blank">
            See Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data } = await fetchAPI<StrapiData<Asset>[]>(`assets`, {
    populate: "*",
  });

  return {
    props: { assets: data },
  };
};
