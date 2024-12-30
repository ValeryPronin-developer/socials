import styled from "styled-components"

export const AddFriendButton = styled.button`
    font-size: 14px !important;
    border: none !important;
    transition: background 0.3s !important;

    &:hover {
        background: #646cff !important;
    }

    &:disabled {
        background: none !important;
    }
`

export const RemoveFriendButton = styled.button`
    font-size: 14px !important;
    background-color: #ff4d4f !important;
    color: #fff !important;
    border: none !important;
    transition: background 0.3s !important;

    &:hover {
        background-color: #ff7875 !important;
    }
`

export const ContainerButton = styled.div`
    display: flex;
    gap: 10px;
    margin-left: 20px;
`