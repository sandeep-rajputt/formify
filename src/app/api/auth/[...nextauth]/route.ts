import NextAuth from "next-auth/next"; // ✅ App Router compatible
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";
import User from "@/models/User.model";
import { User as NextAuthUser, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import generateUniqueId from "@/utils/generateUniqueId";

interface SessionUpdateData {
  name?: string;
  image?: string;
}

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
        let finalDashboardId = `${firstName}-${generateUniqueId()}`;

        // ensure dashboard id is unique
        while (await User.findOne({ dashboard: finalDashboardId })) {
          finalDashboardId = `${firstName}-${generateUniqueId()}`;
        }

        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
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

    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: NextAuthUser;
      trigger?: string;
      session?: SessionUpdateData;
    }) {
      // Handle profile updates triggered by update() call
      if (trigger === "update" && session) {
        // Update token with new session data
        if (session.name) token.name = session.name;
        if (session.image) token.image = session.image;
        return token;
      }

      // Handle initial sign in - fetch user data from database
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
