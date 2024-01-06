import Styled from 'styled-components'

export const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  list-style-type: none;
`
export const Feature = Styled.li`
  list-style-type: none;
  width: 100%;
  background-color: ${props => (props.bgColorOne ? 'red' : '')};
`

export const IconContainer = Styled.div`
  margin-left: 24px;
  color: ${props => (props.color ? '#ff0000' : '#909090')};
  font-size: 24px;
`

export const FeatureName = Styled.p`
  font-family: 'Roboto';
  margin-left: 24px;
  font-weight: 400;
  font-size: 16px;
  color: ${props => (props.colorTwo ? '#909090' : 'black')}
`
export const FeatureButton = Styled.button`
  display: flex;
  align-items: center;
  list-style-type: none;
  padding-top: 16px;
  padding-bottom: 16px;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
`
