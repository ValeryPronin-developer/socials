import React, {useState, useCallback, useEffect,} from 'react';
import {PostList} from './components/PostList'
import {useGetPostList} from "../../hooks/useGetPostList.js";
import {AddPostItem} from "./components/AddPostItem";
import {Container} from "../../components/Container";
import * as SC from "./styles.js";
import {useSelector} from "react-redux";

export const PostsPage = () => {
    const [postList, setPostList] = useState([])

    const user = useSelector((state) => state.user.user)
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
                <PostList postList={postList} updatePostList={updatePostList}/>
            </SC.Posts>
        </Container>
    )
}