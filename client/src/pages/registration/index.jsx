import React, {useState} from "react"
import {useApiRequest} from "../../hooks/useApiRequest.js"
import * as SC from "./styles"
import {useNavigate} from "react-router-dom";

export const RegistrationPage = () => {
    const [formData, setFormData] = useState({name: "", email: "", password: ""})
    const [errors, setErrors] = useState({name: "", email: "", password: ""})
    const [showPassword, setShowPassword] = useState(false)
    const apiRequest = useApiRequest()
    const navigate = useNavigate()

    const validateForm = () => {
        let newErrors = {}

        if (formData.name.trim() === "") {
            newErrors.name = "Имя пользователя обязательно"
        } else if (formData.name.length < 2) {
            newErrors.name = "Имя должно содержать минимум 2 символа"
        } else if (!/^[А-ЯЁA-Z]/.test(formData.name.trim())) {
            newErrors.name = "Имя должно начинаться с заглавной буквы"
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,5}$/
        if (formData.email.trim() === "") {
            newErrors.email = "Email обязателен"
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Некорректный формат email"
        }

        if (formData.password.trim() === "") {
            newErrors.password = "Пароль обязателен"
        } else if (formData.password.length < 4) {
            newErrors.password = "Пароль должен содержать минимум 4 символа"
        } else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = "Пароль должен содержать хотя бы одну заглавную букву"
        } else if (!/\d/.test(formData.password)) {
            newErrors.password = "Пароль должен содержать хотя бы одну цифру"
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            await apiRequest({
                url: "http://localhost:3002/api/auth/register",
                method: "POST",
                body: formData,
            })

            navigate("/auth")
            setFormData({name: "", email: "", password: ""})
        } catch (e) {
            console.error(e)
        }
    }

    const isFormValid = formData.email.trim() !== "" && formData.password.trim() !== "" && formData.name.trim() !== ""

    return (
        <SC.Form onSubmit={handleSubmit}>
            <SC.InputWrapper>
                <SC.Input
                    type="text"
                    name="name"
                    placeholder="Имя пользователя"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <SC.ErrorText>{errors.name}</SC.ErrorText>}
            </SC.InputWrapper>
            <SC.InputWrapper>
                <SC.Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <SC.ErrorText>{errors.email}</SC.ErrorText>}
            </SC.InputWrapper>
            <SC.InputWrapper>
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
                {errors.password && <SC.ErrorText>{errors.password}</SC.ErrorText>}
            </SC.InputWrapper>
            <button disabled={!isFormValid}>Зарегистрироваться</button>
        </SC.Form>
    )
}