import React, {useEffect, useState} from 'react'
import * as SC from './styles.js'
import {useApiRequest} from '../../hooks/useApiRequest.js'
import {Container} from "../../components/Container/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {updateFriends} from "../../redux/slices/userSlices.js";
import {Loading} from "../../components/ui/Loading/index.jsx";
import {Link} from "react-router-dom";

export const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const apiRequest = useApiRequest()
    const userAuth = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await apiRequest({url: 'http://localhost:3002/api/users'})
                setUsers(data)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [apiRequest])

    const handleAddFriend = async (friendEmail) => {
        try {
            await apiRequest({
                url: 'http://localhost:3002/api/users/add-friend',
                method: 'post',
                body: {currentEmail: userAuth.email, friendEmail}
            })

            dispatch(updateFriends([...userAuth.friends, friendEmail]))
        } catch (e) {
            console.error(e)
        }
    }

    const handleRemoveFriend = async (friendEmail) => {
        try {
            await apiRequest({
                url: 'http://localhost:3002/api/users/remove-friend',
                method: 'post',
                body: { currentEmail: userAuth.email, friendEmail }
            })

            dispatch(updateFriends(userAuth.friends.filter((email) => email !== friendEmail)))
        } catch (e) {
            console.error(e)
        }
    }

    if (loading) {
        return <Loading />
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
                                <SC.UserName>
                                    <Link to={`/user/${user.email}`}>{user.name}</Link>
                                </SC.UserName>
                                {userAuth && userAuth.email !== user.email && (
                                    userAuth.friends?.includes(user.email) ? (
                                        <SC.RemoveFriendButton onClick={() => handleRemoveFriend(user.email)}>
                                            Удалить из друзей
                                        </SC.RemoveFriendButton>
                                    ) : (
                                        <SC.AddFriendButton onClick={() => handleAddFriend(user.email)}>
                                            Добавить в друзья
                                        </SC.AddFriendButton>
                                    )
                                )}
                            </SC.UserDetails>
                        </SC.UserInfo>
                    </SC.UserCard>
                ))}
            </SC.UserList>
        </Container>
    )
}