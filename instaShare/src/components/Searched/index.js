import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Post from '../Post'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Searched extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: props.searchInput,
      apiStatus: apiStatusConstants.initial,
      searchResults: [],
    }
  }

  componentDidMount() {
    this.getSearchedPosts()
  }

  getSearchedPosts = async () => {
    const {searchInput} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})
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
        searchResults: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLikedPost = async (postId, likeStatus) => {
    const {searchResults} = this.state
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
    let userPostsData = searchResults
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
    this.setState({searchResults: userPostsData})
  }

  renderSearchedPostsList = () => {
    const {searchResults} = this.state

    return (
      <div className="searched-posts-bg-container">
        <div className="searched-posts-heading-container">
          <h1 className="searched-posts-heading">Search Results</h1>
        </div>
        <ul className="post-container">
          {searchResults.map(eachItem => (
            <Post
              key={eachItem.postId}
              post={eachItem}
              onLikedPost={this.onClickLikedPost}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="searched-posts-failure-container">
      <img
        src="https://res.cloudinary.com/daecqm1j8/image/upload/v1706111954/Group_7737_v1esnf.svg"
        alt="failure view"
        className="searched-failure-image"
      />
      <p className="searched-posts-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="searched-failure-try-again-button"
        onClick={this.getSearchedPosts}
      >
        Try again
      </button>
    </div>
  )

  // --------------------TEST ID HERE ------------------

  renderLoadingView = () => (
    <div className="searched-posts-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" width={50} height={50} />
    </div>
  )

  renderNoSearchedResultsView = () => (
    <div className="no-search-results-container">
      <img
        src="https://res.cloudinary.com/daecqm1j8/image/upload/v1706101673/Group_cvsqqf.svg"
        alt="search not found"
        className="no-search-image"
      />
      <h1 className="no-search-results-heading">Search Not Found</h1>
      <p className="no-search-results-description">
        Try different keyword or search again
      </p>
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state
    // const apiStatus = apiStatusConstants.failure
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSearchedPostsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderResult = () => {
    const {searchResults, apiStatus} = this.state
    if (
      searchResults.length === 0 &&
      apiStatus === apiStatusConstants.success
    ) {
      return this.renderNoSearchedResultsView()
    }
    return this.renderResultView()
  }

  render() {
    return <>{this.renderResult()}</>
  }
}

export default Searched
