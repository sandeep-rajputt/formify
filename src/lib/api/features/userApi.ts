import { baseApi } from "../baseApi";

interface UploadSignatureResponse {
  signature: string;
  timestamp: number;
  cloudName: string;
  apiKey: string;
  folder: string;
}

interface UpdateProfileRequest {
  name: string;
  image?: string;
}

interface UpdateProfileResponse {
  message: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUploadSignature: builder.mutation<
      UploadSignatureResponse,
      { folder?: string }
    >({
      query: (body) => ({
        url: "/user/upload-signature",
        method: "POST",
        body,
      }),
    }),
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: (body) => ({
        url: "/user/update-profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Dashboard", "User"],
    }),
    deleteAccount: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/user/delete-account",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUploadSignatureMutation,
  useUpdateProfileMutation,
  useDeleteAccountMutation,
} = userApi;
