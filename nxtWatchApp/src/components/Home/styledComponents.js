import Styled from 'styled-components'

export const Container = Styled.div`
  display: flex;
`
export const FeaturesSection = Styled.div`
  display: flex;
  flex-direction: column; 
  width: 20%;
  background-color: ${props => (props.bgColor ? '#212121' : '#ffffff')};
  min-height: 100vh;
  padding-top: 32px;
`
export const HomeContentSection = Styled.div`
  width: 80%;
  padding: 32px;
  background: black;
`
