import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Slider from 'react-slick'

import Header from '../Header'

import StoriesItem from '../StoriesItem'

import Post from '../Post'

import Searched from '../Searched'

import InstaShareContext from '../../context/InstaShareContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    storiesData: [],
    postsData: [],
    apiStatus: apiStatusConstants.initial,
    storyApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getStories()
    this.getPosts()
  }

  // Get Stories API

  getStories = async () => {
    this.setState({storyApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.users_stories.map(eachItem => ({
        userId: eachItem.user_id,
        userName: eachItem.user_name,
        storyUrl: eachItem.story_url,
      }))
      this.setState({
        storiesData: updatedData,
        storyApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({storyApiStatus: apiStatusConstants.failure})
    }
  }

  renderStories = () => {
    const {storiesData} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {storiesData.map(eachStory => (
            <StoriesItem key={eachStory.userId} storyDetails={eachStory} />
          ))}
        </Slider>
      </div>
    )
  }

  onClickStoryTryAgain = () => {
    this.getStories()
  }

  // --------------------TEST ID HERE ------------------

  renderStoriesLoadingView = () => (
    <div className="stories-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" width={30} height={30} />
    </div>
  )

  renderStoriesFailureView = () => (
    <div className="stories-failure-container">
      <img
        src="https://res.cloudinary.com/daecqm1j8/image/upload/v1705918903/alert-triangle_vlifhx.svg"
        alt="failure view"
        className="story-failure-image"
      />
      <p className="story-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="story-try-again-button"
        onClick={this.onClickStoryTryAgain}
      >
        Try again
      </button>
    </div>
  )

  renderStoriesResultView = () => {
    const {storyApiStatus} = this.state
    // const storyApiStatus = apiStatusConstants.failure
    switch (storyApiStatus) {
      case apiStatusConstants.success:
        return this.renderStories()
      case apiStatusConstants.failure:
        return this.renderStoriesFailureView()
      case apiStatusConstants.inProgress:
        return this.renderStoriesLoadingView()
      default:
        return null
    }
  }

  // Get Post API

  getPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.posts.map(eachItem => ({
        comments: eachItem.comments.map(eachComment => ({
          comment: eachComment.comment,
          userId: eachComment.user_id,
          userName: eachComment.user_name,
        })),

        createdAt: eachItem.created_at,
        likesCount: eachItem.likes_count,
        postDetails: {
          caption: eachItem.post_details.caption,
          imageUrl: eachItem.post_details.image_url,
        },
        postId: eachItem.post_id,
        profilePic: eachItem.profile_pic,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
      }))
      this.setState({
        postsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgainPost = () => {
    this.getPosts()
  }

  // liked post api function
  onClickLikedPost = async (postId, likeStatus) => {
    const {postsData} = this.state
    const likedStatusDetails = {
      like_status: likeStatus,
    }
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      body: JSON.stringify(likedStatusDetails),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    let userPostsData = postsData
    userPostsData = userPostsData.map(eachObject => {
      if (eachObject.postId === postId && likeStatus === true) {
        return {
          ...eachObject,
          message: data.message,
          likesCount: eachObject.likesCount + 1,
        }
      }
      if (eachObject.postId === postId && likeStatus === false) {
        return {
          ...eachObject,
          message: data.message,
          likesCount: eachObject.likesCount - 1,
        }
      }

      return eachObject
    })
    this.setState({postsData: userPostsData})
  }

  renderPosts = () => {
    const {postsData} = this.state
    return (
      <>
        <ul className="post-container">
          {postsData.map(eachItem => (
            <Post
              key={eachItem.postId}
              post={eachItem}
              onLikedPost={this.onClickLikedPost}
            />
          ))}
        </ul>
      </>
    )
  }

  // --------------------TEST ID HERE ------------------

  renderPostsLoading = () => (
    <div className="posts-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" width={50} height={50} />
    </div>
  )

  renderPostsFailure = () => (
    <div className="posts-failure-container">
      <img
        src="https://res.cloudinary.com/daecqm1j8/image/upload/v1705918903/alert-triangle_vlifhx.svg"
        alt="failure view"
        className="home-failure-image"
      />
      <p className="home-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="home-failure-try-again-button"
        onClick={this.onClickTryAgainPost}
      >
        Try again
      </button>
    </div>
  )

  renderPostsResult = () => {
    const {apiStatus} = this.state
    // const apiStatus = apiStatusConstants.failure
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPosts()
      case apiStatusConstants.failure:
        return this.renderPostsFailure()
      case apiStatusConstants.inProgress:
        return this.renderPostsLoading()
      default:
        return null
    }
  }

  renderFinalView = () => (
    <>
      {this.renderStoriesResultView()}
      {this.renderPostsResult()}
    </>
  )

  renderResult = () => (
    <InstaShareContext.Consumer>
      {value => {
        const {
          searchedData,
          status,
          isSearchButtonClicked,
          setSuccess,
          setLoading,
          setFailure,
        } = value
        if (isSearchButtonClicked === true) {
          return (
            <Searched
              status={status}
              searchedData={searchedData}
              setSuccess={setSuccess}
              setFailure={setFailure}
              setLoading={setLoading}
            />
          )
        }
        return this.renderFinalView()
      }}
    </InstaShareContext.Consumer>
  )

  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">{this.renderResult()}</div>
      </>
    )
  }
}

export default Home
