import Styled from 'styled-components'

export const Container = Styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  background-color: #1a171d;
  padding: 12px;
  width: 100%;
  margin-bottom: 16px;
`
export const Task = Styled.p`
  font-family: 'Roboto';
  color: #ffffff;
  font-weight: 500;
`
export const Tag = Styled.p`
  background-color:  #f3aa4e;
  color: #000000;
  font-family: 'Roboto';
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
`
