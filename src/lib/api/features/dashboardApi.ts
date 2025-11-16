// src/lib/api/features/dashboardApi.ts
import { baseApi } from "@/lib/api/baseApi";

type OverviewData = {
  totalForms: number;
  totalSubmissions: number;
  publishedForms: number;
  formsSubmissions: Array<FormItem>;
  recentForms: Array<FormItem>;
};

type Submission = {
  formId: string;
  submittedAt: string;
};

type FormItem = {
  _id: string;
  formId: string;
  title: string;
  description?: string;
  status: "draft" | "published";
  submissionsCount: number;
  views: number;
  createdAt: string;
  updatedAt: string;
};

type FormsParams = {
  userId: string;
  search?: string;
  status?: string;
  sortBy?: string;
  order?: string;
};

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<
      { message: string; data: OverviewData },
      string
    >({
      query: (userId) => `/dashboard/${userId}/overview`,
      providesTags: ["Dashboard"],
    }),
    getRecentSubmissions: builder.mutation<
      { submissions: Submission[] },
      { userId: string; time: string }
    >({
      query: ({ userId, time }) => ({
        url: `/dashboard/${userId}/overview/recent-forms`,
        method: "POST",
        body: { time },
      }),
    }),
    getForms: builder.query<{ message: string; data: FormItem[] }, FormsParams>(
      {
        query: ({ userId, search, status, sortBy, order }) => {
          const params = new URLSearchParams();
          if (search) params.append("search", search);
          if (status) params.append("status", status);
          if (sortBy) params.append("sortBy", sortBy);
          if (order) params.append("order", order);
          return `/dashboard/${userId}/forms?${params.toString()}`;
        },
        providesTags: ["Dashboard"],
      }
    ),
    toggleFormVisibility: builder.mutation<
      { message: string; status: number },
      string
    >({
      query: (formId) => `/forms/${formId}/toggle-visibility`,
      invalidatesTags: ["Dashboard"],
    }),
    deleteForm: builder.mutation<{ message: string; status: number }, string>({
      query: (formId) => ({
        url: `/forms/${formId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetRecentSubmissionsMutation,
  useGetFormsQuery,
  useToggleFormVisibilityMutation,
  useDeleteFormMutation,
} = dashboardApi;
