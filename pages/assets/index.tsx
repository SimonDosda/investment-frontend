import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAPI } from "../../lib/api/base";
import AssetForm from "../../lib/components/assets/AssetForm";
import AssetsTable from "../../lib/components/assets/AssetsTable";
import Loading from "../../lib/components/layout/Loading";
import { Market } from "../../lib/models/market";
import { assetsSliceSelector, fetchAssets } from "../../lib/store/assets";
import { useAppDispatch } from "../../lib/store/hooks";
import { withAuthSsr } from "../../lib/utils/ssr";

interface Props {
  markets: Market[];
}

export default function Assets({ markets }: Props) {
  const [addingAsset, showAddAsset] = useState(false);
  const dispatch = useAppDispatch();
  const { status } = useSelector(assetsSliceSelector);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAssets());
    }
  }, []);
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <>
      <section className="section">
        <div className="level">
          <h2 className="title">Assets</h2>
          <button
            className="button is-link"
            onClick={() => showAddAsset(!addingAsset)}
          >
            New Asset
          </button>
        </div>
        <AssetsTable />
      </section>
      {addingAsset && (
        <section className="section">
          <div className="container is-max-desktop">
            <h2 className="title">Add new asset</h2>
            <AssetForm markets={markets} close={() => showAddAsset(false)} />
          </div>
        </section>
      )}
    </>
  );
}

export const getServerSideProps = withAuthSsr<Props>(async ({ session }) => {
  const { data } = await fetchAPI<Market[]>(`markets`, { token: session.jwt });
  return { props: { markets: data } };
});
