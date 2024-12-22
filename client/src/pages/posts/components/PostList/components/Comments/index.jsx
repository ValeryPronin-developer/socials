import React, {useEffect, useState} from 'react'
import * as SC from './styles.js'
import {useApiRequest} from "../../../../../../hooks/useApiRequest.js"
import {useSelector} from "react-redux"

export const Comments = ({postId}) => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [editMode, setEditMode] = useState(null)
    const [editText, setEditText] = useState('')

    const apiRequest = useApiRequest()
    const user = useSelector((state) => state.user.user)

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await apiRequest({url: `http://localhost:3002/api/comments/${postId}`})
                setComments(data)
            } catch (error) {
                console.error('Ошибка при загрузке комментариев:', error)
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
        } catch (error) {
            console.error('Ошибка при добавлении комментария:', error)
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
        } catch (e) {
            console.error(e)
        }
    }

    const saveCommentItem = async (id) => {
        if (!editText.trim()) {
            alert("Заголовок не может быть пустым")
            return
        }

        try {
            const res = await apiRequest({
                url: "http://localhost:3002/api/comments/update",
                method: "PUT",
                body: {id, content: editText},
            })

            if (!res) {
                alert('Ошибка при обновлении')
                return
            }

            setComments((prev) =>
                prev.map((comment) =>
                    comment._id === id ? {...comment, content: editText} : comment
                )
            )

            setEditMode(null)
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
        <SC.Container>
            <SC.Title>Комментарии</SC.Title>
            {comments.length > 0 ? (
                comments.map((comment) => {
                    const canEdit = user && user.email === comment.login;
                    const canEditOrDelete = user && (user.email === comment.login || user.isAdmin);

                    return (
                        <SC.CommentBox key={comment._id}>
                            <SC.Header>
                                <SC.CommentAuthor>{comment.author}</SC.CommentAuthor>
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
                                        <SC.Button onClick={() => deleteCommentItem(comment._id)}>X</SC.Button>
                                    )}
                                </SC.ButtonContainer>
                            </SC.Header>
                            {editMode === comment._id ? (
                                <SC.EditInput
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
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
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Введите комментарий"
                    />
                    <button onClick={handleAddComment} disabled={!newComment.trim()}>Добавить</button>
                </>
            )}
        </SC.Container>
    )
}