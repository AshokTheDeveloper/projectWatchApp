import {Component} from 'react'

import Cookies from 'js-cookie'

import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import SideBar from '../SideBar'

import VideoPlayer from '../VideoPlayer'

import WatchAppContext from '../../context/WatchAppContext'

import {
  Container,
  VideoDetailsContainer,
  VideoTitle,
  ViewsAndLikesContainer,
  ViewsContainer,
  ViewsAndCount,
  LikesContainer,
  Button,
  HorizontalLine,
  ProfileAndSubscribersContainer,
  Profile,
  ChannelAndSubscribersContainer,
  ChannelName,
  Subscribers,
  VideoDescription,
  LoaderContainer,
} from './styledComponents'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetailsObj: {},
    like: false,
    dislike: false,
    saved: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      this.setState({
        videoDetailsObj: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onLikeVideo = () => {
    this.setState(prevState => ({like: !prevState.like, dislike: false}))
  }

  onDisLikeVideo = () => {
    this.setState(prevState => ({dislike: !prevState.dislike, like: false}))
  }

  renderVideoItemDetails = () => {
    const {videoDetailsObj, like, dislike, saved} = this.state
    const {
      videoUrl,
      title,
      viewCount,
      publishedAt,
      channel,
      description,
    } = videoDetailsObj
    return (
      <WatchAppContext.Consumer>
        {value => {
          const {isDarkModeOn, saveVideo, savedVideosList} = value
          const onClickSaveVideo = () => {
            const isSaved = savedVideosList.some(
              eachItem => eachItem.isSaved === true,
            )

            this.setState({saved: true})
            saveVideo(videoDetailsObj)
            if (isSaved) {
              this.setState({saved: true})
            }
          }
          return (
            <>
              <VideoDetailsContainer bgColor={isDarkModeOn}>
                <VideoPlayer videoUrl={videoUrl} />
                <VideoTitle color={isDarkModeOn}>{title}</VideoTitle>
                <ViewsAndLikesContainer>
                  <ViewsContainer>
                    <ViewsAndCount color={isDarkModeOn}>
                      {viewCount} Views
                    </ViewsAndCount>
                    <ViewsAndCount color={isDarkModeOn}>
                      {publishedAt}
                    </ViewsAndCount>
                  </ViewsContainer>
                  <LikesContainer>
                    <Button
                      type="button"
                      color={isDarkModeOn}
                      onClick={this.onLikeVideo}
                      liked={like}
                    >
                      <BiLike className="like-dislike-save" />
                      Like
                    </Button>
                    <Button
                      type="button"
                      color={isDarkModeOn}
                      onClick={this.onDisLikeVideo}
                      liked={dislike}
                    >
                      <BiDislike className="like-dislike-save" />
                      Dislike
                    </Button>
                    <Button
                      type="button"
                      color={isDarkModeOn}
                      onClick={onClickSaveVideo}
                      liked={saved}
                    >
                      <BiListPlus className="like-dislike-save" />
                      Save
                    </Button>
                  </LikesContainer>
                </ViewsAndLikesContainer>
                <HorizontalLine color={isDarkModeOn} />
                <ProfileAndSubscribersContainer>
                  <Profile src={channel.profileImageUrl} alt="profile" />
                  <ChannelAndSubscribersContainer>
                    <ChannelName color={isDarkModeOn}>
                      {channel.name}
                    </ChannelName>
                    <Subscribers color={isDarkModeOn}>
                      {channel.subscriberCount} Subscribers
                    </Subscribers>
                  </ChannelAndSubscribersContainer>
                </ProfileAndSubscribersContainer>
                <VideoDescription color={isDarkModeOn}>
                  {description}
                </VideoDescription>
              </VideoDetailsContainer>
            </>
          )
        }}
      </WatchAppContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <WatchAppContext.Consumer>
      {value => {
        const {isDarkModeOn} = value
        return (
          <LoaderContainer className="loader-container" data-testid="loader">
            <Loader
              type="ThreeDots"
              color={isDarkModeOn ? '#ffffff' : '#000000'}
              height="50"
              width="50"
            />
          </LoaderContainer>
        )
      }}
    </WatchAppContext.Consumer>
  )

  renderFailureView = () => (
    <div>
      <h1>Failure...</h1>
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <WatchAppContext.Consumer>
        {value => {
          const {isDarkModeOn} = value
          return (
            <>
              <Header />
              <Container bgColor={isDarkModeOn}>
                <SideBar />
                {this.renderResultView()}
              </Container>
            </>
          )
        }}
      </WatchAppContext.Consumer>
    )
  }
}

export default VideoItemDetails
