import React, { useState } from "react"
import { useApiRequest } from "../../hooks/useApiRequest.js"
import * as SC from "./styles"
import {useNavigate} from "react-router-dom";

export const RegistrationPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" })
    const apiRequest = useApiRequest()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await apiRequest({
                url: "http://localhost:3002/api/auth/register",
                method: "POST",
                body: formData,
            })

            navigate("/auth")
            setFormData({ name: "", email: "", password: "" })
        } catch (e) {
            console.error(e)
        }
    }

    const isFormValid = formData.email.trim() !== "" && formData.password.trim() !== "" && formData.name.trim() !== ""

    return (
        <SC.Form onSubmit={handleSubmit}>
            <SC.Input
                type="text"
                name="name"
                placeholder="Имя пользователя"
                value={formData.name}
                onChange={handleChange}
            />
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
            <button disabled={!isFormValid}>Зарегистрироваться</button>
        </SC.Form>
    )
}
