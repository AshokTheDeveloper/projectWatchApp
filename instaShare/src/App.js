import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import MyProfile from './components/MyProfile'

import UserProfile from './components/UserProfile'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

import InstaShareContext from './context/InstaShareContext'

import './App.css'

class App extends Component {
  state = {
    isSearchButtonClicked: false,
    searchInput: '',
  }

  onClickSearch = async input => {
    if (input !== '') {
      this.setState({isSearchButtonClicked: true})
      this.setState({searchInput: input})
    }
  }

  onClickLogo = () => {
    this.setState({isSearchButtonClicked: false})
  }

  render() {
    const {searchInput, isSearchButtonClicked} = this.state
    return (
      <InstaShareContext.Provider
        value={{
          searchInput,
          isSearchButtonClicked,
          onClickSearch: this.onClickSearch,
          returnHome: this.onClickLogo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <Route path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </InstaShareContext.Provider>
    )
  }
}

export default App
