import React, {useState} from "react"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import {useApiRequest} from '../../../../hooks/useApiRequest.js'
import {Comments} from "./components/Comments/index.jsx"
import * as SC from './styles.js'

export const PostList = ({postList, updatePostList, show}) => {
    const [editMode, setEditMode] = useState(null)
    const [editText, setEditText] = useState('')
    const [viewMode, setViewMode] = useState('all')

    const user = useSelector((state) => state.user.user)
    const apiRequest = useApiRequest()

    const filteredPosts = postList?.filter((post) => {
        if (viewMode === 'all') {
            if (user?.isAdmin) {
                return true
            }

            return (
                post.visibility === 'public' ||
                (post.visibility === 'friends' &&
                    (user?.friends?.includes(post.login) || post.login === user?.email))
            )
        } else if (viewMode === 'friends') {
            return (
                (post.visibility === 'public' && user?.friends?.includes(post.login)) ||
                (post.visibility === 'friends' &&
                    user?.friends?.includes(post.login) &&
                    post.login !== user?.email)
            )
        }
        return false
    })

    const hasFriends = user?.friends?.length > 0

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
            {user && show && <SC.ToggleContainer>
                <button
                    onClick={() => setViewMode('all')}
                    disabled={viewMode === 'all'}
                >
                    Все посты
                </button>
                <button
                    onClick={() => setViewMode('friends')}
                    disabled={viewMode === 'friends'}
                >
                    Только друзья
                </button>
            </SC.ToggleContainer>}

            {!filteredPosts?.length && !hasFriends && viewMode === 'friends' && (
                <SC.Placeholder>У вас пока нет друзей, чтобы просматривать их посты</SC.Placeholder>
            )}

            {!filteredPosts?.length && hasFriends && viewMode === 'friends' && (
                <SC.Placeholder>У ваших друзей пока нет постов</SC.Placeholder>
            )}

            {!filteredPosts?.length && viewMode === 'all' && <SC.Placeholder>Пока нет постов</SC.Placeholder>}

            <SC.PostListContainer>
                {filteredPosts
                    .slice()
                    .reverse()
                    .map((item) => {
                        const canEdit = user && (user.email === item.login)
                        const canEditOrDelete = user && (user.email === item.login || user.isAdmin)

                        return (
                            <SC.PostItem key={item._id}>
                                <SC.Header>
                                    <SC.Name>
                                        <Link to={`/user/${item.login}`}>{item.author}</Link>
                                    </SC.Name>
                                    <SC.ButtonContainer>
                                        {canEdit && (
                                            <>
                                                {editMode === item._id ? (
                                                    <button
                                                        onClick={() => savePostItem(item._id)}
                                                        disabled={!editText.trim()}
                                                    >
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
                                            <SC.Button onClick={() => deletePostItem(item._id)}>
                                                X
                                            </SC.Button>
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
                                <Comments postId={item._id} />
                            </SC.PostItem>
                        )
                    })}
            </SC.PostListContainer>
        </>
    )
}