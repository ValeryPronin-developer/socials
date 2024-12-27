import styled from 'styled-components'

export const ContainerComment = styled.div`
    padding: 20px;
    border-top: 1px solid #555;
`

export const Title = styled.h2`
    font-size: 1.3em;
    margin-block: 10px;
`

export const CommentBox = styled.div`
    margin-bottom: 15px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin-bottom: 10px;
`

export const EditInput = styled.textarea`
    width: 97%;
    min-height: 67px;
    padding: 10px 12px;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 4px;
    outline: none;
    resize: vertical;
    transition: border-color 0.3s;

    &:focus {
        border-color: #535bf2;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

export const Button = styled.button`
    border: none !important;
    border-radius: 4px !important;
    transition: background-color 0.3s !important;
    background-color: #e74c3c !important;

    &:hover {
        background-color: #c0392b !important;
    }
`

export const CommentContent = styled.p`
    margin: 5px 0 0;
    word-wrap: break-word;
    word-break: break-word;
    max-width: 100%;
    white-space: normal;
`

export const Input = styled.input`
    width: calc(100% - 22px);
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;

    &:focus {
        border-color: #535bf2;
        outline: none;
    }
`

export const NoComments = styled.div`
    text-align: center;
    color: #555;
    margin: 20px 0;
`

export const Date = styled.div`
    font-size: 14px;
    color: #888;
    margin-top: 5px;
    text-align: end;
`