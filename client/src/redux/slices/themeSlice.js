import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    theme: localStorage.getItem('theme') || 'system',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
            localStorage.setItem('theme', action.payload)
            const root = document.documentElement

            if (action.payload === 'dark') {
                root.classList.add('dark')
                root.classList.remove('light')
            } else if (action.payload === 'light') {
                root.classList.add('light')
                root.classList.remove('dark')
            } else {
                root.classList.remove('dark', 'light')
            }
        },
    },
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer