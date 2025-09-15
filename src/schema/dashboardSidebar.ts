import z from "zod";

export const sidebarSchema = z.object({
  isOpen: z.boolean().default(false),
});
