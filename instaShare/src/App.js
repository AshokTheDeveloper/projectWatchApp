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
    showMobileSearchBar: false,
    isModeOn: false,
    activeOption: 'home',
  }

  onClickSearch = input => {
    if (input !== '') {
      this.setState({searchInput: input, isSearchButtonClicked: true})
    }
  }

  onClickMobileSearchBar = input => {
    if (input !== '') {
      this.setState({isSearchButtonClicked: true})
      this.setState({searchInput: input})
    }
    this.setState({showMobileSearchBar: true})
  }

  onClickLogo = () => {
    this.setState({isSearchButtonClicked: false, showMobileSearchBar: false})
  }

  onChangeMode = () => {
    this.setState(prevState => ({isModeOn: !prevState.isModeOn}))
  }

  onClickTab = option => {
    this.setState({activeOption: option})
  }

  render() {
    const {
      searchInput,
      isSearchButtonClicked,
      showMobileSearchBar,
      isModeOn,
      activeOption,
    } = this.state
    return (
      <InstaShareContext.Provider
        value={{
          searchInput,
          isSearchButtonClicked,
          showMobileSearchBar,
          isModeOn,
          activeOption,
          onClickSearch: this.onClickSearch,
          returnHome: this.onClickLogo,
          onClickMobileSearchBar: this.onClickMobileSearchBar,
          onChangeMode: this.onChangeMode,
          onClickTab: this.onClickTab,
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
