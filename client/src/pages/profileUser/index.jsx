import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {useApiRequest} from '../../hooks/useApiRequest.js'
import {useGetPostList} from "../../hooks/useGetPostList.js"
import {updateFriends} from "../../redux/slices/userSlices.js"
import {Container} from "../../components/Container/index.jsx"
import {Loading} from "../../components/ui/Loading/index.jsx"
import {AddPostItem} from "../posts/components/AddPostItem/index.jsx"
import {PostList} from "../posts/components/PostList/index.jsx"
import * as SC from './styles.js'

export const ProfileUserPage = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [userPosts, setUserPosts] = useState([])

    const userAuth = useSelector((state) => state.user.user)
    const {userId} = useParams()
    const apiRequest = useApiRequest()
    const getPostList = useGetPostList()
    const dispatch = useDispatch()

    const updatePostList = useCallback(() => {
        getPostList().then((result) => {
            const filteredPosts = result.posts.filter(post => post.login === userId)
            setUserPosts(filteredPosts)
        })
    }, [getPostList, userId])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await apiRequest({url: `http://localhost:3002/api/users/${userId}`})
                setUser(userData)

                const postsData = await apiRequest({url: `http://localhost:3002/api/posts/list?login=${userId}`})

                const userPosts = postsData.posts.filter(post => post.login === userId)
                setUserPosts(userPosts)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [apiRequest, userId])

    const AddFriend = async (friendEmail) => {
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

    const RemoveFriend = async (friendEmail) => {
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
        return <Loading/>
    }

    if (error) {
        return <Container>Ошибка: {error}</Container>
    }

    return (
        <Container>
            <SC.Title>Профиль пользователя</SC.Title>
            <SC.ProfileContainer>
                <SC.AvatarPlaceholder>
                    <img src="../../../public/person.webp" alt="avatar"/>
                </SC.AvatarPlaceholder>
                <SC.UserDetails>
                    <SC.UserName>{user.name}</SC.UserName>
                    <SC.UserEmail>Email: {user.email}</SC.UserEmail>
                    <SC.SectionTitle>Друзья: {user.friends.length}</SC.SectionTitle>
                </SC.UserDetails>
            </SC.ProfileContainer>
            {userAuth && userAuth.email !== user.email && (
                userAuth.friends?.includes(user.email) ? (
                    <SC.RemoveFriendButton onClick={() => RemoveFriend(user.email)}>
                        Удалить из друзей
                    </SC.RemoveFriendButton>
                ) : (
                    <SC.AddFriendButton onClick={() => AddFriend(user.email)}>
                        Добавить в друзья
                    </SC.AddFriendButton>
                )
            )}

            {userAuth && userAuth.email === userId && <AddPostItem updatePostList={updatePostList}/>}
            {userPosts.length > 0 ? (
                <PostList postList={userPosts} updatePostList={updatePostList} show={false}/>
            ) : (
                <SC.Placeholder>Пока нет постов</SC.Placeholder>
            )}
        </Container>
    )
}