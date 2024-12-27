import styled from "styled-components"
import {NavLink} from "react-router-dom"

export const Menu = styled.div`
    max-width: 800px;
    margin: 0 auto;
    align-items: center;
    display: flex;
    gap: 15px;
    justify-content: space-between;
    padding: 1rem;
`

export const MenuContainer = styled.div`
    display: flex;
    gap: 40px;
`

export const AuthContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

export const MenuItem = styled(NavLink)`
    font-size: 16px;
    text-decoration: none;
    display: flex;
    align-items: center;

    svg {
        margin-left: 6px;
    }
`

export const ThemeContainer = styled.div`
    @media (min-width: 1150px) {
        position: absolute;
        right: 0;
    }
`

export const ThemeButton = styled.button`
    border: none !important;
    background: none !important;
    outline: none !important;

    svg {
        fill: ${({ isActive }) => (isActive ? '#535bf2' : 'currentColor')};
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.2);
        }
    }
`