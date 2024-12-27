import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/userSlices.js"
import themeReducer from "./slices/themeSlice.js"

export const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
    },
})