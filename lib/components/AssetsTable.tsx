import { useDispatch, useSelector } from "react-redux";
import {
  selectAssetsSlice as assetsSliceSelector,
  setSelectedAsset,
} from "../store/assets";
import { getLastAnalysis, getOrderAggregate } from "../utils/asset";
import {
  getCurrentyParser,
  handleNull,
  parseBool,
  parsePercent,
} from "../utils/parsers";

export default function AssetsTable({}: {}) {
  const dispatch = useDispatch();
  const { assets, selectedAsset } = useSelector(assetsSliceSelector);

  return (
    <div className="table-container">
      <table className="table is-hoverable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sector</th>
            <th>Market</th>
            <th>PER</th>
            <th>Trend</th>
            <th>Dividend</th>
            <th>Aristocrat</th>
            <th>Rate</th>
            <th>Bought</th>
            <th>Expected</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => {
            const analysis = getLastAnalysis(asset);
            const orderAgreggate = getOrderAggregate(asset);
            const currency = asset.attributes.market.data.attributes.currency;
            const parseCurrency = getCurrentyParser(currency);
            return (
              <tr
                key={asset.id}
                onClick={() => dispatch(setSelectedAsset(asset))}
                className={selectedAsset?.id === asset.id ? "is-selected" : ""}
              >
                <td>{asset.attributes.name}</td>
                <td>{asset.attributes.sector}</td>
                <td>{asset.attributes.market.data.attributes.name}</td>
                <td>{handleNull(analysis?.PER, parseCurrency)}</td>
                <td>{handleNull(analysis?.trend)}</td>
                <td>{handleNull(analysis?.dividendYield, parsePercent)}</td>
                <td>{handleNull(analysis?.aristocrat, parseBool)}</td>
                <td>{handleNull(analysis?.rate)}</td>
                <td>{handleNull(orderAgreggate?.current, parseCurrency)}</td>
                <td>{handleNull(orderAgreggate?.expected, parseCurrency)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
