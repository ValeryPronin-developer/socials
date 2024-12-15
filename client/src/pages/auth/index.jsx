import React, { useState } from "react"
import { useApiRequest } from "../../hooks/useApiRequest.js"
import * as SC from "./styles"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../../redux/slices/userSlices.js"

export const AuthPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const apiRequest = useApiRequest()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = await apiRequest({
                url: "http://localhost:3002/api/auth/login",
                method: "POST",
                body: formData,
            })

            dispatch(login({ name: data.name, isAdmin: data.isAdmin, token: data.token, email: data.email }))

            navigate("/posts")
        } catch (e) {
            console.error(e)
        }
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
            <button>Войти</button>
        </SC.Form>
    )
}