import NextAuth, { DefaultSession } from "next-auth";
import { User } from "../lib/models/auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & DefaultSession["user"];
    jwt: string;
    expires: DefaultSession["expires"];
  }
}
