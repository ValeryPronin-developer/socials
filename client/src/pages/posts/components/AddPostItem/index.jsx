import React, {useState} from "react"
import {useSelector} from "react-redux"
import {toast} from "react-toastify"
import {useApiRequest} from '../../../../hooks/useApiRequest.js'
import * as SC from './styles.js'

export const AddPostItem = ({updatePostList}) => {
    const [title, setTitle] = useState('')
    const [visibility, setVisibility] = useState('public')

    const user = useSelector((state) => state.user.user)
    const apiRequest = useApiRequest()

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            await apiRequest({
                url: "http://localhost:3002/api/posts/add",
                method: "post",
                body: {title, author: user.name, login: user.email, visibility}
            })

            updatePostList()
            setTitle('')
            setVisibility('public')
            toast.success("Пост добавлен")
        } catch (e) {
            console.error(e)
            toast.error("Ошибка при добавлении комментария")
        }
    }

    const handleChange = (e) => {
        if (e.target.value.length <= 300) {
            setTitle(e.target.value)
        }
    }

    return (
        <SC.Form onSubmit={onSubmit}>
            <SC.Textarea
                type="text"
                placeholder="Пост"
                value={title}
                onChange={handleChange}
            />
            <SC.Select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
            >
                <option value="public">Публичный</option>
                <option value="friends">Приватный</option>
            </SC.Select>
            <button disabled={!title.trim()}>Добавить</button>
        </SC.Form>
    )
}