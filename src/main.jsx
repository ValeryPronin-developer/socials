import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import {Posts} from "./pages/posts/index.jsx";
import {Root} from "./components/Root/index.jsx";
import {Users} from "./pages/users/index.jsx";
import {Friends} from "./pages/friends/index.jsx";
import {Auth} from "./pages/auth/index.jsx";
import {Registration} from "./pages/registration/index.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: 'posts',
                element: <Posts />,
            },
            {
                path: 'users',
                element: <Users />,
            },
            {
                path: 'friends',
                element: <Friends />,
            },
            {
                path: 'auth',
                element: <Auth />,
            },
            {
                path: 'registration',
                element: <Registration />,
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
