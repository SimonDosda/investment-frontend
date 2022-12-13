import { useRouter } from "next/router";
import ForgotPassword from "../../lib/components/auth/ForgotPassword";
import ResetPassword from "../../lib/components/auth/ResetPassword";

export default function SignIn() {
  const router = useRouter();
  const { code } = router.query;

  return (
    <div>
      <h2 className="title">Reset your password</h2>
      {code ? <ResetPassword code={code as string} /> : <ForgotPassword />}
    </div>
  );
}
