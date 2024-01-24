import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'

// import {FcLike} from 'react-icons/fc'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

import './index.css'

const Post = props => {
  const {post} = props
  const {
    userId,
    profilePic,
    userName,
    postDetails,
    likesCount,
    createdAt,
  } = post
  return (
    <li className="post-item">
      <div>
        <div className="profile-and-username">
          <div className="profile-bg-container">
            <img
              src={profilePic}
              alt="post author profile"
              className="profile-image"
            />
          </div>
          <Link to={`/users/${userId}`} className="post-links">
            <h1 className="user-name">{userName}</h1>
          </Link>
        </div>
        <div className="post-image-container">
          <img src={postDetails.imageUrl} alt="post" className="post-image" />
        </div>
        <div className="post-description-container">
          <div className="likes-container">
            <button
              type="button"
              aria-label="heart icon"
              data-testid="likeIcon"
              className="post-icon-button"
            >
              <BsHeart size={20} />
            </button>
            {/* <button
              type="button"
              aria-label="heart icon"
              data-testid="unLikeIcon"
              className="post-icon-button"
            >
              <FcLike size={20} />
            </button> */}
            <button
              type="button"
              aria-label="comments"
              className="post-icon-button"
            >
              <FaRegComment size={20} />
            </button>
            <button
              type="button"
              aria-label="share icon"
              className="post-icon-button"
            >
              <BiShareAlt size={20} />
            </button>
          </div>
          <div className="caption-container">
            <p className="likes-count">{likesCount} likes</p>
            <p className="caption">{postDetails.caption}</p>
            <p className="created-time">{createdAt}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default Post
