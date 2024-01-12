import Styled from 'styled-components'

export const Container = Styled.div`
  display: flex;
  height: 100vh;
  background-color: #000000;
`
export const InputContainer = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 30%;
  height: 100vh;
  background-color:  #1a171d;
`
export const InputHeading = Styled.h1`
  font-family: 'Roboto';
  color: #f3aa4e;
  font-weight: 500;
  text-align: center;
  padding-top: 32px;
  margin-bottom: 32px;
`
export const Form = Styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
export const InputLabelContainer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  width: 90%;
`

export const Label = Styled.label`
  font-family: 'Roboto';
  font-size: 14px;
  margin-bottom: 8px;
  color: #ffffff;
`

export const Input = Styled.input`
  width: 100%;
  padding: 8px 16px;
  border: none;
  outline: none;
  border-radius: 4px;
  font-family: 'Roboto';
  font-size: 18px;
  color: #000000;
`
export const Option = Styled.option`
  color:  #000000;
  font-family: 'Roboto';
  font-size: 16px;
`

export const AddButton = Styled.button`
  border: none;
  outline: none;
  background-color: #f3aa4e;
  border-radius: 4px;
  padding: 8px 16px;
  color: #ffffff;
  cursor: pointer;
`
export const TagsAndTasksBgContainer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
  padding: 24px;
  min-height: 100vh;
  overflow-y: scroll;
`
export const TagsContainer = Styled.ul`
  padding: 0px;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
`
export const RightContainerHeading = Styled.h1`
  font-family: 'Roboto';
  color: #ffffff;
  font-weight: 500;
  padding-top: 32px;
  font-size: 18px;
  margin-bottom: 24px;
`

export const TasksContainer = Styled.ul`
  padding: 0px;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 4px;

`
export const NoTasksContainer = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
`
export const NoTaskHeading = Styled.p`
  font-family: 'Roboto';
  color: #f8fafc;
  font-size: 36px;
  font-weight: 500;
`
