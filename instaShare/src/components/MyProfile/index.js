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
        apiStatus: apiStatusConstants.success,
        profileData: updatedData,
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
      <>
        <div className="my-profile-details-container">
          <div className="my-profile-details-large-container">
            <div className="profile-image-container">
              <img
                src={profilePic}
                alt="my profile"
                className="my-profile-pic"
              />
            </div>
            <div className="my-profile-details">
              <h1 className="my-profile-user-name">{userName}</h1>
              <ul className="followers-count-container">
                <li className="follower-items">
                  <p className="post-count">
                    <span className="highlight-post-follower-following">
                      {postsCount}
                    </span>
                    posts
                  </p>
                </li>
                <li className="follower-items">
                  <p className="follower-count">
                    <span className="highlight-post-follower-following">
                      {followersCount}
                    </span>
                    followers
                  </p>
                </li>
                <li className="follower-items">
                  <p className="following-count">
                    <span className="highlight-post-follower-following">
                      {followingCount}
                    </span>
                    following
                  </p>
                </li>
              </ul>
              <div>
                <p className="my-profile-user-id">{userId}</p>
                <p className="my-profile-user-bio">{userBio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="my-profile-details-mobile-container">
          <h1 className="my-profile-username-mobile">{userName}</h1>
          <div className="profile-mobile-details-container">
            <img src={profilePic} alt="my profile" className="my-profile-pic" />
            <ul className="my-followers-container-mobile">
              <li className="my-profile-mobile-post-followers-following">
                <p className="mobile-post">
                  <span className="post-highlight mobile">{postsCount}</span>
                  posts
                </p>
              </li>
              <li className="my-profile-mobile-post-followers-following">
                <p className="mobile-followers">
                  <span className="post-highlight mobile">
                    {followersCount}
                  </span>
                  followers
                </p>
              </li>
              <li className="my-profile-mobile-post-followers-following">
                <p className="mobile-following">
                  <span className="post-highlight mobile">
                    {followingCount}
                  </span>
                  following
                </p>
              </li>
            </ul>
          </div>
          <div>
            <p className="my-profile-mobile-user-id">{userId}</p>
            <p className="my-profile-mobile-user-bio">{userBio}</p>
          </div>
        </div> */}
      </>
    )
  }

  renderMyProfileStories = () => {
    const {profileData} = this.state
    const lengthOfPosts = profileData.stories.length
    return (
      <>
        {lengthOfPosts === 0 ? (
          ''
        ) : (
          <ul className="my-profile-stories-container">
            {profileData.stories.map(eachStory => (
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
    const {profileData} = this.state
    const lengthOfPosts = profileData.posts.length
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
              {profileData.posts.map(eachItem => (
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

  // --------------------TEST ID HERE ------------------

  renderMyProfileLoadingView = () => (
    <div className="my-profile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state
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
