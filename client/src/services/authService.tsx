import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, updateAuthToken } from '../session/userSlice';
import { AppDispatch, RootState } from '../store/store';

const BASE_URL = 'http://localhost:8000/kyusda/v1';

export const getBaseUrl = () => {
    return BASE_URL;
};

interface ILogin{
    email: string;
    password: string;
}

interface IRegister{
    firstName: string;
    lastName: string;
    email:string;
    registration: string;
    course: string;
    year: string;
    phoneNumber: string;
    password:string;
    policyAccepted: false,
    activationToken: string;
}

interface LoginResponse {
    user: {
      id: string;
      role: string;
    };
    accessToken: string;
  }

  interface TActivate {
    activation_code: string;
    activation_token: string;
  }

  interface TIssue{
    title: string;
    description: string;
  }

  interface RefreshTokenResponse {
    success: boolean;
    accessToken: string;
  }

  const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  });

  const refreshAccessToken = async (dispatch: AppDispatch) => {
    try {
      const res = await dispatch(
        api.endpoints.updateAccessToken.initiate()
      ).unwrap();
      const expiresAt = Date.now() + 3600 * 1000;
      dispatch(updateAuthToken({ accessToken: res.accessToken, expiresAt }));
      return res.accessToken;
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      dispatch(logout());
      return null;
    }
  };

  // Enhanced base query with automatic token refresh
  const baseQueryWithReauth: typeof baseQuery = async (
    args,
    api,
    extraOptions
  ) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const newToken = await refreshAccessToken(api.dispatch);
      if (newToken) {
        result = await baseQuery(args, api, extraOptions);
      }
    }

    return result;
  };
  


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

    // logout
    authLogout: builder.mutation<any, void>({
      query: () => ({
        url: "/member/logout",
        method: "POST",
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

    // update access token
    updateAccessToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => ({
        url: "/member/update-accesstoken",
        method: "POST",
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
  }),
});

export const { 
    useAuthSignupMutation,
    useAuthLoginMutation,
    useAuthLogoutMutation,
    useActivateUserMutation,
    useUpdateAccessTokenMutation,
    useReportIssueMutation,
} = api;

