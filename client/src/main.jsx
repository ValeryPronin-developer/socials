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
import {Users} from "./pages/users/index.jsx";
import {Friends} from "./pages/friends/index.jsx";
import {Auth} from "./pages/auth/index.jsx";
import {Registration} from "./pages/registration/index.jsx";

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
                element: <PostsPage />,
            },
            {
                path: 'users',
                element: <Users/>,
            },
            {
                path: 'friends',
                element: <Friends/>,
            },
            {
                path: 'auth',
                element: <Auth/>,
            },
            {
                path: 'registration',
                element: <Registration/>,
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
