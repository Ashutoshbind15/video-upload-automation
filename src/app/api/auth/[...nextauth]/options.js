import { connectDB } from "@/lib/db";
import Account from "@/models/Account";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        await connectDB();

        const { email, password } = credentials;
        const user = await User.findOne({ email: email });
        if (!user) return null;

        const plaintextPassword = password;
        const userSalt = user.salt;

        const hashedPassword = await bcrypt.hash(
          plaintextPassword,
          userSalt ?? ""
        );

        const isAuth = hashedPassword === user.password;

        if (!isAuth) return null;

        return {
          id: user._id,
        };
      },
    }),
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
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Enhanced jwt callback
    jwt: async ({ token, user, account }) => {
      console.log("jtoken", token);
      console.log("juser", user);
      console.log("jaccount", account);

      if (account && account.provider !== "credentials") {
        const appAccount = await Account.findOne({
          provider: account.provider,
          accountId: account.providerAccountId,
        });

        console.log(appAccount, "appAccount");

        if (appAccount) {
          token.user = { id: appAccount.userId };
        }
      } else if (user) {
        token.user = user;
      }
      return token;
    },
    // Enhanced session callback
    session: async ({ session, token }) => {
      console.log("stoken", token);
      session.user = token.user;
      return session;
    },
    signIn: async (params) => {
      const { account, user } = params;
      const currSession = await getServerSession(authOptions);

      console.log("csess", currSession);
      console.log("cacc", account);
      console.log("cuser", user);

      // disallow to sign in with social accounts
      if (!currSession && account.provider !== "credentials") {
        return false;
      }

      // check if user is already signed in with credentials
      if (currSession && account.provider === "credentials") {
        return false;
      }

      if (currSession) {
        console.log("signed in with credentials");
        // means that user is already signed in with credentials

        await connectDB();

        if (account.provider !== "credentials") {
          // user wants to link app account or to refresh token
          // check if app account is already linked

          const appAccount = await Account.findOne({
            provider: account.provider,
            userId: currSession.user.id,
            accountId: account.providerAccountId,
          });

          if (appAccount) {
            const newAccessToken = account.access_token;
            const newRefreshToken = account.refresh_token;

            appAccount.accessToken = newAccessToken;
            appAccount.refreshToken = newRefreshToken;

            appAccount.accountEmail = user.email;
            appAccount.accountImage = user.image;

            await User.findByIdAndUpdate(currSession.user.id, {
              lastModifiedAccount: appAccount._id,
            });

            await appAccount.save();
          } else {
            const acc = await Account.create({
              provider: account.provider,
              userId: currSession.user.id,
              accessToken: account.access_token,
              refreshToken: account.refresh_token,
              accountId: account.providerAccountId,
              accountEmail: user.email,
              accountImage: user.image,
            });

            const dbUser = await User.findById(currSession.user.id);
            dbUser.accounts.push(acc._id);
            dbUser.lastModifiedAccount = acc._id;

            await dbUser.save();
          }
        }
      }

      return true;
    },
  },
};
