import { Session } from "inspector";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "../../../lib/api/auth";

export default NextAuth({
  pages: {
    signIn: "/auth/sign-in",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (!credentials) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        try {
          const { token, refresh_token, user } = await signIn({
            email: credentials.email,
            password: credentials.password,
          });
          return { token, refresh_token, ...user };
        } catch (error) {
          // Sign In Fail
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.id = token.id;
      session.token = token.token;
      session.refresh_token = token.refresh_token;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.refresh_token = user.refresh_token;
      }
      return Promise.resolve(token);
    },
  },
});
