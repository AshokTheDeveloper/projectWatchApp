import Styled from 'styled-components'

import {Link} from 'react-router-dom'

export const Container = Styled.li`
  list-style-type: none;
  width: 30%;
  margin-left: 24px;
  margin-bottom: 32px;
`
export const GameThumbnail = Styled.img`
  width: 100%;
  margin: 0px;
`
export const GameTitle = Styled.p`
  font-family: 'Roboto';
  font-weight: 600px;
  margin-top: 16px;
  margin-bottom: 24px;
  color: ${props => props.color};
`

export const WatchStatus = Styled(GameTitle)`
  font-weight: 500px;
  color: ${props => props.color};
`

export const GameVideoLink = Styled(Link)`
  text-decoration: none;
`
