import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useSessionUpdate() {
  const { data: session, update, status } = useSession();
  const router = useRouter();

  const updateSession = async (newData: { name?: string; image?: string }) => {
    try {
      await update(newData);

      router.refresh();

      await new Promise((resolve) => setTimeout(resolve, 200));

      return true;
    } catch (error) {
      console.error("Session update failed:", error);
      return false;
    }
  };

  return {
    session,
    updateSession,
    isLoading: status === "loading",
  };
}
