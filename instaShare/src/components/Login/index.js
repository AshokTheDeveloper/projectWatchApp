import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showError: false,
  }

  onLoginSuccessful = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.onLoginSuccessful(data.jwt_token)
    } else {
      const data = await response.json()
      this.onLoginFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderImageContainer = () => (
    <div className="login-image-container">
      <img
        src="https://res.cloudinary.com/daecqm1j8/image/upload/v1705745276/Insta_share/Layer_2_lksru2.svg"
        alt="website login"
        className="login-image"
      />
    </div>
  )

  renderInputContainer = () => {
    const {username, password, showError, errorMsg} = this.state
    return (
      <div className="input-container">
        <div className="login-logo-container">
          <img
            src="https://res.cloudinary.com/daecqm1j8/image/upload/v1705745660/Insta_share/logo_ljirdy.svg"
            alt="website logo"
            className="login-logo"
          />
          <h1 className="logo-name">Insta Share</h1>
          <form onSubmit={this.onSubmitForm}>
            <div className="input-and-label-container">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                className="input"
                placeholder="Username"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-and-label-container">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                id="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        {this.renderImageContainer()}
        {this.renderInputContainer()}
      </div>
    )
  }
}

export default Login
