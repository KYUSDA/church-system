import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CalendarEvent } from "../Dashboard/Admin/components/calendar";

export const BASE_URL = "http://localhost:8000/kyusda/v1";

export interface TUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  registration: string;
  course: string;
  year: string;
  phoneNumber: string;
  scores: number;
  birthday: Date;
  role: string;
  familyLocated: string;
  createdAt: Date;
  avatar: {
    url: string;
  };
}

export interface GetMembersResponse {
  status: string;
  users: TUser[];
}

export type TDepartment = {
  _id: string;
  title: string;
  imgUrl: { asset: { _ref: string } } | string;
  description: string;
  link: string;
};

export interface TFamily {
  _id: string;
  title: string;
  description: string;
  link: string;
  imgUrl: string;
  locationUrl?: string | null;
  tags: string[];
}

export interface TIssue {
  _id: string;
  title: string;
  description: string;
  isRead: boolean;
  user: string;
  createdAt: Date;
  replies:
    | [
        {
          _id: string;
          userId: string;
          message: string;
          createdAt: Date;
        }
      ]
    | [];
}

export interface TPrayerRequest {
  _id: string;
  prayerRequest: string;
  date: string;
  name: string;
}

export const getAuthHeaders = (): HeadersInit => {
  // Lazy import to avoid circular dependency
  const getStore = () => require("@/store/store").store;
  const token = getStore().getState().auth.user?.data.tokens.accessToken;

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.user?.data.tokens.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    // get all members
    getMembers: builder.query<GetMembersResponse, void>({
      query: () => ({
        url: "/user/getUsers",
      }),
    }),

    // get departments
    getDepartments: builder.query<TDepartment[], void>({
      query: () => ({
        url: "/department/get-all-departments",
      }),
    }),

    // get families
    getFamilies: builder.query<TFamily[], void>({
      query: () => ({
        url: "/family/getFamilies",
      }),
    }),

    // get issues
    getIssues: builder.query<TIssue, void>({
      query: () => ({
        url: "/user/get-issues",
      }),
    }),

    // get all prayers
    getPrayers: builder.query<TPrayerRequest[], void>({
      query: () => ({
        url: "/prayers/getAllPrayerRequests",
      }),
    }),

    // create calendar event
    createEvent: builder.mutation<CalendarEvent, CalendarEvent>({
      query: (event) => ({
        url: "/calendar/event",
        method: "POST",
        body: event,
      }),
    }),
  }),
});

export const {
  useGetMembersQuery,
  useGetDepartmentsQuery,
  useGetFamiliesQuery,
  useGetIssuesQuery,
  useGetPrayersQuery,
  useCreateEventMutation,
} = adminApi;
