import z from "zod";
import { sidebarSchema } from "@/schema/dashboardSidebar";

export type DashboardSidebarSlice = z.infer<typeof sidebarSchema>;
