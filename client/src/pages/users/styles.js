import styled from "styled-components";

export const Title = styled.h2`
    text-align: center;
    font-size: 24px;
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

export const AddFriendButton = styled.button`
    font-size: 14px;
    border: none;
    transition: background 0.3s;

    &:hover {
        background: #0056b3;
    }
`