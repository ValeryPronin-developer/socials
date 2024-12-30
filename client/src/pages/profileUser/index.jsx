import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {ToastContainer} from "react-toastify"
import {useToastTheme} from "../../hooks/useToastTheme.js"
import {useApiRequest} from '../../hooks/useApiRequest.js'
import {useGetPostList} from "../../hooks/useGetPostList.js"
import {useFriendActions} from "../../hooks/useFriendActions.js"
import {FriendActionButton} from "../../components/ui/FriendActionButton/index.jsx"
import {Container} from "../../components/Container/index.jsx"
import {Loading} from "../../components/ui/Loading/index.jsx"
import {AddPostItem} from "../posts/components/AddPostItem/index.jsx"
import {PostList} from "../posts/components/PostList/index.jsx"
import Person from '../../../public/person.webp'
import * as SC from './styles.js'

export const ProfileUserPage = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [userPosts, setUserPosts] = useState([])

    const userAuth = useSelector((state) => state.user.user)
    const {
        handleSendRequest,
        handleAcceptRequest,
        handleRejectRequest,
        handleCancelRequest,
        handleRemoveFriend
    } = useFriendActions()
    const toastTheme = useToastTheme()
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
                    <img src={Person} alt="avatar"/>
                </SC.AvatarPlaceholder>
                <SC.UserDetails>
                    <SC.UserName>{user.name}</SC.UserName>
                    <SC.UserEmail>Email: {user.email}</SC.UserEmail>
                    <SC.SectionTitle>Друзья: {user.friends.length}</SC.SectionTitle>
                </SC.UserDetails>
            </SC.ProfileContainer>
            <FriendActionButton
                userAuth={userAuth}
                user={user}
                handleSendRequest={handleSendRequest}
                handleCancelRequest={handleCancelRequest}
                handleAcceptRequest={handleAcceptRequest}
                handleRejectRequest={handleRejectRequest}
                handleRemoveFriend={handleRemoveFriend}
                marginLeft="40px"
            />
            {userAuth && userAuth.email === userId && <AddPostItem updatePostList={updatePostList}/>}
            {userPosts.length > 0 ? (
                <PostList postList={userPosts} updatePostList={updatePostList} show={false}/>
            ) : (
                <SC.Placeholder>Пока нет постов</SC.Placeholder>
            )}
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