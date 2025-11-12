import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base_query";


interface ILogin {
  email: string;
  password: string;
}

interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  registration: string;
  course: string;
  year: string;
  phoneNumber: string;
  password: string;
  policyAccepted: false;
  activationToken: string;
}

interface LoginResponse {
  data: {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: {
      userId: string;
      role: string;
    };
  };
}

interface TActivate {
  activation_code: string;
  activation_token: string;
}

interface TIssue {
  title: string;
  description: string;
}

interface TNotification {
  notifications: {
    id: string;
    title: string;
    decription: string;
    isRead: boolean;
    createdAt: string;
  };
}

interface Upcoming {
  users: {
    firstName: string;
    lastName: string;
    nextBirthday: string; // ISO string from API
  };
}


export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // register
    authSignup: builder.mutation<IRegister, Omit<IRegister, "activationToken">>(
      {
        query: (data) => ({
          url: "/member/signUp",
          method: "POST",
          body: data,
        }),
      }
    ),

    // login
    authLogin: builder.mutation<LoginResponse, ILogin>({
      query: (data) => ({
        url: "/member/signIn",
        method: "POST",
        body: data,
      }),
    }),

    // update accesstoken
    refreshTokens: builder.mutation<any, void>({
      query: () => ({
        url: "/member/update-accesstoken",
        method: "POST",
      }),
    }),

    // logout
    authLogout: builder.mutation<any, void>({
      query: () => ({
        url: "/member/logout",
        method: "POST",
      }),
    }),

    validateSession: builder.query<
      { user: { id: string; role: string } },
      void
    >({
      query: () => ({
        url: "/member/validate-session",
        method: "GET",
      }),
    }),

    // activate user
    activateUser: builder.mutation<LoginResponse, TActivate>({
      query: ({ activation_code, activation_token }) => ({
        url: "/member/activate-me",
        method: "POST",
        body: { activation_code, activation_token },
      }),
    }),

    // report issue
    reportIssue: builder.mutation<any, TIssue>({
      query: (data) => ({
        url: "/user/report-issue",
        method: "POST",
        body: data,
      }),
    }),

    // get all notification
    getAllNotifications: builder.query<TNotification, void>({
      query: () => ({
        url: "/notification/getAll-notification",
        method: "GET",
      }),
    }),

    // get upcoming birthdays
    getBirthdays: builder.query<Upcoming, void>({
      query: () => ({
        url: "/user/birthdays",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAuthSignupMutation,
  useAuthLoginMutation,
  useAuthLogoutMutation,
  useActivateUserMutation,
  useReportIssueMutation,
  useGetAllNotificationsQuery,
  useGetBirthdaysQuery,
  useValidateSessionQuery,
} = api;
