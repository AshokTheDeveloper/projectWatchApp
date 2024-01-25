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

class MyProfile extends Component {
  state = {
    profileData: [],
    storiesData: [],
    myProfilePosts: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
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
        id: data.profile.id,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        posts: data.profile.posts,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        stories: data.profile.stories,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
      }
      this.setState({
        profileData: updatedData,
        storiesData: updatedData.stories,
        myProfilePosts: updatedData.posts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfile = () => {
    const {profileData} = this.state
    const {
      profilePic,
      userName,
      followersCount,
      followingCount,
      postsCount,
      userId,
      userBio,
    } = profileData
    return (
      <div className="my-profile-details-container">
        <h1 className="my-profile-username-mobile">{userName}</h1>
        <div className="my-profile-image-container">
          <img src={profilePic} alt="my profile" className="my-profile-pic" />
          <ul className="my-followers-container-mobile">
            <li className="mobile-post-followers-following">
              <p>
                <span className="post-highlight mobile">{postsCount}</span>
                posts
              </p>
            </li>
            <li className="mobile-post-followers-following">
              <p>
                <span className="post-highlight mobile">{followersCount}</span>
                followers
              </p>
            </li>
            <li className="mobile-post-followers-following">
              <p>
                <span className="post-highlight mobile">{followingCount}</span>
                following
              </p>
            </li>
          </ul>
        </div>
        <div className="my-details-container">
          <h1 className="my-profile-username">{userName}</h1>
          <ul className="my-followers-container">
            <li className="followers-container">
              <p>
                <span className="post-highlight">{postsCount}</span>
                posts
              </p>
            </li>
            <li className="followers-container">
              <p>
                <span className="post-highlight">{followersCount}</span>
                followers
              </p>
            </li>
            <li className="followers-container">
              <p>
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
    const {storiesData, myProfilePosts} = this.state
    const lengthOfPosts = myProfilePosts.length
    return (
      <>
        {lengthOfPosts === 0 ? (
          ''
        ) : (
          <ul className="my-profile-stories-container">
            {storiesData.map(eachStory => (
              <li className="my-story-image-container" key={eachStory.id}>
                <img
                  src={eachStory.image}
                  alt="my story"
                  className="my-profile-story"
                />
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }

  renderMyPosts = () => {
    const {myProfilePosts} = this.state
    const lengthOfPosts = myProfilePosts.length
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
              {myProfilePosts.map(eachItem => (
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
        <h1 className="my-profile-no-posts-heading">No Posts</h1>
      </div>
    </div>
  )

  renderMyProfilePosts = () => (
    <>
      {this.renderProfile()}
      {this.renderMyProfileStories()}
      {this.renderMyPosts()}
    </>
  )

  renderMyProfileFailureView = () => (
    <div className="my-profile-failure-container">
      <img
        src="https://res.cloudinary.com/daecqm1j8/image/upload/v1706111954/Group_7737_v1esnf.svg"
        alt="failure view"
        className="my-profile-failure-image"
      />
      <p className="my-profile-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="my-profile-try-again-button"
        onClick={this.getMyProfile}
      >
        Try again
      </button>
    </div>
  )

  renderMyProfileLoadingView = () => (
    <div className="my-profile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state
    // const apiStatus = apiStatusConstants.failure
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMyProfilePosts()
      case apiStatusConstants.failure:
        return this.renderMyProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderMyProfileLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="my-profile-container">{this.renderResultView()}</div>
      </>
    )
  }
}

export default MyProfile
