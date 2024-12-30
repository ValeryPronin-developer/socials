import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {useApiRequest} from "../../hooks/useApiRequest.js"
import {login} from "../../redux/slices/userSlices.js"
import {Loading} from "../../components/ui/Loading/index.jsx";
import * as SC from "./styles"

export const AuthPage = () => {
    const [formData, setFormData] = useState({email: "", password: ""})
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const apiRequest = useApiRequest()

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleCheckboxChange = (e) => {
        setRememberMe(e.target.checked)
        localStorage.setItem("rememberMe", e.target.checked)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = await apiRequest({
                url: "http://localhost:3002/api/auth/login",
                method: "POST",
                body: formData,
            })

            const storageKey = rememberMe ? "localStorage" : "sessionStorage"

            window[storageKey].setItem("user", JSON.stringify({
                name: data.name,
                isAdmin: data.isAdmin,
                token: data.token,
                email: data.email,
                friends: data.friends,
                receivedRequests: data.receivedRequests,
                sentRequests: data.sentRequests,
            }))

            dispatch(login({
                name: data.name,
                isAdmin: data.isAdmin,
                token: data.token,
                email: data.email,
                friends: data.friends,
                receivedRequests: data.receivedRequests,
                sentRequests: data.sentRequests,
            }))

            navigate("/posts")
        } catch (e) {
            console.error(e)
        }
    }

    if (user) {
        return <Loading/>
    }

    const isFormValid = formData.email.trim() !== "" && formData.password.trim() !== ""

    return (
        <SC.Form onSubmit={handleSubmit}>
            <SC.Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <div style={{position: "relative"}}>
                <SC.Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                />
                <SC.ShowPasswordButton
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "Скрыть" : "Показать"}
                </SC.ShowPasswordButton>
            </div>
            <label>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleCheckboxChange}
                />
                Запомнить меня
            </label>
            <button disabled={!isFormValid}>Войти</button>
        </SC.Form>
    )
}