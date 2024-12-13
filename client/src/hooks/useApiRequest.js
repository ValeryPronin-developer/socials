import { useCallback } from 'react'

export const useApiRequest = () => {
    return useCallback(async ({ url, method = 'GET', body = null }) => {
        try {
            const options = {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
            if (body) {
                options.body = JSON.stringify(body)
            }

            const response = await fetch(url, options)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка при выполнении запроса')
            }

            return data
        } catch (error) {
            console.error('Ошибка:', error.message)
            alert(error.message)
            throw error
        }
    }, [])
}