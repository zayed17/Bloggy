import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1717/api/blog/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    addblog: builder.mutation({
      query: (credentials) => ({
        url: 'add-blog',
        method: 'POST',
        body: credentials,
      }),
    }),

    getblog: builder.query({
        query: () => 'get-blog',
      }),

    getUserblog: builder.query({
        query: () => 'get-user-blog',
      }),  

    deleteblog: builder.mutation({
        query: (articleId) => ({
          url: `delete/${articleId}`,
          method: 'DELETE',
        }),
      }),
   
      
  }),
});

export const { useAddblogMutation,useDeleteblogMutation,useGetblogQuery,useGetUserblogQuery} = blogApi;