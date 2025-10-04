"use client";
import FormContainer from "@/app/dashboard/[dashboard]/forms/new/_components/Form/FormContainer";
import TivoraContainer from "@/app/dashboard/[dashboard]/forms/new/_components/Tivora/TivoraContainer";

function NewFormPageStructure() {
  return (
    <div className="grid md:grid-cols-[1fr_320px] grid-cols-1 gap-5">
      <FormContainer />
      <div className="md:flex hidden">
        <TivoraContainer />
      </div>
    </div>
  );
}
export default NewFormPageStructure;
