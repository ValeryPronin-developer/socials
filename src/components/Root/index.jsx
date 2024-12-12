import React from 'react';
import {Outlet} from "react-router-dom";
import * as SC from './styles';
import {Container} from "../Container/index.jsx";

export const Root = () => {
    return (
        <>
            <Container>
                <SC.Menu>
                    <SC.MenuItem to={'/'}>LOGO</SC.MenuItem>
                    <SC.MenuItem to={'/posts'}>Посты</SC.MenuItem>
                    <SC.MenuItem to={'/users'}>Пользователи</SC.MenuItem>
                    <SC.MenuItem to={'/friends'}>Друзья</SC.MenuItem>
                    <SC.MenuItem to={'/auth'}>Вход</SC.MenuItem>
                    <SC.MenuItem to={'/registration'}>Регистрация</SC.MenuItem>
                </SC.Menu>
            </Container>
            <Outlet/>
        </>
    )
}