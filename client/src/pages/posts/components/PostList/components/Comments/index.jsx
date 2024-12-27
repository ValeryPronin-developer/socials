import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {toast} from "react-toastify"
import {useApiRequest} from "../../../../../../hooks/useApiRequest.js"
import * as SC from './styles.js'

export const Comments = ({postId}) => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [editMode, setEditMode] = useState(null)
    const [editText, setEditText] = useState('')

    const user = useSelector((state) => state.user.user)
    const apiRequest = useApiRequest()

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await apiRequest({url: `http://localhost:3002/api/comments/${postId}`})
                setComments(data)
            } catch (error) {
                console.error('Ошибка при загрузке комментариев:', error)
                toast.error("Ошибка при загрузке комментариев")
            }
        }

        fetchComments()
    }, [postId, apiRequest])

    const handleAddComment = async () => {
        try {
            const data = await apiRequest({
                url: 'http://localhost:3002/api/comments/add',
                method: 'POST',
                body: {
                    content: newComment,
                    author: user.name,
                    login: user.email,
                    postId,
                },
            })

            setComments((prev) => [...prev, data.comment])
            setNewComment('')
            toast.success("Комментарий добавлен")
        } catch (error) {
            console.error('Ошибка при добавлении комментария:', error)
            toast.error("Ошибка при добавлении комментария")
        }
    }

    const deleteCommentItem = async (id) => {
        try {
            await apiRequest({
                url: "http://localhost:3002/api/comments/delete",
                method: "delete",
                body: {id},
            })

            setComments((prev) => prev.filter((comment) => comment._id !== id))
            toast.success("Комментарий удалён")
        } catch (e) {
            console.error(e)
            toast.error("Ошибка при удалении комментария")
        }
    }

    const saveCommentItem = async (id) => {
        try {
            const res = await apiRequest({
                url: "http://localhost:3002/api/comments/update",
                method: "PUT",
                body: {id, content: editText},
            })

            if (!res) {
                toast.error("Ошибка при обновлении комментария")
                return
            }

            setComments((prev) =>
                prev.map((comment) =>
                    comment._id === id ? {...comment, content: editText} : comment
                )
            )

            setEditMode(null)
            toast.success("Комментарий обновлён")
        } catch (e) {
            console.error(e)
            toast.error("Ошибка при обновлении комментария")
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

    const handleNewCommentChange = (e) => {
        if (e.target.value.length <= 100) {
            setNewComment(e.target.value)
        }
    }

    const handleEditTextChange = (e) => {
        if (e.target.value.length <= 100) {
            setEditText(e.target.value)
        }
    }

    return (
        <SC.ContainerComment>
            <SC.Title>Комментарии</SC.Title>
            {comments.length > 0 ? (
                comments.map((comment) => {
                    const canEdit = user && user.email === comment.login;
                    const canEditOrDelete = user && (user.email === comment.login || user.isAdmin);

                    return (
                        <SC.CommentBox key={comment._id}>
                            <SC.Header>
                                <div>
                                    <Link to={`/user/${comment.login}`}>{comment.author}</Link>
                                </div>
                                <SC.ButtonContainer>
                                    {canEdit && (
                                        <>
                                            {editMode === comment._id ? (
                                                <button
                                                    onClick={() => saveCommentItem(comment._id)}
                                                    disabled={!editText.trim()}
                                                >
                                                    Сохранить
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        setEditMode(comment._id);
                                                        setEditText(comment.content);
                                                    }}
                                                >
                                                    Редактировать
                                                </button>
                                            )}
                                        </>
                                    )}
                                    {canEditOrDelete && (
                                        <SC.Button onClick={() => deleteCommentItem(comment._id)}>
                                            X
                                        </SC.Button>
                                    )}
                                </SC.ButtonContainer>
                            </SC.Header>
                            {editMode === comment._id ? (
                                <SC.EditInput
                                    value={editText}
                                    onChange={handleEditTextChange}
                                />
                            ) : (
                                <SC.CommentContent>{comment.content}</SC.CommentContent>
                            )}
                            <SC.Date>{formatDate(comment.createdAt)}</SC.Date>
                        </SC.CommentBox>
                    );
                })
            ) : (
                <SC.NoComments>Комментариев пока нет</SC.NoComments>
            )}
            {user && (
                <>
                    <SC.Input
                        type="text"
                        value={newComment}
                        onChange={handleNewCommentChange}
                        placeholder="Введите комментарий"
                    />
                    <button onClick={handleAddComment} disabled={!newComment.trim()}>Добавить</button>
                </>
            )}
        </SC.ContainerComment>
    )
}