import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsGrid3X3} from 'react-icons/bs'

import {BiCamera} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import UserPosts from '../UserPosts'

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
        <div className="user-profile-image-container">
          <img
            src={profilePic}
            alt="user profile"
            className="user-profile-pic"
          />
        </div>
        <div className="user-profile-details-container">
          <h1 className="user-profile-user-name">{userName}</h1>
          <ul className="user-followers-count-container">
            <li className="user-profile-items">
              <p className="user-profile-post-follower-following">
                <span className="highlight-user-followers">{postsCount} </span>
                posts
              </p>
            </li>
            <li className="user-profile-items">
              <p className="user-profile-post-follower-following">
                <span className="highlight-user-followers">
                  {followersCount}
                </span>
                followers
              </p>
            </li>
            <li className="user-profile-items">
              <p className="user-profile-post-follower-following">
                <span className="highlight-user-followers">
                  {followingCount}
                </span>
                following
              </p>
            </li>
          </ul>
          <div>
            <p className="user-profile-user-id">{userId}</p>
            <p className="user-profile-user-bio">{userBio}</p>
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
                <UserPosts key={eachItem.id} postDetails={eachItem} />
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
        onClick={this.getUserProfile}
      >
        Try again
      </button>
    </div>
  )
  // --------------------TEST ID HERE ------------------

  renderUserDetailsLoadingView = () => (
    <div className="user-profile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state
    // const apiStatus = apiStatusConstants.inProgress
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
