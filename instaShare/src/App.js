import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import Login from './components/Login'

import Home from './components/Home'

import MyProfile from './components/MyProfile'

import UserProfile from './components/UserProfile'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

import InstaShareContext from './context/InstaShareContext'

import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class App extends Component {
  state = {
    status: apiStatusConstants.initial,
    searchedData: [],
    isSearchButtonClicked: false,
  }

  onClickSearch = async searchInput => {
    this.setState({status: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.posts.map(eachPost => ({
        postId: eachPost.post_id,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        profilePic: eachPost.profile_pic,
        postDetails: {
          imageUrl: eachPost.post_details.image_url,
          caption: eachPost.post_details.caption,
        },
        likesCount: eachPost.likes_count,
        comments: eachPost.comments.map(eachItem => ({
          userId: eachItem.user_id,
          userName: eachItem.user_name,
          comment: eachItem.comment,
        })),
        createdAt: eachPost.created_at,
      }))
      this.setState({
        searchedData: updatedData,
        status: apiStatusConstants.success,
      })
      if (searchInput !== '') {
        this.setState({isSearchButtonClicked: true})
      }
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  onClickLogo = () => {
    this.setState({isSearchButtonClicked: false})
  }

  render() {
    const {
      searchInput,
      searchedData,
      status,
      isSearchButtonClicked,
    } = this.state
    return (
      <InstaShareContext.Provider
        value={{
          searchInput,
          searchedData,
          status,
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
