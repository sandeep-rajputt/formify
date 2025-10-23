import { revalidatePath } from "next/cache";

/**
 * Revalidate form pages when forms are updated
 */
export function revalidateFormPages(formId: string) {
  try {
    // Revalidate the specific form page
    revalidatePath(`/f/${formId}`);

    // Optionally revalidate the forms listing page if you have one
    // revalidatePath('/forms');

    console.log(`Revalidated form page: /f/${formId}`);
  } catch (error) {
    console.error("Error revalidating form pages:", error);
  }
}

/**
 * Revalidate all form pages (use sparingly)
 */
export function revalidateAllFormPages() {
  try {
    // Revalidate all form pages
    revalidatePath("/f/[id]", "page");

    console.log("Revalidated all form pages");
  } catch (error) {
    console.error("Error revalidating all form pages:", error);
  }
}
