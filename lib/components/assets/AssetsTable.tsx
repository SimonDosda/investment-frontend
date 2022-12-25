import {
  assetsSliceSelector,
  filteredAssetsSelector,
  setSelectedId,
} from "../../store/assets";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function AssetsTable({}: {}) {
  const dispatch = useAppDispatch();
  const assets = useAppSelector(filteredAssetsSelector);
  const { selectedId } = useAppSelector(assetsSliceSelector);

  return (
    <div className="table-container">
      <table className="table is-hoverable">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => {
            return (
              <tr
                key={asset.id}
                onClick={() => dispatch(setSelectedId(asset.id))}
                className={selectedId === asset.id ? "is-selected" : ""}
              >
                <td>{asset.symbol}</td>
                <td>{asset.name}</td>
                <td>{asset.asset_type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
