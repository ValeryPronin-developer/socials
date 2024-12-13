import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const Menu = styled.div`
    max-width: 600px;
    margin: 0 auto;
    align-items: center;
    display: flex;
    gap: 15px;
    justify-content: space-between;
    padding: 1rem;
`

export const MenuItem = styled(NavLink)`
    font-size: 16px;
    text-decoration: none;
`