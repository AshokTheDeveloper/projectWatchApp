import './index.css'

const Comments = props => {
  const {commentDetails} = props
  const {comment, userName} = commentDetails
  return (
    <li className="comments-item">
      <h1 className="comment-user-name">{userName}</h1>
      <p className="comment-text">{comment}</p>
    </li>
  )
}

export default Comments
