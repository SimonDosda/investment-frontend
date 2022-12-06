import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";

export function withAuthSsr<P>(
  handler: (
    context: GetServerSidePropsContext & { session: Session }
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return async function withAuthSsrWrapper(context: GetServerSidePropsContext) {
    const session = await getSession(context);

    // Check if session exists or not, if not, redirect
    if (session == null) {
      return {
        redirect: { destination: "/auth/sign-in", permanent: true },
      };
    }

    return handler({ ...context, session });
  };
}
