import { GetServerSideProps } from "next";
import Link from "next/link";
import { fetchAPI } from "../../lib/api";
import AssetsTable from "../../lib/components/AssetsTable";
import { Asset } from "../../lib/models/asset";

interface Props {
  assets: Asset[];
}

export default function Assets({ assets }: Props) {
  return (
    <section className="section">
      <div className="level">
        <h2 className="title">Assets</h2>
        <Link href="assets/new" className="button is-link">
          New Asset
        </Link>
      </div>
      <AssetsTable assets={assets} />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data } = await fetchAPI<Asset[]>(`assets`, {
    populate: "*",
  });
  return {
    props: { assets: data },
  };
};
