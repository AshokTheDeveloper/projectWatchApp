import Styled from 'styled-components'

export const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #eef4f7;
  padding: 24px;
`
export const Heading = Styled.h1`
  font-family: 'Roboto';
  color: #334155;
  text-align: center;
  border-bottom: 2px solid #52bbf0;
  padding-bottom: 4px;
  margin-bottom: 32px;
`
export const LoaderContainer = Styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const CountriesContainer = Styled.ul`
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
