import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getServerSessionUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export default getServerSessionUser;
