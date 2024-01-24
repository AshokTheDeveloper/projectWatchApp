import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Slider from 'react-slick'

import Header from '../Header'

import StoriesItem from '../StoriesItem'

import Post from '../Post'

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
  }

  componentDidMount() {
    this.getStories()
    this.getPosts()
  }

  getStories = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
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
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
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
            <StoriesItem key={eachStory.storyId} storyDetails={eachStory} />
          ))}
        </Slider>
      </div>
    )
  }

  onClickStoryTryAgain = () => {
    this.getStories()
  }

  renderStoriesLoadingView = () => (
    <div className="stories-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" width={30} height={30} />
    </div>
  )

  renderStoriesFailureView = () => (
    <div className="stories-failure-container">
      <button
        type="button"
        className="story-try-again-button"
        onClick={this.onClickStoryTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderStoriesResultView = () => {
    const {apiStatus} = this.state
    // const apiStatus = apiStatusConstants.failure
    switch (apiStatus) {
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
      console.log(updatedData)
      this.setState({
        postsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPosts = () => {
    const {postsData} = this.state
    return (
      <ul className="post-container">
        {postsData.map(eachItem => (
          <Post key={eachItem.postId} post={eachItem} />
        ))}
      </ul>
    )
  }

  renderPostsLoading = () => (
    <div className="posts-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" width={50} height={50} />
    </div>
  )

  renderPostsFailure = () => (
    <div className="posts-failure-container">
      <img
        src="https://res.cloudinary.com/daecqm1j8/image/upload/v1705918903/alert-triangle_vlifhx.svg"
        alt="home failure"
        className="home-failure-image"
      />
      <h1 className="home-failure-text">
        Something went wrong. Please try again
      </h1>
      <button type="button" className="home-failure-try-again-button">
        Try Again
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

  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          {this.renderStoriesResultView()}
          {this.renderPostsResult()}
        </div>
      </>
    )
  }
}

export default Home
