import styled from "styled-components"

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 400px;
    margin: 50px auto;
`

export const Input = styled.input`
    padding: 15px;
    border-radius: 10px;
    width: 92%;

    &:focus {
        border-color: #535bf2;
        outline: none;
    }
`

export const ShowPasswordButton = styled.button`
    position: absolute !important;
    right: 6px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    background: none !important;
    border: none !important;
    
    &:focus {
        outline: none !important;
    }

    &:hover {
        color: #535bf2 !important;
    }
`