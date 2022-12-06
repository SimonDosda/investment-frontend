import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (result.ok) {
      router.replace("/");
      return;
    }
    alert("Credential is not valid");
  };

  return (
    <div>
      <h2 className="title">Sign In</h2>
      <form onSubmit={onSubmit}>
        <div className="field">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            id="email"
            name="email"
            type="email"
            required
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
        <div className="field ">
          <div className="control">
            <button type="submit" className="button is-link">
              Sign In
            </button>
          </div>

          <p>
            Don't have an account yet?{" "}
            <Link href="/auth/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
