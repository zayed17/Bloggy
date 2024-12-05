import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/blog/`,
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

    getBlogById: builder.query({
        query: (id) => `get-blog/${id}`, 
      }),
    deleteblog: builder.mutation({
        query: (articleId) => ({
          url: `delete/${articleId}`,
          method: 'DELETE',
        }),
      }),
      editBlog: builder.mutation({

        query: ({ id, formData }) => ({

          url: `/edit-blog/${id}`,
          method: 'PUT',
          body: formData, 
        }),
      }),
      
  }),
});

export const { useAddblogMutation,useDeleteblogMutation,useGetblogQuery,useGetUserblogQuery,useGetBlogByIdQuery,useEditBlogMutation} = blogApi;
