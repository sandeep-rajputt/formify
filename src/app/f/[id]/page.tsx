import ClientFormPage from "./ClientFormPage";
import connectDB from "@/lib/db";
import { Form } from "@/models/Form.model";
import { notFound } from "next/navigation";
import { serializeForm } from "@/utils/serializeForm";

export async function generateStaticParams() {
  return [];
}

// This runs at build time for each form
async function FormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await connectDB();

    // Fetch directly from database for better performance
    const form = await Form.findOne({
      formId: id,
      status: "published",
    }).lean();

    if (!form) {
      notFound();
    }

    // Convert MongoDB document to plain object for Client Component
    const formData = serializeForm(form);

    return (
      <div>
        <ClientFormPage data={formData} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching form:", error);
    notFound();
  }
}

export default FormPage;
