import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAPI } from "../../lib/api/base";
import AssetForm from "../../lib/components/assets/AssetForm";
import AssetsFilters from "../../lib/components/assets/AssetsFilters";
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
        </div>
        <AssetsFilters />
        <AssetsTable />
      </section>
    </>
  );
}

// export const getServerSideProps = withAuthSsr<Props>(async ({ session }) => {
//   const { data } = await fetchAPI<Market[]>(`markets`, { token: session.jwt });
//   return { props: { markets: data } };
// });
