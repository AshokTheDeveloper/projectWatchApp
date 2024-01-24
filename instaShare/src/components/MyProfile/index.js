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
    const {storiesData} = this.state
    return (
      <>
        <ul className="my-profile-stories-container">
          {storiesData.map(eachStory => (
            <li key={eachStory.id} className="story-image-container">
              <img src={eachStory.image} alt="my story" className="my-story" />
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderMyPosts = () => {
    const {myProfilePosts} = this.state
    return (
      <div className="my-post-bg-container">
        <div className="my-posts-heading-container">
          <img
            src="https://res.cloudinary.com/daecqm1j8/image/upload/v1705988588/Frame_1420_gzrnyo.svg"
            className="post-college-icon"
            alt="college icon"
          />
          <h1 className="my-posts-heading">Posts</h1>
        </div>
        <ul className="my-posts-container">
          {myProfilePosts.map(eachItem => (
            <MyPosts key={eachItem.id} postDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderMyProfilePosts = () => (
    <>
      {this.renderProfile()}
      {this.renderMyProfileStories()}
      {this.renderMyPosts()}
    </>
  )

  renderMyProfileFailureView = () => (
    <div>
      <h1>failure</h1>
    </div>
  )

  renderMyProfileLoadingView = () => (
    <div className="my-profile-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state
    // const apiStatus = apiStatusConstants.inProgress
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
