import './index.css'

const UserPosts = props => {
  const {postDetails} = props
  const {image} = postDetails
  return (
    <li className="user-post-item">
      <img src={image} alt="user post" className="user-post-image" />
    </li>
  )
}

export default UserPosts
