import { assetTypes } from "../../models/asset";
import { filtersSelectors, setFilters } from "../../store/assets";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function AssetsFilters({}: {}) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(filtersSelectors);

  return (
    <div className="buttons">
      <button
        className={`button ${!filters.type ? "is-primary" : ""}`}
        onClick={() => dispatch(setFilters({}))}
      >
        None
      </button>
      {assetTypes.map((assetType) => (
        <button
          className={`button ${filters.type === assetType ? "is-primary" : ""}`}
          key={assetType}
          onClick={() => dispatch(setFilters({ type: assetType }))}
        >
          {assetType}
        </button>
      ))}
    </div>
  );
}
