import './index.css'
import InstaShareContext from '../../context/InstaShareContext'

const StoriesItem = props => {
  const {storyDetails} = props
  const {storyUrl, userName} = storyDetails
  return (
    <InstaShareContext.Consumer>
      {value => {
        const {isModeOn} = value

        // Dark theme feature
        const storyDarkUsername = isModeOn ? 'story-dark-username' : ''
        return (
          <li className="story-item">
            <div className="home-story-image-container">
              <img src={storyUrl} alt="user story" className="story-image" />
            </div>
            <p className={`user-name ${storyDarkUsername}`}>{userName}</p>
          </li>
        )
      }}
    </InstaShareContext.Consumer>
  )
}

export default StoriesItem
