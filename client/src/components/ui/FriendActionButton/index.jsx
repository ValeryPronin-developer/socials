import React from 'react'
import * as SC from './styles'

export const FriendActionButton = ({
                                       userAuth,
                                       user,
                                       handleSendRequest,
                                       handleCancelRequest,
                                       handleAcceptRequest,
                                       handleRejectRequest,
                                       handleRemoveFriend,
                                       marginLeft = '0px'
                                   }) => {
    if (!userAuth || userAuth.email === user.email) {
        return null
    }

    if (userAuth.sentRequests?.includes(user.email)) {
        return (
            <SC.RemoveFriendButton onClick={() => handleCancelRequest(user.email)} style={{marginLeft}}>
                Отменить заявку
            </SC.RemoveFriendButton>
        )
    }

    if (userAuth.receivedRequests?.includes(user.email)) {
        return (
            <SC.ContainerButton>
                <SC.AddFriendButton onClick={() => handleAcceptRequest(user.email)}>
                    Принять
                </SC.AddFriendButton>
                <SC.RemoveFriendButton onClick={() => handleRejectRequest(user.email)}>
                    Отклонить
                </SC.RemoveFriendButton>
            </SC.ContainerButton>
        )
    }

    if (userAuth.friends.includes(user.email)) {
        return (
            <SC.RemoveFriendButton onClick={() => handleRemoveFriend(user.email)} style={{marginLeft}}>
                Удалить из друзей
            </SC.RemoveFriendButton>
        )
    }

    return (
        <SC.AddFriendButton onClick={() => handleSendRequest(user.email)} style={{marginLeft}}>
            Добавить в друзья
        </SC.AddFriendButton>
    )
}