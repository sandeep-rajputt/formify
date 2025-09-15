import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";
import User from "@/models/User.model";
import { User as NextAuthUser, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import generateUniqueId from "@/utils/generateUniqueId";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async signIn({ user }: { user: NextAuthUser }) {
      try {
        await connectDB();
        const firstName = user.name?.split(" ")[0].toLowerCase() || "user";
        const dashboardId = `${firstName}-${generateUniqueId()}`;

        // check dashboard id not for other user
        let isUniqueDashboardId = false;
        let finalDashboardId = dashboardId;

        while (!isUniqueDashboardId) {
          const existingUserWithDashboardId = await User.findOne({
            dashboard: finalDashboardId,
          });
          if (!existingUserWithDashboardId) {
            isUniqueDashboardId = true;
          } else {
            finalDashboardId = `${firstName}-${generateUniqueId()}`;
          }
        }

        // 🔎 Check if user already exists
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // 🆕 Create new user with required defaults
          await User.create({
            dashboard: finalDashboardId,
            name: user.name || "Unknown",
            email: user.email,
            image: user.image || "/user.svg",
            role: "user",
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.dashboard = dbUser.dashboard;
          token.role = dbUser.role;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.image = dbUser.image;
        }
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.dashboard = token.dashboard;
        session.user.name = token.name || "Unknown";
        session.user.email = token.email!;
        session.user.image = token.image || "/user.svg";
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    newUser: "/dashboard",
    signIn: "/login",
    signUp: "/register",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
