import { GetServerSideProps } from "next";
import { fetchAPI } from "../../lib/api";
import AssetForm from "../../lib/components/AssetForm";
import { Market } from "../../lib/models/market";

interface Props {
  markets: Market[];
}

export default function NewAsset({ markets }: Props) {
  return (
    <section className="section">
      <div className="container is-max-desktop">
        <h2 className="title">Add new asset</h2>
        <AssetForm markets={markets} />
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data } = await fetchAPI<Market[]>(`markets`);

  return {
    props: { markets: data },
  };
};
