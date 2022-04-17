import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from '../features/counter/blogs/blogsSlice';
import commentsReducer from '../features/counter/blogs/commentsSlice';

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        comments: commentsReducer
    },
})