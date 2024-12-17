import React, {useEffect, useState} from 'react'
import * as SC from './styles.js'
import {useApiRequest} from '../../hooks/useApiRequest.js'
import {Container} from '../../components/Container/index.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {updateFriends} from '../../redux/slices/userSlices.js'

export const FriendsPage = () => {
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const apiRequest = useApiRequest()
    const userAuth = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const data = await apiRequest({
                    url: `http://localhost:3002/api/users/${userAuth.email}/friends`,
                })
                setFriends(data)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        if (userAuth?.email) {
            fetchFriends()
        }
    }, [apiRequest, userAuth])

    const handleRemoveFriend = async (friendEmail) => {
        try {
            await apiRequest({
                url: 'http://localhost:3002/api/users/remove-friend',
                method: 'post',
                body: {currentEmail: userAuth.email, friendEmail},
            })

            dispatch(updateFriends(userAuth.friends.filter((email) => email !== friendEmail)))
            setFriends(friends.filter((friend) => friend.email !== friendEmail))
        } catch (e) {
            console.error(e)
        }
    }

    if (loading) {
        return <Container>Загрузка...</Container>
    }

    if (error) {
        return <Container>Ошибка: {error}</Container>
    }

    return (
        <Container>
            <SC.Title>Друзья</SC.Title>
            <SC.UserList>
                {friends.map((friend) => (
                    <SC.UserCard key={friend._id}>
                        <SC.UserInfo>
                            <SC.AvatarPlaceholder>
                                <img src="../../../public/person.webp" alt="avatar"/>
                            </SC.AvatarPlaceholder>
                            <SC.UserDetails>
                                <SC.UserName>{friend.name}</SC.UserName>
                                <SC.RemoveFriendButton onClick={() => handleRemoveFriend(friend.email)}>
                                    Удалить из друзей
                                </SC.RemoveFriendButton>
                            </SC.UserDetails>
                        </SC.UserInfo>
                    </SC.UserCard>
                ))}
            </SC.UserList>
        </Container>
    )
}