import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { fetchAPI } from "../../../lib/api";
import AssetAnalyses from "../../../lib/components/AssetAnalyses";
import AssetInfo from "../../../lib/components/AssetInfo";
import { Asset } from "../../../lib/models/asset";

interface Props {
  asset: Asset;
}

export default function Assets({ asset }: Props) {
  return (
    <>
      <AssetInfo asset={asset} />
      <AssetAnalyses asset={asset} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: number } & ParsedUrlQuery
> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }
  const { data } = await fetchAPI<Asset>(`assets/${params.id}`, {
    populate: "*",
  });
  return {
    props: { asset: data },
  };
};
