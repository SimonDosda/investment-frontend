import Link from "next/link";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../lib/api/base";
import AssetsTable from "../../lib/components/AssetsTable";
import { Asset } from "../../lib/models/asset";
import { setAssets } from "../../lib/store/assets";
import { withAuthSsr } from "../../lib/utils/ssr";

interface Props {
  assets: Asset[];
}

export default function Assets({ assets }: Props) {
  const dispatch = useDispatch();
  dispatch(setAssets(assets));
  return (
    <section className="section">
      <div className="level">
        <h2 className="title">Assets</h2>
        <Link href="assets/new" className="button is-link">
          New Asset
        </Link>
      </div>
      <AssetsTable />
    </section>
  );
}

export const getServerSideProps = withAuthSsr<Props>(async ({ session }) => {
  const { data } = await fetchAPI<Asset[]>(`assets`, {
    token: session.jwt,
    parameters: { populate: "*" },
  });
  return { props: { assets: data } };
});
