import {Switch, Route, Redirect} from 'react-router-dom'

import {Component} from 'react'

import Login from './components/Login'

import ProtectedRoute from './components/ProtectedRoute'

import Home from './components/Home'

import NotFound from './components/NotFound'

import WatchAppContext from './context/WatchAppContext'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDarkModeOn: false,
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({isDarkModeOn: !prevState.isDarkModeOn}))
  }

  render() {
    const {isDarkModeOn} = this.state
    return (
      <WatchAppContext.Provider
        value={{
          isDarkModeOn,
          toggleDarkMode: this.toggleDarkMode,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </WatchAppContext.Provider>
    )
  }
}

export default App
