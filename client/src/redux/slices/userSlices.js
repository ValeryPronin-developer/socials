import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
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
                state.user.friends = action.payload
            }
        },
    },
})

export const { login, logout, updateFriends } = userSlice.actions

export default userSlice.reducer