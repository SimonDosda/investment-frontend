import Link from "next/link";
import { fetchAPI } from "../../../lib/api/base";
import AnalysesTable from "../../../lib/components/analyses/AnalysesTable";
import AssetInfo from "../../../lib/components/AssetInfo";
import { Asset } from "../../../lib/models/asset";
import { withAuthSsr } from "../../../lib/utils/ssr";

interface Props {
  asset: Asset;
}

export default function Assets({ asset }: Props) {
  return (
    <>
      <AssetInfo asset={asset} />
      <Link
        href={`/assets/${asset.id}/analyses/new`}
        className="button is-link"
      >
        New Analysis
      </Link>
      <AnalysesTable asset={asset} />
    </>
  );
}

export const getServerSideProps = withAuthSsr<Props>(
  async ({ params, session }) => {
    if (!params) {
      return { notFound: true };
    }
    const { data } = await fetchAPI<Asset>(`assets/${params.id}`, {
      token: session.jwt,
      parameters: { populate: "*" },
    });
    return { props: { asset: data } };
  }
);
