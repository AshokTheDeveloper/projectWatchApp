import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import {FaSearch} from 'react-icons/fa'

import {GiHamburgerMenu} from 'react-icons/gi'

import {IoIosCloseCircle} from 'react-icons/io'

import InstaShareContext from '../../context/InstaShareContext'

import './index.css'

class Header extends Component {
  state = {
    showHamburger: false,
    searchInput: '',
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

  render() {
    const {showHamburger, searchInput} = this.state
    return (
      <InstaShareContext.Consumer>
        {value => {
          const {onClickSearch, returnHome} = value

          const onClickSearchIcon = () => {
            onClickSearch(searchInput)
            this.setState({searchInput: ''})
          }

          const onClickLogo = () => {
            returnHome()
          }

          return (
            <>
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

                      <h1 className="header-logo-name">Insta Share</h1>
                    </div>
                  </button>
                </Link>
                <ul className="nav-items-container">
                  <li className="list-item">
                    <div className="search-input-container">
                      <input
                        type="search"
                        className="search-input"
                        placeholder="Search Caption"
                        onChange={this.onSearchInputChange}
                        value={searchInput}
                      />
                      <button
                        type="button"
                        aria-label="search button"
                        className="search-button"
                        testid="searchIcon"
                        onClick={onClickSearchIcon}
                      >
                        <FaSearch className="search-icon" />
                      </button>
                    </div>
                  </li>
                  <li className="list-item">
                    <Link to="/" className="links">
                      <h1 className="nav-link">Home</h1>
                    </Link>
                  </li>
                  <li className="list-item">
                    <Link to="/my-profile" className="links">
                      <h1 className="nav-link user-profile">Profile</h1>
                    </Link>
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
              <hr className="separator" />
            </>
          )
        }}
      </InstaShareContext.Consumer>
    )
  }
}

export default withRouter(Header)
