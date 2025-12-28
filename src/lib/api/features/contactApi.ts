import { baseApi } from "@/lib/api/baseApi";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactResponse = {
  message: string;
};

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation<ContactResponse, ContactFormData>({
      query: (formData) => ({
        url: "/contact",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useSendContactMessageMutation } = contactApi;
