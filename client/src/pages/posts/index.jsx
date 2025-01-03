import React, {useState, useCallback, useEffect,} from 'react'
import {useSelector} from "react-redux"
import {useGetPostList} from "../../hooks/useGetPostList.js"
import {AddPostItem} from "./components/AddPostItem"
import {PostList} from './components/PostList'
import {Container} from "../../components/Container"
import * as SC from "./styles.js"
import {ToastContainer} from "react-toastify";
import {useToastTheme} from "../../hooks/useToastTheme.js";

export const PostsPage = () => {
    const [postList, setPostList] = useState([])

    const user = useSelector((state) => state.user.user)
    const toastTheme = useToastTheme()
    const getPostList = useGetPostList()

    const updatePostList = useCallback(() => {
        getPostList().then((result) => setPostList(result.posts))
    }, [getPostList])

    useEffect(() => {
        updatePostList()
    }, [updatePostList])

    return (
        <Container>
            <SC.Posts>
                <SC.Title>Посты</SC.Title>
                {user && <AddPostItem updatePostList={updatePostList}/>}
                <PostList postList={postList} updatePostList={updatePostList} show={true}/>
            </SC.Posts>
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