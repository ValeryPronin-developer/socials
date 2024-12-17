import React, { useState } from "react"
import { useApiRequest } from "../../hooks/useApiRequest.js"
import * as SC from "./styles"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/slices/userSlices.js"
import {Container} from "../../components/Container/index.jsx";

export const AuthPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [rememberMe, setRememberMe] = useState(false)
    const apiRequest = useApiRequest()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
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
                friends: data.friends
            }))

            dispatch(login({ name: data.name, isAdmin: data.isAdmin, token: data.token, email: data.email, friends: data.friends }))

            navigate("/posts")
        } catch (e) {
            console.error(e)
        }
    }

    if (user) {
        return <Container>Загружается...</Container>
    }

    return (
        <SC.Form onSubmit={handleSubmit}>
            <SC.Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <SC.Input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
            />

            <label>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleCheckboxChange}
                />
                Запомнить меня
            </label>

            <button>Войти</button>
        </SC.Form>
    )
}