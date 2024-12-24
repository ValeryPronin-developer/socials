import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Outlet} from "react-router-dom"
import {login, logout} from "../../redux/slices/userSlices.js"
import {Container} from "../Container/index.jsx"
import * as SC from './styles.js'

export const Root = () => {
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            const rememberMe = localStorage.getItem("rememberMe") === "true"
            const storageKey = rememberMe
                ? "localStorage"
                : "sessionStorage"
            const storedUser = window[storageKey].getItem("user")

            if (storedUser) {
                const parsedUser = JSON.parse(storedUser)
                dispatch(login(parsedUser))
            }
        }
    }, [dispatch, user])

    const handleLogout = () => {
        const storageKey = localStorage.getItem("rememberMe") === "true"
            ? "localStorage"
            : "sessionStorage"
        window[storageKey].removeItem("user")
        dispatch(logout())
    }

    return (
        <>
            <Container>
                <SC.Menu>
                    <SC.MenuContainer>
                        <SC.MenuItem to={'/'}>Главная</SC.MenuItem>
                        {user && <SC.MenuItem to={`/user/${user.email}`}>Профиль</SC.MenuItem>}
                        <SC.MenuItem to={'/posts'}>Посты</SC.MenuItem>
                        <SC.MenuItem to={'/users'}>Пользователи</SC.MenuItem>
                        {user && <SC.MenuItem to={'/friends'}>Друзья</SC.MenuItem>}
                    </SC.MenuContainer>
                    <SC.AuthContainer>
                        {user ? (
                            <>
                                <div>{user.name}</div>
                                <button onClick={handleLogout}>Выйти</button>
                            </>
                        ) : (
                            <>
                                <SC.MenuItem to={'/auth'}>Вход</SC.MenuItem>
                                /
                                <SC.MenuItem to={'/registration'}>Регистрация</SC.MenuItem>
                            </>
                        )}
                    </SC.AuthContainer>
                </SC.Menu>
            </Container>
            <Outlet/>
        </>
    )
}