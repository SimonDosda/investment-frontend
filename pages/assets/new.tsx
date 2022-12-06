import { GetServerSideProps } from "next";
import { fetchAPI } from "../../lib/api/base";
import AssetForm from "../../lib/components/AssetForm";
import { Market } from "../../lib/models/market";
import { withAuthSsr } from "../../lib/utils/ssr";

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

export const getServerSideProps = withAuthSsr<Props>(async ({ session }) => {
  const { data } = await fetchAPI<Market[]>(`markets`, { token: session.jwt });
  return { props: { markets: data } };
});
