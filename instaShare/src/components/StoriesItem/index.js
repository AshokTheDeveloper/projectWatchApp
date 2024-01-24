import './index.css'

const StoriesItem = props => {
  const {storyDetails} = props
  const {storyUrl, userName} = storyDetails
  return (
    <li className="story-item">
      <div className="home-story-image-container">
        <img src={storyUrl} alt="user story" className="story-image" />
      </div>
      <p className="user-name">{userName}</p>
    </li>
  )
}

export default StoriesItem
