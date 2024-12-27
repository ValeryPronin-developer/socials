import {useSelector} from 'react-redux'

export const useToastTheme = () => {
    const theme = useSelector((state) => state.theme.theme)
    return theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : 'colored'
}