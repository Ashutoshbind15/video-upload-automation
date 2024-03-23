import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope:
            "openid https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
    }),
  ],
  callbacks: {
    // Enhanced jwt callback
    async jwt({ token, user, account, profile, isNewUser }) {
      // Conditionally add account details to token

      if (account?.provider) {
        console.log(account);
        token.accessToken = account.access_token;
        token.provider = account.provider;

        // Example: Attach user information if available
        if (user) {
          token.user = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }
      }
      return token;
    },
    // Enhanced session callback
    async session({ session, token }) {
      // Pass accessToken to the session
      if (token) {
        session.accessToken = token?.accessToken;

        // Example: Attach user information to session if available
        if (token.user) {
          session.user = token.user;
        }
      }

      return session;
    },
  },
};
