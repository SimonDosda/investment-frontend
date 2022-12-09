import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Asset, AssetInputs } from "../models/asset";
import { Market, sectors } from "../models/market";

export default function AssetForm({ markets }: { markets: Market[] }) {
  const { register, handleSubmit } = useForm<AssetInputs>();
  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit = async (data: AssetInputs) => {
    const result = await fetch("/api/assets/new", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { authorization: session?.jwt || "" },
    });
    if (result.ok) {
      router.push("/assets");
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
        <div className="control">
          <Link href="/assets" className="button is-link is-light">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
