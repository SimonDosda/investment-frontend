import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import Loading from "../layout/Loading";

export default function Auth({ children }: { children: ReactNode }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <Loading />;
  }

  return <>{children}</>;
}
