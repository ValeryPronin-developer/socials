import {useState} from "react"
import { useApiRequest } from '../../../../hooks/useApiRequest.js'
import * as SC from './styles.js'
import {useSelector} from "react-redux";

export const AddPostItem = ({updatePostList}) => {
    const [title, setTitle] = useState('')
    const user = useSelector((state) => state.user.user)

    const apiRequest = useApiRequest()

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            await apiRequest({
                url: "http://localhost:3002/api/posts/add",
                method: "post",
                body: { title, author: user.name, login: user.email }
            })

            updatePostList()
            setTitle('')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <SC.Form onSubmit={onSubmit}>
            <SC.Textarea type="text" placeholder="пост" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <button disabled={!title.trim()}>Добавить</button>
        </SC.Form>
    )
}