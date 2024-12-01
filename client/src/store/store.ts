import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';
import { blogApi } from '../api/blogApi';


const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(blogApi.middleware)
});

export default store;
