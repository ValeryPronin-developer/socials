import {useApiRequest} from '../../../../hooks/useApiRequest.js'
import * as SC from './styles.js'
import {useSelector} from "react-redux";

export const PostList = ({postList, updatePostList}) => {
    const apiRequest = useApiRequest()
    const user = useSelector((state) => state.user.user)

    const deletePostItem = async (id) => {
        try {
            await apiRequest({
                url: "http://localhost:3002/api/posts/delete",
                method: "delete",
                body: {id}
            })

            updatePostList()
        } catch (e) {
            console.error(e)
        }
    }

    const editPostItem = async (id, currentTitle) => {
        const newTitle = prompt("Введите новый заголовок", currentTitle)
        if (!newTitle) return

        try {
            const res = await apiRequest({
                url: "http://localhost:3002/api/posts/update",
                method: "PUT",
                body: {id, newTitle},
            })

            if (!res) {
                alert('Ошибка при обновлении')
                return
            }

            updatePostList()
        } catch (e) {
            console.error(e)
        }
    }

    return <>
        {
            !postList.length && <>Loading...</>
        }
        <SC.PostListContainer>
            {
                postList
                    .slice()
                    .reverse()
                    .map((item) => <SC.PostItem key={item._id}>
                        <SC.Header>
                            <SC.Name>{item.name || "Без имени"}</SC.Name>
                            <SC.ButtonContainer>
                                {user && <button onClick={() => editPostItem(item._id, item.title)}>Редактировать</button>}
                                {user && user.isAdmin && <SC.Button onClick={() => deletePostItem(item._id)}>X</SC.Button>}
                            </SC.ButtonContainer>
                        </SC.Header>
                        <SC.PostText>{item.title}</SC.PostText>
                    </SC.PostItem>)
            }
        </SC.PostListContainer>
    </>
}