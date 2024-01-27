import {Link} from 'react-router-dom'
import './index.css'

const Comments = props => {
  const {commentDetails} = props
  const {comment, userName, userId} = commentDetails
  return (
    <li className="comments-item">
      <Link to={`users/${userId}`} className="user-name-link">
        <span className="comment-user-name">{userName}</span>
      </Link>
      <p className="comment-text">{comment}</p>
    </li>
  )
}

export default Comments
