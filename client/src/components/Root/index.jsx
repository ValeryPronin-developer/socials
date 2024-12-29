import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Outlet, useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {login, logout} from "../../redux/slices/userSlices.js"
import {setTheme} from "../../redux/slices/themeSlice.js";
import {Container} from "../Container/index.jsx"
import LightIcon from '@mui/icons-material/LightMode'
import SystemIcon from '@mui/icons-material/SettingsSuggest'
import DarkIcon from '@mui/icons-material/Nightlight'
import ProfileIcon from '@mui/icons-material/AccountCircleSharp'
import * as SC from './styles.js'

export const Root = () => {
    const theme = useSelector((state) => state.theme.theme)
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    useEffect(() => {
        const root = document.documentElement

        if (theme === 'dark') {
            root.classList.add('dark')
            root.classList.remove('light')
        } else if (theme === 'light') {
            root.classList.add('light')
            root.classList.remove('dark')
        } else {
            root.classList.remove('dark', 'light')
        }
    }, [theme])

    const handleThemeChange = (selectedTheme) => {
        dispatch(setTheme(selectedTheme))
        toast.info(`Тема изменена на: ${selectedTheme}`)
    }

    const handleLogout = () => {
        const storageKey = localStorage.getItem("rememberMe") === "true"
            ? "localStorage"
            : "sessionStorage"
        window[storageKey].removeItem("user")
        localStorage.removeItem("rememberMe")
        dispatch(logout())
        navigate("/")
    }

    return (
        <>
            <Container>
                <SC.Menu>
                    <SC.MenuContainer>
                        <SC.MenuItem to={'/'}>Главная</SC.MenuItem>
                        {user && <SC.MenuItem to={'/posts'}>Посты</SC.MenuItem>}
                        {user && <SC.MenuItem to={'/users'}>Пользователи</SC.MenuItem>}
                    </SC.MenuContainer>
                    <SC.AuthContainer>
                        {user ? (
                            <>
                                <SC.MenuItem to={`/user/${user.email}`}>
                                    <ProfileIcon/>
                                </SC.MenuItem>
                                <button onClick={handleLogout}>Выйти</button>
                            </>
                        ) : (
                            <>
                                <SC.MenuItem to={'/auth'}>Вход</SC.MenuItem>
                                /
                                <SC.MenuItem to={'/registration'}>Регистрация</SC.MenuItem>
                            </>
                        )}
                        <SC.ThemeContainer>
                            <SC.ThemeButton
                                isActive={theme === 'light'}
                                onClick={() => handleThemeChange('light')}
                            >
                                <LightIcon/>
                            </SC.ThemeButton>
                            <SC.ThemeButton
                                isActive={theme === 'system'}
                                onClick={() => handleThemeChange('system')}
                            >
                                <SystemIcon/>
                            </SC.ThemeButton>
                            <SC.ThemeButton
                                isActive={theme === 'dark'}
                                onClick={() => handleThemeChange('dark')}
                            >
                                <DarkIcon/>
                            </SC.ThemeButton>
                        </SC.ThemeContainer>
                    </SC.AuthContainer>
                </SC.Menu>
            </Container>
            <Outlet/>
        </>
    )
}