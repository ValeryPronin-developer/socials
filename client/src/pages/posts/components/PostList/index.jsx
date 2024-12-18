import {useApiRequest} from '../../../../hooks/useApiRequest.js'
import * as SC from './styles.js'
import {useSelector} from "react-redux"
import {useState} from "react"
import {Loading} from "../../../../components/ui/Loading/index.jsx";

export const PostList = ({postList, updatePostList}) => {
    const apiRequest = useApiRequest()
    const user = useSelector((state) => state.user.user)
    const [editMode, setEditMode] = useState(null)
    const [editText, setEditText] = useState('')

    const deletePostItem = async (id) => {
        try {
            await apiRequest({
                url: "http://localhost:3002/api/posts/delete",
                method: "delete",
                body: {id},
            })

            updatePostList()
        } catch (e) {
            console.error(e)
        }
    }

    const savePostItem = async (id) => {
        if (!editText.trim()) {
            alert("Заголовок не может быть пустым")
            return
        }

        try {
            const res = await apiRequest({
                url: "http://localhost:3002/api/posts/update",
                method: "PUT",
                body: {id, newTitle: editText},
            })

            if (!res) {
                alert('Ошибка при обновлении')
                return
            }

            setEditMode(null)
            updatePostList()
        } catch (e) {
            console.error(e)
        }
    }

    const formatDate = (isoDate) => {
        if (!isoDate) return "Неизвестно"
        const date = new Date(isoDate)
        return date.toLocaleString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <>
            {!postList?.length && <Loading />}
            <SC.PostListContainer>
                {postList
                    .slice()
                    .reverse()
                    .map((item) => {
                        const canEdit = user && (user.email === item.login)
                        const canEditOrDelete = user && (user.email === item.login || user.isAdmin)

                        return (
                            <SC.PostItem key={item._id}>
                                <SC.Header>
                                    <SC.Name>{item.author || "Без имени"}</SC.Name>
                                    <SC.ButtonContainer>
                                        {canEdit && (
                                            <>
                                                {editMode === item._id ? (
                                                    <button onClick={() => savePostItem(item._id)}>
                                                        Сохранить
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setEditMode(item._id)
                                                            setEditText(item.title)
                                                        }}
                                                    >
                                                        Редактировать
                                                    </button>
                                                )}
                                            </>
                                        )}
                                        {canEditOrDelete && (
                                            <SC.Button onClick={() => deletePostItem(item._id)}>X</SC.Button>
                                        )}
                                    </SC.ButtonContainer>
                                </SC.Header>
                                {editMode === item._id ? (
                                    <SC.EditInput
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                ) : (
                                    <SC.PostText>{item.title}</SC.PostText>
                                )}
                                <SC.Date>{formatDate(item.createdAt)}</SC.Date>
                            </SC.PostItem>
                        )
                    })}
            </SC.PostListContainer>
        </>
    )
}