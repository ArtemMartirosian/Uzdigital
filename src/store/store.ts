import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./slices/userSlice.ts";
// Import your reducers here

const store = configureStore({
    reducer: {
        user: userSlice,
        // Add more reducers if necessary
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;