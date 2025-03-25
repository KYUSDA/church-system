import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = 'http://localhost:8000/kyusda/v1';


export interface TUser{
    _id: string;
    firstName: string;
    lastName: string;
    email:string;
    registration: string;
    course: string;
    year: string;
    phoneNumber: string;
    role: string;
    familyLocated: string;
    avatar:{
        url: string;
    }
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
    imgUrl:string;
    locationUrl?: string | null;
    tags: string[];
  }
  
  

interface GetMembersResponse {
    status: string;
    users: TUser[];
  }


export const adminApi = createApi({
    reducerPath: 'adminApi',
        baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
    endpoints: (builder) => ({
       
        // get all members
        getMembers: builder.query<GetMembersResponse,void>({
            query: () => ({
                url: '/user/getUsers',
            }),
        }),

        // get departments
        getDepartments: builder.query<TDepartment[],void>({
            query: () => ({
                url: '/department/get-all-departments',
            }),
        }),

        // get families
        getFamilies: builder.query<TFamily[],void>({
            query: () => ({
                url: '/family/getFamilies',
            }),
        }),


    })
})


export const { 
    useGetMembersQuery,
    useGetDepartmentsQuery,
    useGetFamiliesQuery
 } = adminApi;