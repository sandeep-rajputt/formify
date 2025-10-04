import { createSlice } from "@reduxjs/toolkit";
import type {
  FormInitialState,
  AddFieldAction,
  TextInputField,
  LongTextInputField,
  NumberInputField,
  EmailInputField,
  DateInputField,
  UpdateFormSettingAction,
  CheckboxInputField,
  SelectInputField,
  HeadingField,
  ParagraphField,
  DividerField,
  ListField,
} from "@/types/form-types";

const initialState: FormInitialState = {
  fields: [],
  setting: {
    formName: "Untitled Form",
    formDescription: "",
    theme: "system",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addField(state: FormInitialState, action: AddFieldAction) {
      const field = action.payload.data;
      if (field) {
        state.fields.splice(action.payload.index, 0, field);
      }
    },
    deleteField(
      state,
      action: {
        payload: string;
        type: string;
      }
    ) {
      state.fields = state.fields.filter(
        (field) => field.id !== action.payload
      );
    },
    updateFormSetting(
      state: FormInitialState,
      action: UpdateFormSettingAction
    ) {
      state.setting = action.payload;
    },
    pushDown(state, action: { payload: { id: string; index: number } }) {
      const index = action.payload.index;
      if (index < state.fields.length - 1) {
        const [removed] = state.fields.splice(index, 1);
        state.fields.splice(index + 1, 0, removed);
      }
    },
    pullUp(state, action: { payload: { id: string; index: number } }) {
      const index = action.payload.index;
      if (index > 0) {
        const [removed] = state.fields.splice(index, 1);
        state.fields.splice(index - 1, 0, removed);
      }
    },
    updateTextField(state, action: { payload: TextInputField }) {
      const { id } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        state.fields[fieldIndex] = {
          ...state.fields[fieldIndex],
          ...action.payload,
        };
      }
    },
    updateLongTextField(state, action: { payload: LongTextInputField }) {
      const { id } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        state.fields[fieldIndex] = {
          ...state.fields[fieldIndex],
          ...action.payload,
        };
      }
    },
    updateNumberField(state, action: { payload: NumberInputField }) {
      const { id } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        Object.assign(state.fields[fieldIndex], action.payload);
      }
    },
    updateEmailField(state, action: { payload: EmailInputField }) {
      const { id } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        Object.assign(state.fields[fieldIndex], action.payload);
      }
    },
    updateDateField(state, action: { payload: DateInputField }) {
      const { id } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        Object.assign(state.fields[fieldIndex], action.payload);
      }
    },
    updateCheckboxField(state, action: { payload: CheckboxInputField }) {
      const { id } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        Object.assign(state.fields[fieldIndex], action.payload);
      }
    },
    updateSelectField(state, action: { payload: SelectInputField }) {
      const { id } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        Object.assign(state.fields[fieldIndex], action.payload);
      }
    },
    updateHeadingField(state, action: { payload: HeadingField }) {
      const { id } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        Object.assign(state.fields[fieldIndex], action.payload);
      }
    },
    updateParagraphField(state, action: { payload: ParagraphField }) {
      const { id } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        Object.assign(state.fields[fieldIndex], action.payload);
      }
    },
    updateDividerField(state, action: { payload: DividerField }) {
      const { id } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        Object.assign(state.fields[fieldIndex], action.payload);
      }
    },
    updateListField(state, action: { payload: ListField }) {
      const { id } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        Object.assign(state.fields[fieldIndex], action.payload);
      }
    },
  },
});

export const {
  addField,
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
} = formSlice.actions;
export default formSlice.reducer;
