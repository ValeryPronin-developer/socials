import styled from 'styled-components'

export const Title = styled.h2`
    font-size: 36px;
    text-align: center;
    margin: 10px;
`

export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 60px;
    padding: 20px;
`

export const AvatarPlaceholder = styled.div`
    width: 200px;
    height: 200px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

export const UserDetails = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
`

export const UserName = styled.div`
    margin-bottom: 60px;
    font-size: 24px;
    font-weight: bold;
`;

export const UserEmail = styled.div`
    color: #666;
`

export const SectionTitle = styled.div`
    color: #666;
`

export const AddFriendButton = styled.button`
    margin-left: 30px;
    border: none;
    transition: background 0.3s;

    &:hover {
        background: #646cff;
    }
`

export const RemoveFriendButton = styled.button`
    margin-left: 30px;
    background-color: #ff4d4f;
    color: #fff;
    border: none;
    transition: background 0.3s;

    &:hover {
        background-color: #ff7875;
    }
`

export const Placeholder = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #555;
`