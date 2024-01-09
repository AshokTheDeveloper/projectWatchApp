import {Link, withRouter} from 'react-router-dom'
import {IoMoonSharp} from 'react-icons/io5'
import {FiSun, FiLogOut} from 'react-icons/fi'
import {GiHamburgerMenu} from 'react-icons/gi'
import Cookies from 'js-cookie'

import WatchAppContext from '../../context/WatchAppContext'

import './index.css'

import {
  Container,
  Logo,
  UList,
  ListItem,
  Profile,
  LogoutButton,
  ModeButton,
  MobileNavbarContainer,
  MobileLogoutButton,
} from './styledComponents'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <WatchAppContext.Consumer>
      {value => {
        const {isDarkModeOn, toggleDarkMode} = value

        const changeTheme = () => {
          toggleDarkMode()
        }

        const mode = isDarkModeOn ? (
          <FiSun className="light-mode" />
        ) : (
          <IoMoonSharp className="dark-mode" />
        )

        const mobileLogoutIcons = isDarkModeOn ? (
          <FiLogOut className="light-icon" />
        ) : (
          <FiLogOut className="dark-icon" />
        )

        const mobileHamburgerMenu = isDarkModeOn ? (
          <GiHamburgerMenu className="light-icon" />
        ) : (
          <GiHamburgerMenu className="dark-icon" />
        )

        const logo = isDarkModeOn
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        return (
          <Container bgColor={isDarkModeOn}>
            <Link to="/">
              <Logo src={logo} alt="nxt watch logo" />
            </Link>
            <UList>
              <ListItem>
                <ModeButton
                  type="button"
                  onClick={changeTheme}
                  data-testid="theme"
                >
                  {mode}
                </ModeButton>
              </ListItem>
              <ListItem>
                <Profile
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </ListItem>
              <ListItem>
                <LogoutButton type="button" onClick={onClickLogout}>
                  Logout
                </LogoutButton>
              </ListItem>
            </UList>
            <MobileNavbarContainer>
              <ListItem>
                <ModeButton type="button" onClick={changeTheme}>
                  {mode}
                </ModeButton>
              </ListItem>
              <ListItem>{mobileHamburgerMenu}</ListItem>
              <ListItem>
                <MobileLogoutButton type="button" onClick={onClickLogout}>
                  {mobileLogoutIcons}
                </MobileLogoutButton>
              </ListItem>
            </MobileNavbarContainer>
          </Container>
        )
      }}
    </WatchAppContext.Consumer>
  )
}

export default withRouter(Header)
