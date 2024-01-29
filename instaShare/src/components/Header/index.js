import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import {FaSearch, FaMoon} from 'react-icons/fa'

import {GiHamburgerMenu} from 'react-icons/gi'

import {IoIosCloseCircle} from 'react-icons/io'

import {IoSunnyOutline} from 'react-icons/io5'

import InstaShareContext from '../../context/InstaShareContext'

import './index.css'

class Header extends Component {
  state = {
    showHamburger: false,
    searchInput: '',
    showSearchBar: false,
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickHamburger = () => {
    this.setState({showHamburger: true})
  }

  onClickCloseNavbar = () => {
    this.setState({showHamburger: false})
  }

  onSearchInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onMobileInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {showHamburger, searchInput, showSearchBar} = this.state
    return (
      <InstaShareContext.Consumer>
        {value => {
          const {
            onClickSearch,
            returnHome,
            onClickMobileSearchBar,
            onChangeMode,
            isModeOn,
            onClickTab,
            activeOption,
          } = value

          const onClickSearchIcon = () => {
            onClickSearch(searchInput)
            this.setState({searchInput: ''})
          }

          // mobile

          const onClickMobileSearch = () => {
            onClickMobileSearchBar(searchInput)
            this.setState({showSearchBar: true, showHamburger: false})
          }

          const onClickMobileSearchIcon = () => {
            onClickMobileSearchBar(searchInput)
            this.setState({searchInput: ''})
          }

          const onClickEnter = event => {
            if (event.key === 'Enter') {
              onClickMobileSearchBar(searchInput)
              this.setState({searchInput: ''})
            }
          }

          const onClickMobileSearchClose = () => {
            this.setState({showSearchBar: false})
            returnHome()
          }

          const onClickLogo = () => {
            returnHome()
          }

          const onClickChangeMode = () => {
            onChangeMode()
          }

          const onClickHome = () => {
            onClickTab('home')
          }

          const onClickProfile = () => {
            onClickTab('profile')
          }

          // Dark Theme feature
          const logoDarkMode = isModeOn ? 'dark-mode-header-logo-name' : ''
          const darkModeSearchInput = isModeOn ? 'dark-mode-input' : ''
          const searchButtonMode = isModeOn ? 'search-button-dark-mode' : ''
          const modeOption = isModeOn ? 'on-dark-mode-option' : ''

          const homeTab = activeOption === 'home' ? 'home-tab' : null
          const profileTab = activeOption === 'profile' ? 'profile-tab' : null
          const headerDarkMode = isModeOn ? 'header-dark-bg-container' : ''
          const darkModeButton = isModeOn ? 'dark-mode-button' : ''

          const darkModeSeparator = isModeOn ? 'dark-mode-separator' : ''

          // Mobile dark mode feature
          const mobileDarkModeButton = isModeOn
            ? 'mobile-dark-mode-button-bg'
            : ''

          return (
            <>
              <div className={`header-bg-container ${headerDarkMode}`}>
                <div className="header">
                  <Link to="/" className="links">
                    <button
                      type="button"
                      onClick={onClickLogo}
                      className="logo-button"
                    >
                      <div className="header-logo-container">
                        <img
                          src="https://res.cloudinary.com/daecqm1j8/image/upload/v1705745660/Insta_share/logo_ljirdy.svg"
                          alt="website logo"
                          className="logo"
                        />

                        <h1 className={`header-logo-name ${logoDarkMode}`}>
                          Insta Share
                        </h1>
                      </div>
                    </button>
                  </Link>
                  <ul className="nav-items-container">
                    <li className="list-item">
                      <div
                        className={`search-input-container ${darkModeSearchInput}`}
                      >
                        <input
                          type="search"
                          className={`search-input ${darkModeSearchInput}`}
                          placeholder="Search Caption"
                          onChange={this.onSearchInputChange}
                          value={searchInput}
                          onKeyDown={onClickEnter}
                        />
                        <button
                          type="button"
                          aria-label="search button"
                          className={`search-button ${searchButtonMode}`}
                          // --------------------TEST ID HERE ------------------
                          data-testid="searchIcon"
                          onClick={onClickSearchIcon}
                        >
                          <FaSearch className="search-icon" />
                        </button>
                      </div>
                    </li>
                    <li className="list-item">
                      <button
                        type="button"
                        className={`mode-button ${darkModeButton}`}
                        aria-label="mode"
                        onClick={onClickChangeMode}
                      >
                        {isModeOn === true ? (
                          <IoSunnyOutline className="mode-icon dark-mode" />
                        ) : (
                          <FaMoon className="mode-icon light-mode" />
                        )}
                      </button>
                    </li>
                    <li className="list-item">
                      <button
                        type="button"
                        className="header-home-profile"
                        onClick={onClickHome}
                      >
                        <Link to="/" className="links">
                          <h1 className={`nav-link ${homeTab} ${modeOption}`}>
                            Home
                          </h1>
                        </Link>
                      </button>
                    </li>
                    <li className="list-item">
                      <button
                        type="button"
                        className="header-home-profile"
                        onClick={onClickProfile}
                      >
                        <Link to="/my-profile" className="links">
                          <h1
                            className={`nav-link ${profileTab} ${modeOption}`}
                          >
                            Profile
                          </h1>
                        </Link>
                      </button>
                    </li>
                    <li className="list-item">
                      <button
                        type="button"
                        className="nav-link logout-button"
                        onClick={this.onClickLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                  <div className="mobile-nav-links">
                    <button
                      type="button"
                      className={`mobile-dark-mode-button ${mobileDarkModeButton}`}
                      onClick={onClickChangeMode}
                    >
                      {isModeOn === true ? (
                        <IoSunnyOutline className="mobile-mode-icon mobile-dark-mode" />
                      ) : (
                        <FaMoon className="mobile-mode-icon mobile-light-mode" />
                      )}
                    </button>
                    <button
                      type="button"
                      aria-label="logout button"
                      onClick={this.onClickHamburger}
                      className="hamburger-button"
                    >
                      <GiHamburgerMenu size={24} color="#262626" />
                    </button>
                  </div>
                </div>

                {showHamburger && (
                  <ul className="mobile-nav-items">
                    <li className="list-item mobile-nav-links-container">
                      <li className="list-item mobile-item">
                        <Link to="/" className="links">
                          <button type="button" className="mobile-nav-link">
                            Home
                          </button>
                        </Link>
                      </li>
                      <li className="list-item mobile-item">
                        <button
                          type="button"
                          aria-label="search button"
                          className="mobile-nav-link"
                          onClick={onClickMobileSearch}
                          // --------------------TEST ID HERE ------------------
                          data-testid="searchIcon"
                        >
                          Search
                        </button>
                      </li>
                      <li className="list-item mobile-item">
                        <Link to="/my-profile" className="links">
                          <button type="button" className="mobile-nav-link">
                            Profile
                          </button>
                        </Link>
                      </li>
                      <li className="list-item mobile-item">
                        <button
                          type="button"
                          className="mobile-logout-button"
                          onClick={this.onClickLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </li>
                    <li className="list-item">
                      <button
                        type="button"
                        aria-label="close icon"
                        onClick={this.onClickCloseNavbar}
                        className="close-button"
                      >
                        <IoIosCloseCircle size={24} />
                      </button>
                    </li>
                  </ul>
                )}

                {showSearchBar && (
                  <div className="mobile-input-container">
                    <input
                      type="search"
                      className="mobile-input-search-bar"
                      placeholder="Search Caption"
                      value={searchInput}
                      onChange={this.onMobileInputChange}
                      onKeyDown={onClickEnter}
                    />
                    <button
                      type="button"
                      aria-label="mobile close button"
                      className="mobile-close-button"
                      onClick={onClickMobileSearchClose}
                    >
                      <IoIosCloseCircle size={24} color="#DBDBDB" />
                    </button>
                    <button
                      type="button"
                      aria-label="mobile search button"
                      className="mobile-search-button"
                      onClick={onClickMobileSearchIcon}
                    >
                      <FaSearch className="mobile-search-icon" />
                    </button>
                  </div>
                )}
                <hr className={`separator ${darkModeSeparator}`} />
              </div>
            </>
          )
        }}
      </InstaShareContext.Consumer>
    )
  }
}

export default withRouter(Header)
