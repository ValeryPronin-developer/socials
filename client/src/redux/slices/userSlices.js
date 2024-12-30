import { createSlice } from "@reduxjs/toolkit"

const storageKey = localStorage.getItem("rememberMe") === "true"
    ? "localStorage"
    : "sessionStorage"
const persistedUser = JSON.parse(window[storageKey].getItem("user") || "null")

const initialState = {
    user: persistedUser,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        updateFriends: (state, action) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload,
                }

                const storageKey = localStorage.getItem("rememberMe") === "true"
                    ? "localStorage"
                    : "sessionStorage"
                window[storageKey].setItem("user", JSON.stringify(state.user))
            }
        },
    },
})

export const { login, logout, updateFriends } = userSlice.actions

export default userSlice.reducer