import styled from "styled-components"

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 50px auto;
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 70px;
    
    &:nth-child(2n) {
        margin-left: auto;
    }
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
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;

    &:focus {
        outline: none;
    }

    &:hover {
        color: #535bf2;
    }
`

export const ErrorText = styled.div`
    color: red;
    font-size: 12px;
    margin-top: 1px;
    margin-left: 10px;
`
