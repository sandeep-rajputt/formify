import { notFound } from "next/navigation";

export default function DashboardCatchAll() {
  // This will trigger the not-found.tsx in the dashboard directory
  notFound();
}
