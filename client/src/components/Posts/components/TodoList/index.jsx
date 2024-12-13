import {useApiRequest} from '../../../../hooks/useApiRequest.js'
import * as SC from './styles.js'

export const TodoList = ({todoList, updateTodoList}) => {
    const apiRequest = useApiRequest()

    const deleteTodoItem = async (id) => {
        try {
            await apiRequest({
                url: "http://localhost:3002/api/todos/delete",
                method: "delete",
                body: {id}
            })

            updateTodoList()
        } catch (e) {
            console.error(e)
        }
    }

    const editTodoItem = async (id, currentTitle) => {
        const newTitle = prompt("Введите новый заголовок", currentTitle)
        if (!newTitle) return

        try {
            const res = await apiRequest({
                url: "http://localhost:3002/api/todos/update",
                method: "PUT",
                body: {id, newTitle},
            })

            if (!res) {
                alert('Ошибка при обновлении')
                return
            }

            updateTodoList()
        } catch (e) {
            console.error(e)
        }
    }

    return <>
        {
            !todoList.length && <>Loading...</>
        }
        <SC.TodoListContainer>
            {
                todoList
                    .slice()
                    .reverse()
                    .map((item) => <SC.TodoItem key={item._id}>
                        <SC.Header>
                            <SC.Name>{item.name || "Без имени"}</SC.Name>
                            <SC.ButtonContainer>
                                <SC.Button onClick={() => editTodoItem(item._id, item.title)}>Редактировать</SC.Button>
                                <SC.Button onClick={() => deleteTodoItem(item._id)}>X</SC.Button>
                            </SC.ButtonContainer>
                        </SC.Header>
                        <SC.TodoText>{item.title}</SC.TodoText>
                    </SC.TodoItem>)
            }
        </SC.TodoListContainer>
    </>
}