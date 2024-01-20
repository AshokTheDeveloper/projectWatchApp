import Styled from 'styled-components'

export const TextArea = Styled.textarea`
  width: 100%;
  padding: 12px 16px;
  padding-top: 12px;
  padding-bottom: 40%;
  background: none;
  outline: none;
  border: none;
  color: #cbd5e1;
  font-size: 18px;
  font-weight: ${props => props.bold};
  text-decoration: ${props => props.underline};
  font-style: ${props => props.italic};
  font-family: 'Roboto';
`

export const Button = Styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 18px;
  cursor: pointer;
  margin-right: 16px;
  color: ${props => props.color};
`
