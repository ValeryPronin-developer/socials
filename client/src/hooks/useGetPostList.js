import {useCallback} from "react"

export const useGetPostList = () => {
    return useCallback(() => fetch('http://localhost:3002/api/posts/list')
        .then((response) => response.json()
        ), [])
}