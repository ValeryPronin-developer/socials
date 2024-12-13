import {useState} from "react"
import { useApiRequest } from '../../../../hooks/useApiRequest.js'
import * as SC from './styles.js'

export const AddTodoItem = ({updateTodoList}) => {
    const [title, setTitle] = useState('')

    const apiRequest = useApiRequest()

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            await apiRequest({
                url: "http://localhost:3002/api/todos/add",
                method: "post",
                body: { title }
            })

            updateTodoList()
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