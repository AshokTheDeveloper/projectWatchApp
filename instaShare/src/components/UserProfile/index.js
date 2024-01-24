import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import MyPosts from '../MyPosts'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {
    userProfileData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.user_details.id,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
        profilePic: data.user_details.profile_pic,
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        userBio: data.user_details.user_bio,
        postsCount: data.user_details.posts_count,
        posts: data.user_details.posts,
        stories: data.user_details.stories,
      }

      console.log(updatedData)
      this.setState({
        userProfileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfile = () => {
    const {userProfileData} = this.state
    const {
      profilePic,
      userName,
      followersCount,
      followingCount,
      postsCount,
      userId,
      userBio,
    } = userProfileData
    return (
      <div className="profile-details-container">
        <div className="profile-image-container">
          <img
            src={profilePic}
            alt="user profile"
            className="my-profile-image"
          />
        </div>
        <div className="details-container">
          <h1 className="profile-username">{userName}</h1>
          <div className="followers-container">
            <p className="follower-following-posts">
              <span className="post-highlight">{postsCount}</span> posts
            </p>
            <p className="follower-following-posts">
              <span className="post-highlight">{followersCount}</span> followers
            </p>
            <p className="follower-following-posts">
              <span className="post-highlight">{followingCount}</span> following
            </p>
          </div>
          <div className="user-bio-container">
            <p className="user-id">{userId}</p>
            <p className="user-bio">{userBio}</p>
          </div>
        </div>
      </div>
    )
  }

  renderMyProfileStories = () => {
    const {userProfileData} = this.state
    const {stories} = userProfileData
    return (
      <>
        <ul className="user-profile-stories-container">
          {stories.map(eachStory => (
            <li key={eachStory.id} className="story-image-container">
              <img
                src={eachStory.image}
                alt="user story"
                className="user-story"
              />
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderUserPosts = () => {
    const {userProfileData} = this.state
    const {posts} = userProfileData
    return (
      <div className="user-post-bg-container">
        <div className="user-posts-heading-container">
          <img
            src="https://res.cloudinary.com/daecqm1j8/image/upload/v1705988588/Frame_1420_gzrnyo.svg"
            className="post-college-icon"
            alt="college icon"
          />
          <h1 className="user-posts-heading">Posts</h1>
        </div>
        <ul className="user-posts-container">
          {posts.map(eachItem => (
            <MyPosts key={eachItem.id} postDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderUserDetails = () => (
    <div>
      {this.renderProfile()}
      {this.renderMyProfileStories()}
      {this.renderUserPosts()}
    </div>
  )

  renderUserDetailsFailureView = () => (
    <div>
      <h1>Failure view</h1>
    </div>
  )

  renderUserDetailsLoadingView = () => (
    <div className="user-profile-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserDetails()
      case apiStatusConstants.failure:
        return this.renderUserDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderUserDetailsLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="user-profile-bg-container">
          {this.renderResultView()}
        </div>
      </>
    )
  }
}

export default UserProfile
