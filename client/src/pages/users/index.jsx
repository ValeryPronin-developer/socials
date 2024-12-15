import React, { useEffect, useState } from 'react'
import * as SC from './styles.js'
import { useApiRequest } from '../../hooks/useApiRequest.js'
import {Container} from "../../components/Container/index.jsx";

export const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const apiRequest = useApiRequest()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await apiRequest({ url: 'http://localhost:3002/api/users' })
                setUsers(data)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [apiRequest])

    if (loading) {
        return <Container>Загрузка...</Container>
    }

    if (error) {
        return <Container>Ошибка: {error}</Container>
    }

    return (
        <Container>
            <SC.Title>Пользователи</SC.Title>
            <SC.UserList>
                {users.map((user) => (
                    <SC.UserCard key={user._id}>
                        <SC.UserInfo>
                            <SC.AvatarPlaceholder>
                                <img src="../../../public/person.webp" alt="avatar"/>
                            </SC.AvatarPlaceholder>
                            <SC.UserDetails>
                                <SC.UserName>{user.name}</SC.UserName>
                                <SC.AddFriendButton>Добавить в друзья</SC.AddFriendButton>
                            </SC.UserDetails>
                        </SC.UserInfo>
                    </SC.UserCard>
                ))}
            </SC.UserList>
        </Container>
    )
}