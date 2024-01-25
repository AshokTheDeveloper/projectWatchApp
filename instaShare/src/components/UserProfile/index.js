import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsGrid3X3} from 'react-icons/bs'

import {BiCamera} from 'react-icons/bi'

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
      this.setState({
        userProfileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getUserProfile()
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
      <div className="my-profile-details-container">
        <h1 className="my-profile-username-mobile">{userName}</h1>
        <div className="my-profile-image-container">
          <img src={profilePic} alt="user profile" className="my-profile-pic" />
          <ul className="my-followers-container-mobile">
            <li className="mobile-post-followers-following">
              <p className="post-highlight mobile">{postsCount}</p>
              <p className="post-followers-following-mobile">posts</p>
            </li>
            <li className="mobile-post-followers-following">
              <p className="post-highlight mobile">{followersCount}</p>
              <p className="post-followers-following-mobile">followers</p>
            </li>
            <li className="mobile-post-followers-following">
              <p className="post-highlight mobile">{followingCount}</p>
              <p className="post-followers-following-mobile">following</p>
            </li>
          </ul>
        </div>
        <div className="my-details-container">
          <h1 className="my-profile-username">{userName}</h1>
          <ul className="my-followers-container">
            <li>
              <p className="follower-following-posts">
                <span className="post-highlight">{postsCount}</span> posts
              </p>
            </li>
            <li>
              <p className="follower-following-posts">
                <span className="post-highlight">{followersCount}</span>
                followers
              </p>
            </li>
            <li>
              <p className="follower-following-posts">
                <span className="post-highlight">{followingCount}</span>
                following
              </p>
            </li>
          </ul>
          <div className="user-bio-container">
            <p className="my-user-id">{userId}</p>
            <p className="my-user-bio">{userBio}</p>
          </div>
        </div>
      </div>
    )
  }

  renderMyProfileStories = () => {
    const {userProfileData} = this.state
    const {stories} = userProfileData
    const lengthOfStories = stories.length

    return (
      <>
        {lengthOfStories === 0 ? (
          ''
        ) : (
          <ul className="my-profile-stories-container">
            {stories.map(eachStory => (
              <li className="my-story-image-container" key={eachStory.id}>
                <img
                  src={eachStory.image}
                  alt="user story"
                  className="my-profile-story"
                />
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }

  renderUserPosts = () => {
    const {userProfileData} = this.state
    const {posts} = userProfileData
    const lengthOfPosts = posts.length

    return (
      <>
        {lengthOfPosts === 0 ? (
          this.renderNoPostsView()
        ) : (
          <div className="my-post-bg-container">
            <div className="my-posts-heading-container">
              <BsGrid3X3 className="post-college-icon" />
              <h1 className="my-posts-heading">Posts</h1>
            </div>
            <ul className="my-profile-posts-container">
              {posts.map(eachItem => (
                <MyPosts key={eachItem.id} postDetails={eachItem} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }

  renderNoPostsView = () => (
    <div className="my-profile-no-posts-view">
      <div className="my-posts-heading-container">
        <BsGrid3X3 className="post-college-icon" />
        <h1 className="my-posts-heading">Posts</h1>
      </div>
      <div className="no-posts-camera-icon-container">
        <div className="camera-icon-container">
          <BiCamera className="camera-icon" />
        </div>
        <h1 className="user-no-posts-heading">No Posts</h1>
      </div>
    </div>
  )

  renderUserDetails = () => (
    <div>
      {this.renderProfile()}
      {this.renderMyProfileStories()}
      {this.renderUserPosts()}
    </div>
  )

  renderUserDetailsFailureView = () => (
    <div className="user-profile-failure-container">
      <img
        src="https://res.cloudinary.com/daecqm1j8/image/upload/v1706111954/Group_7737_v1esnf.svg"
        alt="failure view"
        className="user-profile-failure-image"
      />
      <p className="user-profile-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="user-profile-try-again-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderUserDetailsLoadingView = () => (
    <div className="user-profile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state
    // const apiStatus = apiStatusConstants.failure
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
