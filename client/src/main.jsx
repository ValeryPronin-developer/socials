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
import {ROUTES} from './constants.js'
import './index.css'

const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <Root/>,
        children: [
            {
                index: true,
                element: <App/>,
            },
            {
                path: ROUTES.USER_PROFILE,
                element: <ProfileUserPage/>,
            },
            {
                path: ROUTES.POSTS,
                element: <PostsPage/>,
            },
            {
                path: ROUTES.USERS,
                element: <UsersPage/>,
            },
            {
                path: ROUTES.FRIENDS,
                element: <FriendsPage/>,
            },
            {
                path: ROUTES.AUTH,
                element: <AuthPage/>,
            },
            {
                path: ROUTES.REGISTRATION,
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
