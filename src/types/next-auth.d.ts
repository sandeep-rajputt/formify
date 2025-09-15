import { JWT } from "next-auth/jwt";

type UserRole = "user" | "admin" | "owner";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      dashboard: string;
      name: string;
      email: string;
      image: string;
      role: UserRole;
    };
  }

  interface User {
    id: string;
    dashboard: string;
    name: string;
    email: string;
    image: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    dashboard: string;
    name: string;
    email: string;
    image: string;
    role: UserRole;
  }
}
