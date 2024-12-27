import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useApiRequest} from "../../hooks/useApiRequest.js"
import * as SC from "./styles"

export const RegistrationPage = () => {
    const [formData, setFormData] = useState({name: "", email: "", password: ""})
    const [errors, setErrors] = useState({name: [], email: [], password: []})
    const [showPassword, setShowPassword] = useState(false)
    const apiRequest = useApiRequest()
    const navigate = useNavigate()

    const validateForm = () => {
        let newErrors = {name: [], email: [], password: []}

        if (formData.name.length < 2) {
            newErrors.name.push("Минимум 2 символа")
        }
        if (!/^[А-ЯЁA-Z]/.test(formData.name.trim())) {
            newErrors.name.push("Должно начинаться с заглавной буквы")
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,5}$/
        if (!emailRegex.test(formData.email)) {
            newErrors.email.push("Некорректный формат")
        }

        if (formData.password.length < 4) {
            newErrors.password.push("Минимум 4 символа")
        }
        if (!/[A-Z]/.test(formData.password)) {
            newErrors.password.push("Хотя бы одна заглавная буква")
        }
        if (!/\d/.test(formData.password)) {
            newErrors.password.push("Хотя бы одна цифра")
        }

        setErrors(newErrors)

        return Object.keys(newErrors).every((key) => newErrors[key].length === 0)
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
                {errors.name.length > 0 && (
                    <SC.ErrorText>
                        <div>Имя:</div>
                        {errors.name.map((error, index) => (
                            <div key={index}>- {error}</div>
                        ))}
                    </SC.ErrorText>
                )}
            </SC.InputWrapper>
            <SC.InputWrapper>
                <SC.Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email.length > 0 && (
                    <SC.ErrorText>
                        <div>Email:</div>
                        {errors.email.map((error, index) => (
                            <div key={index}>- {error}</div>
                        ))}
                    </SC.ErrorText>
                )}
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
                {errors.password.length > 0 && (
                    <SC.ErrorText>
                        <div>Пароль:</div>
                        {errors.password.map((error, index) => (
                            <div key={index}>- {error}</div>
                        ))}
                    </SC.ErrorText>
                )}
            </SC.InputWrapper>
            <button disabled={!isFormValid}>Зарегистрироваться</button>
        </SC.Form>
    )
}