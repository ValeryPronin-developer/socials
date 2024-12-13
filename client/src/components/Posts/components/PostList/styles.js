import styled from "styled-components";

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

export const PostText = styled.div`
    word-wrap: break-word;
    word-break: break-word;
    max-width: 100%;
    white-space: normal;
`

export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`

export const Button = styled.button`
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    
    &:last-of-type {
        background-color: #e74c3c;
    }

    &:last-of-type:hover {
        background-color: #c0392b;
    }
`