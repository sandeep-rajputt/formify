import { createSlice } from "@reduxjs/toolkit";
import type {
  Forms,
  AddFieldAction,
  TextInputField,
  LongTextInputField,
  NumberInputField,
  EmailInputField,
  DateInputField,
  CheckboxInputField,
  SelectInputField,
  HeadingField,
  ParagraphField,
  DividerField,
  ListField,
  FormId,
  FormFields,
  FormSetting,
} from "@/types/form-types";

const initialState: Forms = [
  {
    id: "new-form",
    fields: [],
    setting: {
      formName: "Untitled Form",
      formDescription: "",
      theme: "system",
    },
    conversation: [
      {
        role: "model",
        parts: [
          {
            text: `{ "userMessage": "👋 Hello! I’m Tivora, your AI assistant. Need help building your form?"}`,
          },
        ],
      },
    ],
  },
];

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // reset form
    resetForm(state) {
      const form = state.find((f) => f.id === "new-form");
      if (form) {
        form.fields = [];
        form.setting = {
          formName: "Untitled Form",
          formDescription: "",
          theme: "system",
        };
        form.conversation = [
          {
            role: "model",
            parts: [
              {
                text: `{ "userMessage": "👋 Hello! I’m Tivora, your AI assistant. Need help building your form?"}`,
              },
            ],
          },
        ];
      }
    },
    // for  form
    updateForm(
      state,
      action: {
        payload: {
          formId: FormId;
          data: {
            fields: FormFields[];
            setting: FormSetting;
          };
        };
      }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        form.fields = action.payload.data.fields;
        form.setting = action.payload.data.setting;
      }
    },
    // for  formFields
    updateFields(
      state,
      action: { payload: { data: FormFields[]; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) form.fields = action.payload.data;
    },
    // for updateField
    updateField(
      state,
      action: { payload: { data: FormFields; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const idx = form.fields.findIndex(
          (f) => f.id === action.payload.data.id
        );
        if (idx !== -1) Object.assign(form.fields[idx], action.payload.data);
      }
    },
    // for addField
    addField(state: Forms, action: AddFieldAction) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        if (action.payload.index === -1) {
          form.fields.push(action.payload.data);
        } else {
          form.fields.splice(action.payload.index, 0, action.payload.data);
        }
      }
    },

    //  for remove
    deleteField(state, action: { payload: { id: string; formId: FormId } }) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form)
        form.fields = form.fields.filter((f) => f.id !== action.payload.id);
    },
    // for  formSetting
    updateFormSetting(
      state: Forms,
      action: {
        payload: {
          data: FormSetting;
          formId: FormId;
        };
      }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) form.setting = { ...form.setting, ...action.payload.data };
    },

    pushDown(
      state,
      action: { payload: { id: string; index: number; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (!form) return;
      const { index } = action.payload;
      if (index < form.fields.length - 1) {
        const [removed] = form.fields.splice(index, 1);
        form.fields.splice(index + 1, 0, removed);
      }
    },

    pullUp(
      state,
      action: { payload: { id: string; index: number; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (!form) return;
      const { index } = action.payload;
      if (index > 0) {
        const [removed] = form.fields.splice(index, 1);
        form.fields.splice(index - 1, 0, removed);
      }
    },

    // ---------------- Field-specific updates ----------------
    updateTextField(
      state,
      action: { payload: { data: TextInputField; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const idx = form.fields.findIndex(
          (f) => f.id === action.payload.data.id
        );
        if (idx !== -1) Object.assign(form.fields[idx], action.payload.data);
      }
    },

    updateLongTextField(
      state,
      action: { payload: { data: LongTextInputField; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const idx = form.fields.findIndex(
          (f) => f.id === action.payload.data.id
        );
        if (idx !== -1) Object.assign(form.fields[idx], action.payload.data);
      }
    },

    updateNumberField(
      state,
      action: { payload: { data: NumberInputField; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const idx = form.fields.findIndex(
          (f) => f.id === action.payload.data.id
        );
        if (idx !== -1) Object.assign(form.fields[idx], action.payload.data);
      }
    },

    updateEmailField(
      state,
      action: { payload: { data: EmailInputField; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const idx = form.fields.findIndex(
          (f) => f.id === action.payload.data.id
        );
        if (idx !== -1) Object.assign(form.fields[idx], action.payload.data);
      }
    },

    updateDateField(
      state,
      action: { payload: { data: DateInputField; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const idx = form.fields.findIndex(
          (f) => f.id === action.payload.data.id
        );
        if (idx !== -1) Object.assign(form.fields[idx], action.payload.data);
      }
    },

    updateCheckboxField(
      state,
      action: { payload: { data: CheckboxInputField; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const idx = form.fields.findIndex(
          (f) => f.id === action.payload.data.id
        );
        if (idx !== -1) Object.assign(form.fields[idx], action.payload.data);
      }
    },

    updateSelectField(
      state,
      action: { payload: { data: SelectInputField; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const idx = form.fields.findIndex(
          (f) => f.id === action.payload.data.id
        );
        if (idx !== -1) Object.assign(form.fields[idx], action.payload.data);
      }
    },

    updateHeadingField(
      state,
      action: { payload: { data: HeadingField; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const idx = form.fields.findIndex(
          (f) => f.id === action.payload.data.id
        );
        if (idx !== -1) Object.assign(form.fields[idx], action.payload.data);
      }
    },

    updateParagraphField(
      state,
      action: { payload: { data: ParagraphField; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const idx = form.fields.findIndex(
          (f) => f.id === action.payload.data.id
        );
        if (idx !== -1) Object.assign(form.fields[idx], action.payload.data);
      }
    },

    updateDividerField(
      state,
      action: { payload: { data: DividerField; formId: FormId } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const idx = form.fields.findIndex(
          (f) => f.id === action.payload.data.id
        );
        if (idx !== -1) Object.assign(form.fields[idx], action.payload.data);
      }
    },

    updateListField(
      state,
      action: { payload: { formId: FormId; data: ListField } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const idx = form.fields.findIndex(
          (f) => f.id === action.payload.data.id
        );
        if (idx !== -1) Object.assign(form.fields[idx], action.payload.data);
      }
    },

    // ---------------- Chat ----------------
    addUserChat(state, action: { payload: { text: string; formId: FormId } }) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form)
        form.conversation.push({
          role: "user",
          parts: [{ text: action.payload.text }],
        });
    },

    addModelChat(state, action: { payload: { text: string; formId: FormId } }) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form)
        form.conversation.push({
          role: "model",
          parts: [{ text: action.payload.text }],
        });
    },

    clearChat(state, action: { payload: FormId }) {
      const form = state.find((f) => f.id === action.payload);
      if (form) {
        form.conversation = [
          {
            role: "model",
            parts: [
              {
                text: `{ "userMessage": "👋 Hello! I’m Tivora, your AI assistant. Need help building your form?"}`,
              },
            ],
          },
        ];
      }
    },
    //  for "moveField
    moveField(
      state,
      action: { payload: { formId: FormId; id: string; newIndex: number } }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (!form) return;
      const idx = form.fields.findIndex((f) => f.id === action.payload.id);
      if (idx === -1) return;
      const [field] = form.fields.splice(idx, 1);
      form.fields.splice(action.payload.newIndex, 0, field);
    },

    // for addFieldAfter
    addFieldAfter(
      state,
      action: {
        payload: { formId: FormId; afterId: string; data: FormFields };
      }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const targetIndex =
          form.fields.findIndex((f) => f.id === action.payload.afterId) + 1;
        form.fields.splice(targetIndex, 0, action.payload.data);
      }
    },
    // for addFieldBefore
    addFieldBefore(
      state,
      action: {
        payload: { formId: FormId; beforeId: string; data: FormFields };
      }
    ) {
      const form = state.find((f) => f.id === action.payload.formId);
      if (form) {
        const targetIndex = form.fields.findIndex(
          (f) => f.id === action.payload.beforeId
        );
        form.fields.splice(targetIndex, 0, action.payload.data);
      }
    },
  },
});

export const {
  addField,
  updateFields,
  updateFormSetting,
  pushDown,
  pullUp,
  updateTextField,
  updateLongTextField,
  updateNumberField,
  updateEmailField,
  updateDateField,
  deleteField,
  updateCheckboxField,
  updateSelectField,
  updateHeadingField,
  updateParagraphField,
  updateDividerField,
  updateListField,
  addUserChat,
  addModelChat,
  clearChat,
  updateForm,
  updateField,
  moveField,
  addFieldAfter,
  addFieldBefore,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
