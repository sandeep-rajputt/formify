// src/lib/api/features/dashboardApi.ts
import { baseApi } from "@/lib/api/baseApi";

type OverviewData = {
  totalForms: number;
  totalSubmissions: number;
  publishedForms: number;
  formsSubmissions: Array<{
    _id: string;
    title: string;
    submissionsCount: number;
  }>;
  recentForms: Array<{
    _id: string;
    formId: string;
    title: string;
    status: string;
    submissionsCount: number;
    createdAt: string;
  }>;
};

type Submission = {
  formId: string;
  submittedAt: string;
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
  }),
});

export const { useGetDashboardOverviewQuery, useGetRecentSubmissionsMutation } =
  dashboardApi;
