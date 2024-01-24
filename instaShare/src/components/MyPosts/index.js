import './index.css'

const MyPosts = props => {
  const {postDetails} = props
  const {image} = postDetails
  return (
    <li className="my-post-item">
      <img src={image} alt="my post" className="my-post-image" />
    </li>
  )
}

export default MyPosts
