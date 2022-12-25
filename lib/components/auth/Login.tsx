import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginInputs } from "../../models/auth";

export default function Login() {
  const { register, handleSubmit } = useForm<LoginInputs>();
  const router = useRouter();

  const onSubmit = async (data: LoginInputs) => {
    const result = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    if (result?.ok) {
      router.replace("/");
      return;
    }
    alert("Credential is not valid");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          {...register("email", { required: true })}
        />
      </div>
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
      <div className="field ">
        <div className="control">
          <button type="submit" className="button is-link">
            Sign In
          </button>
        </div>

        <p>
          Don't have an account yet? <Link href="/auth/register">Register</Link>
        </p>
        <p>
          Forgotten your password?{" "}
          <Link href="/auth/reset-password">Reset your password</Link>
        </p>
      </div>
    </form>
  );
}
