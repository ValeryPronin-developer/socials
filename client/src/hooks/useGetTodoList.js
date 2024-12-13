import {useCallback} from "react";

export const useGetTodoList = () => {
    return useCallback(() => fetch('http://localhost:3002/api/todos/list') .then((response) => response.json()), [])
}