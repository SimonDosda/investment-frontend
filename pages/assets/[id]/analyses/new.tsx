import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { fetchAPI } from "../../../../lib/api/base";
import AnalysisForm from "../../../../lib/components/AnalysisForm";
import AssetAnalyses from "../../../../lib/components/AssetAnalyses";
import AssetInfo from "../../../../lib/components/AssetInfo";
import { Asset } from "../../../../lib/models/asset";
import { getLastAnalysis } from "../../../../lib/utils/asset";
import { withAuthSsr } from "../../../../lib/utils/ssr";

interface Props {
  asset: Asset;
}

export default function Assets({ asset }: Props) {
  const lastAnalysis = getLastAnalysis(asset);
  return (
    <>
      <AssetInfo asset={asset} />
      <section className="section">
        <AnalysisForm analysis={lastAnalysis} />
      </section>
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
