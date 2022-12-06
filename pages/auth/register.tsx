import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { register } from "../../lib/api/auth";

export default function SignIn() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await register({
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (!result.error) {
      router.replace("/");
      return;
    }
    alert("Error while trying to register a new user");
  };

  return (
    <div>
      <h2 className="title">Register</h2>
      <form onSubmit={onSubmit}>
        <div className="field">
          <label className="label" htmlFor="username">
            Username
          </label>
          <input className="input" id="username" name="username" required />
        </div>
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
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-link">
              Register
            </button>
          </div>

          <p>
            Already have an account? <Link href="/auth/sign-in">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
