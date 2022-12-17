import { useForm } from "react-hook-form";
import { addAsset } from "../../api/assets";
import { AssetInputs } from "../../models/asset";
import { Market, sectors } from "../../models/market";
import { AddNewAsset } from "../../store/assets";
import { useAppDispatch } from "../../store/hooks";

export default function AssetForm({
  markets,
  close,
}: {
  markets: Market[];
  close?: () => void;
}) {
  const { register, handleSubmit } = useForm<AssetInputs>();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: AssetInputs) => {
    await dispatch(AddNewAsset(data)).unwrap();
    if (close) {
      close();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label" htmlFor="name">
          Asset
        </label>
        <input
          className="input"
          type="text"
          {...register("name", { required: true })}
        />
      </div>

      <div className="field">
        <label className="label" htmlFor="market">
          Market
        </label>
        <div className="select is-fullwidth">
          <select {...register("market")}>
            {markets.map((market) => (
              <option value={market.id} key={market.id}>
                {market.attributes.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="sector">
          Sector
        </label>
        <div className="select is-fullwidth">
          <select {...register("sector")}>
            {sectors.map((sector) => (
              <option value={sector} key={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="link">
          Link
        </label>
        <input className="input" type="text" {...register("link")} />
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
        {close && (
          <div className="control">
            <button
              type="button"
              className="button is-link is-light"
              onClick={close}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
