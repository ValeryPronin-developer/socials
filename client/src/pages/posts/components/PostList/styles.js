import styled from "styled-components";

export const ToggleContainer = styled.div`
    display: flex;
    gap: 10px;
`

export const Placeholder = styled.div`
    text-align: center;
    color: #777;
    margin-top: 20px;
`

export const PostListContainer = styled.div`
    min-width: 1024px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px auto;
`

export const PostItem = styled.div`
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`

export const Name = styled.div`
    font-weight: bold;
    font-size: 20px;
`

export const Date = styled.div`
    font-size: 14px;
    color: #888;
    margin-top: 5px;
    text-align: end;
`

export const PostText = styled.div`
    word-wrap: break-word;
    word-break: break-word;
    max-width: 100%;
    white-space: normal;
`

export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

export const Button = styled.button`
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    background-color: #e74c3c;

    &:hover {
        background-color: #c0392b;
    }
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