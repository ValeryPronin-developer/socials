import React from 'react'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom"
import {Provider} from 'react-redux'
import {store} from "./redux/store.js"
import {Root} from "./components/Root/index.jsx"
import {PostsPage} from "./pages/posts/index.jsx"
import {UsersPage} from "./pages/users/index.jsx"
import {FriendsPage} from "./pages/friends/index.jsx"
import {AuthPage} from "./pages/auth/index.jsx"
import {RegistrationPage} from "./pages/registration/index.jsx"
import {ProfileUserPage} from "./pages/profileUser/index.jsx"
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                index: true,
                element: <App/>,
            },
            {
                path: 'user/:userId',
                element: <ProfileUserPage/>,
            },
            {
                path: 'posts',
                element: <PostsPage/>,
            },
            {
                path: 'users',
                element: <UsersPage/>,
            },
            {
                path: 'friends',
                element: <FriendsPage/>,
            },
            {
                path: 'auth',
                element: <AuthPage/>,
            },
            {
                path: 'registration',
                element: <RegistrationPage/>,
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
)
