import React, {useState, useCallback, useEffect,} from 'react';
import {PostList} from './components/PostList'
import {useGetPostList} from "../../hooks/useGetPostList.js";
import {AddPostItem} from "./components/AddPostItem";
import {Container} from "../Container/index.jsx";
import * as SC from "./styles.js";

export const Posts = () => {
    const [postList, setPostList] = useState([])

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
                <AddPostItem updatePostList={updatePostList}/>
                <PostList postList={postList} updatePostList={updatePostList}/>
            </SC.Posts>
        </Container>
    )
}