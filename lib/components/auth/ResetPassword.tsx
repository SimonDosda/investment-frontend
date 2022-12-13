import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ResetPasswordInputs } from "../../models/auth";

export default function ResetPassword({
  code,
}: Pick<ResetPasswordInputs, "code">) {
  const { register, handleSubmit } = useForm<ResetPasswordInputs>({
    defaultValues: { code },
  });
  const router = useRouter();

  const onSubmit = async (data: ResetPasswordInputs) => {
    const result = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (result.ok) {
      router.push("/auth/sign-in");
    }
    alert("Something went wrong");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("code")} />
      <div className="field">
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          {...register("password", { required: true })}
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="passwordConfirmation">
          Password confirmation
        </label>
        <input
          className="input"
          type="password"
          {...register("passwordConfirmation", { required: true })}
        />
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Update Password
          </button>
        </div>

        <div className="control">
          <Link href="/auth/sign-in" className="button is-link is-light">
            Back
          </Link>
        </div>
      </div>
    </form>
  );
}
