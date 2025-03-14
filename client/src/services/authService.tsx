import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    passwordConfirm: string;
    policyAccepted: false,
}

interface LoginResponse {
    user: {
      id: string;
      name: string;
      email: string;
      firstName: string;
      lastName: string;
      registration: string;
        course: string;
        year: number;
        phoneNumber: string;
    };
    accessToken: string;
  }


export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
    endpoints: (builder) => ({
        // register
        authSignup: builder.mutation<IRegister,Partial<IRegister>>({
            query: (data) => ({
                url: '/member/signUp',
                method: 'POST',
                body: data,
            }),
        }),

        // login
        authLogin: builder.mutation<LoginResponse,ILogin>({
            query: (data) => ({
                url: '/member/signIn',
                method: 'POST',
                body: data,
            }),
        }),

        // logout
        authLogout: builder.mutation<any, void>({
            query: () => ({
                url: '/member/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const { 
    useAuthSignupMutation,
    useAuthLoginMutation,
    useAuthLogoutMutation
} = api;

