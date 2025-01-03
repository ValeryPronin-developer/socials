import styled from "styled-components"

export const Title = styled.h2`
    font-size: 36px;
    text-align: center;
    margin: 10px 10px 46px 10px;
`

export const NoFriendsMessage = styled.div`
    color: gray;
    text-align: center;
    margin-top: 20px;
`

export const UserList = styled.div`
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px auto;
`

export const UserCard = styled.div`
    display: flex;
    list-style: none;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`

export const AvatarPlaceholder = styled.div`
    width: 60px;
    height: 60px;
    margin-right: 16px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
`

export const UserDetails = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 8px;
`

export const UserName = styled.div`
    font-weight: bold;
    font-size: 20px;
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