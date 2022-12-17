import Link from "next/link";
import AssetsTable from "../../lib/components/AssetsTable";
import { loadAssets } from "../../lib/store/assets";
import { useAppDispatch } from "../../lib/store/hooks";

export default function Assets() {
  const dispatch = useAppDispatch();
  dispatch(loadAssets());
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

Assets.auth = true;
