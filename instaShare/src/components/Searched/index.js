import {Component} from 'react'

// import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Post from '../Post'

import './index.css'
import InstaShareContext from '../../context/InstaShareContext'

// import InstaShareContext from '../../context/InstaShareContext'

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
      apiStatus: props.status,
      searchedResultData: props.searchedData,
    }
  }

  renderSearchedPostsList = () => {
    const {searchedResultData} = this.state

    return (
      <div className="searched-posts-bg-container">
        <div className="searched-posts-heading-container">
          <h1 className="searched-posts-heading">Search Results</h1>
        </div>
        <ul className="post-container">
          {searchedResultData.map(eachItem => (
            <Post key={eachItem.postId} post={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderSearchedFailureView = () => (
    <div className="posts-failure-container">
      <img
        src="https://res.cloudinary.com/daecqm1j8/image/upload/v1705918903/alert-triangle_vlifhx.svg"
        alt="home failure"
        className="home-failure-image"
      />
      <h1 className="home-failure-text">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        className="home-failure-try-again-button"
        onClick={this.onClickTryAgainPost}
      >
        Retry
      </button>
    </div>
  )

  renderSearchedLoadingView = () => (
    <div className="posts-loader-container" data-testid="loader">
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
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSearchedPostsList()
      case apiStatusConstants.failure:
        return this.renderSearchedFailureView()
      case apiStatusConstants.inProgress:
        return this.renderSearchedLoadingView()
      default:
        return null
    }
  }

  renderResult = () => (
    <InstaShareContext.Consumer>
      {value => {
        const {searchedData} = value
        if (searchedData.length === 0) {
          return this.renderNoSearchedResultsView()
        }
        return this.renderResultView()
      }}
    </InstaShareContext.Consumer>
  )

  render() {
    return <>{this.renderResult()}</>
  }
}

export default Searched
