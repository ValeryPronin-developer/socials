import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 400px;
    margin: 50px auto;
`

export const Input = styled.input`
    padding: 15px;
    border-radius: 10px;

    &:focus {
        border-color: #535bf2;
        outline: none;
    }
`