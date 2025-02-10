import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reviews: [],
    loading: false,
    error: null
};

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        fetchReviewsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchReviewsSuccess(state, action) {
            state.reviews = action.payload;
            state.loading = false;
        },
        fetchReviewsFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { fetchReviewsStart, fetchReviewsSuccess, fetchReviewsFailure } = reviewSlice.actions;
export default reviewSlice.reducer;