import React from 'react';
import {Outlet} from "react-router-dom";
import * as SC from './styles.js';
import {Container} from "../Container/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/slices/userSlices.js";

export const Root = () => {
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <>
            <Container>
                <SC.Menu>
                    <SC.MenuContainer>
                        <SC.MenuItem to={'/'}>Главная</SC.MenuItem>
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