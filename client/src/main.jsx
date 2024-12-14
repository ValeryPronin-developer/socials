import React from 'react';
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import {store} from "./redux/store.js";
import {Provider} from 'react-redux'
import './index.css'
import App from './App.jsx'
import {PostsPage} from "./pages/posts/index.jsx";
import {Root} from "./components/Root/index.jsx";
import {UsersPage} from "./pages/users/index.jsx";
import {FriendsPage} from "./pages/friends/index.jsx";
import {AuthPage} from "./pages/auth/index.jsx";
import {RegistrationPage} from "./pages/registration/index.jsx";

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
