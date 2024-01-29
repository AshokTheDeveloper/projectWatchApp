import {Link} from 'react-router-dom'
import './index.css'
import InstaShareContext from '../../context/InstaShareContext'

const Comments = props => {
  const {commentDetails} = props
  const {comment, userName, userId} = commentDetails
  return (
    <InstaShareContext.Consumer>
      {value => {
        const {isModeOn} = value

        // Dark theme feature
        const darkCommentUsername = isModeOn ? 'dark-comment-username' : ''
        const darkComment = isModeOn ? 'dark-comment' : ''
        return (
          <li className="comments-item">
            <Link to={`users/${userId}`} className="user-name-link">
              <span className={`comment-user-name ${darkCommentUsername}`}>
                {userName}
              </span>
            </Link>
            <p className={`comment-text ${darkComment}`}>{comment}</p>
          </li>
        )
      }}
    </InstaShareContext.Consumer>
  )
}

export default Comments
