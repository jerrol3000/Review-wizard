import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import reviewReducer from './slices/reviewSlice';
import aiReducer from './slices/aiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        reviews: reviewReducer,
        ai: aiReducer
    }
});

export default store;