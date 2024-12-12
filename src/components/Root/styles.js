import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const Menu = styled.div`
    max-width: 600px;
    margin: 0 auto;
    align-items: center;
    display: flex;
    gap: 15px;
    justify-content: space-between;
`

export const MenuItem = styled(NavLink)`
    font-size: 16px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.87);
    
    &:hover {
        color: #535bf2;
        text-decoration: underline;
    }
    
    &.active {
        color: #646cff;
        font-weight: bold;
    }
`