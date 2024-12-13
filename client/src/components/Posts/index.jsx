import React, {useState, useCallback, useEffect,} from 'react';
import {TodoList} from './components/TodoList'
import {useGetTodoList} from "../../hooks/useGetTodoList.js";
import {AddTodoItem} from "./components/AddTodoItem";
import {Container} from "../Container/index.jsx";
import * as SC from "./styles.js";

export const Posts = () => {
    const [todoList, setTodoList] = useState([])

    const getTodoList = useGetTodoList()

    const updateTodoList = useCallback(() => {
        getTodoList().then((result) => setTodoList(result.todos))
    }, [getTodoList])

    useEffect(() => {
        updateTodoList()
    }, [updateTodoList])

    return (
        <Container>
            <SC.Posts>
                <SC.Title>Посты</SC.Title>
                <AddTodoItem updateTodoList={updateTodoList}/>
                <TodoList todoList={todoList} updateTodoList={updateTodoList}/>
            </SC.Posts>
        </Container>
    )
}