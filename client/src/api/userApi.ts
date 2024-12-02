import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/users/`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: 'signup',
        method: 'POST',
        body: userData,
      }),
    }),
    getUser: builder.query({
      query: () => 'get-user',
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }), 
      }),
  }),
});

export const { useLoginMutation, useSignupMutation ,useGetUserQuery, useLogoutMutation} = userApi;
