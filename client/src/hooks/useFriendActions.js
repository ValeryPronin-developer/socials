import {toast} from "react-toastify"
import {useDispatch, useSelector} from "react-redux"
import {updateFriends} from "../redux/slices/userSlices.js"
import {useApiRequest} from "./useApiRequest.js"

export const useFriendActions = () => {
    const userAuth = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const apiRequest = useApiRequest()

    const handleSendRequest = async (friendEmail) => {
        try {
            await apiRequest({
                url: 'http://localhost:3002/api/users/send-request',
                method: 'post',
                body: {currentEmail: userAuth.email, friendEmail}
            })

            const updatedSentRequests = [...(userAuth.sentRequests || []), friendEmail]
            dispatch(updateFriends({...userAuth, sentRequests: updatedSentRequests}))
            toast.success("Заявка отправлена")
        } catch (e) {
            toast.error("Ошибка при отправке заявки")
        }
    }

    const handleAcceptRequest = async (friendEmail) => {
        try {
            await apiRequest({
                url: 'http://localhost:3002/api/users/accept-request',
                method: 'post',
                body: {currentEmail: userAuth.email, friendEmail}
            })

            const updatedFriends = [...userAuth.friends, friendEmail]
            const updatedRequests = userAuth.receivedRequests.filter((email) => email !== friendEmail)
            dispatch(updateFriends({
                ...userAuth,
                friends: updatedFriends,
                receivedRequests: updatedRequests
            }))
            toast.success("Заявка принята")
        } catch (e) {
            toast.error("Ошибка при принятии заявки")
        }
    }

    const handleRejectRequest = async (friendEmail) => {
        try {
            await apiRequest({
                url: 'http://localhost:3002/api/users/reject-request',
                method: 'post',
                body: {currentEmail: userAuth.email, friendEmail}
            })

            const updatedRequests = userAuth.receivedRequests.filter((email) => email !== friendEmail)
            dispatch(updateFriends({
                ...userAuth,
                receivedRequests: updatedRequests
            }))
            toast.success("Заявка отклонена")
        } catch (e) {
            toast.error("Ошибка при отклонении заявки")
        }
    }

    const handleCancelRequest = async (friendEmail) => {
        try {
            await apiRequest({
                url: 'http://localhost:3002/api/users/cancel-request',
                method: 'post',
                body: {currentEmail: userAuth.email, friendEmail}
            })

            const updatedSentRequests = userAuth.sentRequests.filter(email => email !== friendEmail)
            dispatch(updateFriends({...userAuth, sentRequests: updatedSentRequests}))
            toast.success("Заявка отменена")
        } catch (e) {
            toast.error("Ошибка при отмене заявки")
        }
    }

    const handleRemoveFriend = async (friendEmail) => {
        try {
            await apiRequest({
                url: 'http://localhost:3002/api/users/remove-friend',
                method: 'post',
                body: {currentEmail: userAuth.email, friendEmail}
            })

            const updatedFriends = userAuth.friends.filter((email) => email !== friendEmail)
            dispatch(updateFriends({...userAuth, friends: updatedFriends}))
            toast.success("Пользователь удален из друзей")
        } catch (e) {
            console.error(e)
            toast.error("Произошла ошибка при удалении из друзей")
        }
    }

    return {
        handleSendRequest,
        handleAcceptRequest,
        handleRejectRequest,
        handleCancelRequest,
        handleRemoveFriend
    }
}