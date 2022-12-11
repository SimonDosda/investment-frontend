import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AnalysisInputs, ParsedAnalysis, trends } from "../models/analysis";
import { Asset } from "../models/asset";

export default function AnalysisForm({
  asset,
  analysis,
}: {
  asset: Asset;
  analysis: ParsedAnalysis | null;
}) {
  const { register, handleSubmit } = useForm<AnalysisInputs>({
    defaultValues: {
      value: analysis?.value || 0,
      PER: analysis?.PER || 0,
      trend: analysis?.trend || "stable",
      dividendYield: analysis?.dividendYield || 0,
      aristocrat: analysis?.aristocrat || false,
      rate: analysis?.rate || 5,
    },
  });
  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit = async (data: AnalysisInputs) => {
    const result = await fetch("/api/analysis/new", {
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
        <label className="label" htmlFor="value">
          Value
        </label>
        <input className="input" type="number" {...register("value")} />
      </div>

      <div className="field">
        <label className="label" htmlFor="PER">
          PER
        </label>
        <input className="input" type="number" {...register("PER")} />
      </div>

      <div className="field">
        <label className="label" htmlFor="trend">
          Trend
        </label>
        <div className="select is-fullwidth">
          <select {...register("trend")}>
            {trends.map((trend) => (
              <option value={trend} key={trend}>
                {trend}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="dividendYield">
          Dividend Yield
        </label>
        <input className="input" type="number" {...register("dividendYield")} />
      </div>

      <div className="field">
        <label className="checkbox">
          <input type="checkbox" {...register("aristocrat")} />
          Aristocrat
        </label>
      </div>

      <div className="field">
        <label className="label" htmlFor="rate">
          Rate
        </label>
        <input
          className="input"
          type="number"
          {...register("rate", { min: 0, max: 10 })}
        />
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
