import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../session/userSlice";


export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getBaseUrl = () => {
  return BASE_URL;
};

/** Get authorization headers - uses lazy import to avoid circular dependency */
export const getAuthHeaders = (): HeadersInit => {
  // Lazy import to avoid circular dependency
  const getStore = () => require("@/store/store").store;
  const token = getStore().getState().auth.user?.data.tokens.accessToken;

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.user?.data.tokens.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Enhanced base query with automatic token refresh
export const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const errorData = result.error.data as any;
    api.dispatch(logout());
  }
  return result;
};
