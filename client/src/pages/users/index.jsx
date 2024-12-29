import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {updateFriends} from "../../redux/slices/userSlices.js"
import {toast, ToastContainer} from "react-toastify"
import {Tabs, Box} from '@mui/material'
import {useApiRequest} from '../../hooks/useApiRequest.js'
import {useToastTheme} from "../../hooks/useToastTheme.js"
import {Container} from "../../components/Container/index.jsx"
import {Loading} from "../../components/ui/Loading/index.jsx"
import Person from '../../../public/person.webp'
import * as SC from './styles.js'

export const UsersAndFriendsPage = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [friends, setFriends] = useState([])
    const [activeTab, setActiveTab] = useState(0)

    const userAuth = useSelector((state) => state.user.user)
    const toastTheme = useToastTheme()
    const apiRequest = useApiRequest()
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

        const fetchFriends = async () => {
            if (userAuth?.email) {
                try {
                    const data = await apiRequest({
                        url: `http://localhost:3002/api/users/${userAuth.email}/friends`,
                    })
                    setFriends(data)
                } catch (e) {
                    setError(e.message)
                }
            }
        }

        fetchUsers()
        fetchFriends()
    }, [apiRequest, userAuth, dispatch])

    const handleAddFriend = async (friendEmail) => {
        try {
            await apiRequest({
                url: 'http://localhost:3002/api/users/add-friend',
                method: 'post',
                body: {currentEmail: userAuth.email, friendEmail}
            })
            dispatch(updateFriends([...userAuth.friends, friendEmail]))
            console.log(userAuth.friends)
            toast.success("Пользователь добавлен в друзья")
        } catch (e) {
            console.error(e)
            toast.error("Произошла ошибка при добавлении в друзья")
        }
    }

    const handleRemoveFriend = async (friendEmail) => {
        try {
            await apiRequest({
                url: 'http://localhost:3002/api/users/remove-friend',
                method: 'post',
                body: {currentEmail: userAuth.email, friendEmail}
            })
            dispatch(updateFriends(userAuth.friends.filter((email) => email !== friendEmail)))
            console.log(userAuth.friends)
            toast.success("Пользователь удален из друзей")
        } catch (e) {
            console.error(e)
            toast.error("Произошла ошибка при удалении из друзей")
        }
    }

    if (loading) {
        return <Loading/>
    }

    if (error) {
        return <Container>Ошибка: {error}</Container>
    }

    const Users = () => (
        <SC.UserList>
            {users.map((user) => (
                <SC.UserCard key={user._id}>
                    <SC.UserInfo>
                        <SC.AvatarPlaceholder>
                            <img src={Person} alt="avatar"/>
                        </SC.AvatarPlaceholder>
                        <SC.UserDetails>
                            <SC.UserName>
                                <Link to={`/user/${user.email}`}>{user.name}</Link>
                            </SC.UserName>
                            {userAuth && userAuth.email !== user.email && (
                                userAuth.friends?.includes(user.email) ? (
                                    <SC.RemoveFriendButton
                                        onClick={() => handleRemoveFriend(user.email)}
                                    >
                                        Удалить из друзей
                                    </SC.RemoveFriendButton>
                                ) : (
                                    <SC.AddFriendButton
                                        onClick={() => handleAddFriend(user.email)}
                                    >
                                        Добавить в друзья
                                    </SC.AddFriendButton>
                                )
                            )}
                        </SC.UserDetails>
                    </SC.UserInfo>
                </SC.UserCard>
            ))}
        </SC.UserList>
    )

    const Friends = () => (
        <SC.UserList>
            {friends.length === 0 ? (
                <SC.NoFriendsMessage>У вас пока нет друзей</SC.NoFriendsMessage>
            ) : (
                friends.map((friend) => (
                    <SC.UserCard key={friend.email}>
                        <SC.UserInfo>
                            <SC.AvatarPlaceholder>
                                <img src={Person} alt="avatar"/>
                            </SC.AvatarPlaceholder>
                            <SC.UserDetails>
                                <SC.UserName>
                                    <Link to={`/user/${friend.email}`}>{friend.name}</Link>
                                </SC.UserName>
                                <SC.RemoveFriendButton
                                    onClick={() => handleRemoveFriend(friend.email)}
                                >
                                    Удалить из друзей
                                </SC.RemoveFriendButton>
                            </SC.UserDetails>
                        </SC.UserInfo>
                    </SC.UserCard>
                ))
            )}
        </SC.UserList>
    )

    return (
        <Container>
            <SC.Title>Пользователи</SC.Title>
            <Box>
                <Tabs
                    value={activeTab}
                    onChange={(event, newValue) => setActiveTab(newValue)}
                    aria-label="tabs"
                >
                    <SC.StyledTab theme={toastTheme} label="Все пользователи"/>
                    <SC.StyledTab theme={toastTheme} label="Друзья"/>
                </Tabs>
                {activeTab === 0 && Users()}
                {activeTab === 1 && Friends()}
            </Box>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true}
                closeButton={false}
                theme={toastTheme}
            />
        </Container>
    )
}