import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./authService";
import { CalendarEvent } from "../Dashboard/Admin/components/calendar";
import { logout } from "../session/userSlice";

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


const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

// Enhanced base query with automatic token refresh
const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(logout({ reason: "Session expired", showAlert: true }));
  }
  return result;
};

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
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
