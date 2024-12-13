import {useState} from "react"
import { useApiRequest } from '../../../../hooks/useApiRequest.js'
import * as SC from './styles.js'

export const AddPostItem = ({updatePostList}) => {
    const [title, setTitle] = useState('')

    const apiRequest = useApiRequest()

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            await apiRequest({
                url: "http://localhost:3002/api/posts/add",
                method: "post",
                body: { title }
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
            <button>Добавить</button>
        </SC.Form>
    )
}