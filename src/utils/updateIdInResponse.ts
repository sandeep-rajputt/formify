import type { TivoraAiResponse } from "@/types/form-types";
import { v4 as uuidV4 } from "uuid";

function updateIdInResponse(response: TivoraAiResponse) {
  const newResponse = response;
  if (newResponse.system?.form?.fields) {
    newResponse.system.form.fields.map((field) => {
      field.id = uuidV4();
      if ("options" in field && Array.isArray(field.options)) {
        field.options.map((option) => {
          option.id = uuidV4();
        });
      }
    });
  }

  if (newResponse?.system?.formFields) {
    newResponse.system.formFields.map((field) => {
      field.id = uuidV4();
      if ("options" in field && Array.isArray(field.options)) {
        field.options.map((option) => {
          option.id = uuidV4();
        });
      }
    });
  }

  if (newResponse?.system?.addField) {
    newResponse.system.addField.map((field) => {
      field.data.id = uuidV4();
      if ("options" in field.data && Array.isArray(field.data.options)) {
        field.data.options.map((option) => {
          option.id = uuidV4();
        });
      }
    });
  }

  if (newResponse.system?.addFieldAfter) {
    newResponse.system.addFieldAfter.map((field) => {
      field.data.id = uuidV4();
      if ("options" in field.data && Array.isArray(field.data.options)) {
        field.data.options.map((option) => {
          option.id = uuidV4();
        });
      }
    });
  }

  if (newResponse.system?.addFieldBefore) {
    newResponse.system.addFieldBefore.map((field) => {
      field.data.id = uuidV4();
      if ("options" in field.data && Array.isArray(field.data.options)) {
        field.data.options.map((option) => {
          option.id = uuidV4();
        });
      }
    });
  }

  return newResponse;
}

export default updateIdInResponse;
