import styled from "styled-components";


export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const Textarea = styled.textarea`
    min-height: 68px;
    padding: 10px 12px;
    font-size: 16px;
    border-radius: 4px;
    outline: none;
    resize: vertical;
    transition: border-color 0.3s;

  &:focus {
    border-color: #535bf2;
  }
`

export const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: #535bf2;
    box-shadow: 0 0 5px rgba(83, 91, 242, 0.3);
  }
`