import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendResetPasswordLink } from "../../api/auth";
import { ForgotPasswordInputs } from "../../models/auth";

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm<ForgotPasswordInputs>();
  const [email, setEmail] = useState("");

  const onSubmit = async (data: ForgotPasswordInputs) => {
    const sent = await sendResetPasswordLink(data);
    if (sent) {
      setEmail(data.email);
    }
    alert("Something went wrong");
  };

  if (email) {
    return <p>A reset link has been sent to {email}</p>;
  }

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
      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Send Reset Link
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
