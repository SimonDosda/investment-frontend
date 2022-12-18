import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { registerUser } from "../../api/auth";
import { RegiserUserInputs, ResetPasswordInputs } from "../../models/auth";

export default function RegisterUser() {
  const { register, handleSubmit } = useForm<RegiserUserInputs>();
  const router = useRouter();

  const onSubmit = async (data: RegiserUserInputs) => {
    const result = await registerUser(data);
    if (result.user) {
      router.push("/auth/sign-in");
    }
    alert("Something went wrong");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label" htmlFor="name">
          Name
        </label>
        <input className="input" {...register("name", { required: true })} />
      </div>
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
      <div className="field ">
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
  );
}
