import {Component} from 'react'

import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'

import {FcLike} from 'react-icons/fc'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

import Comments from '../Comments'

import './index.css'

class Post extends Component {
  render() {
    const {post, onLikedPost} = this.props
    const {
      userId,
      profilePic,
      userName,
      postDetails,
      likesCount,
      createdAt,
      postId,
      message,
      comments,
    } = post

    // Initializing liked API
    const makeCallToLikedApi = status => {
      onLikedPost(postId, status)
    }

    const onClickUnLiked = () => {
      makeCallToLikedApi(true)
    }

    const onClickLiked = () => {
      makeCallToLikedApi(false)
    }

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
            <img
              src={postDetails.imageUrl}
              alt="user post"
              className="post-image"
            />
          </div>
          <div className="post-description-container">
            <ul className="likes-container">
              {message === 'Post has been liked' ? (
                <li className="post-icon-buttons">
                  <button
                    type="button"
                    aria-label="heart icon"
                    testid="unLikeIcon"
                    className="post-icon-button"
                    onClick={onClickLiked}
                  >
                    <FcLike className="post-icons liked-heart" />
                  </button>
                </li>
              ) : (
                <li className="post-icon-buttons">
                  <button
                    type="button"
                    aria-label="heart icon"
                    testid="likeIcon"
                    className="post-icon-button"
                    onClick={onClickUnLiked}
                  >
                    <BsHeart className="post-icons" />
                  </button>
                </li>
              )}

              <li className="post-icon-buttons">
                <button
                  type="button"
                  aria-label="comments"
                  className="post-icon-button"
                >
                  <FaRegComment className="post-icons" />
                </button>
              </li>
              <li className="post-icon-buttons-container">
                <button
                  type="button"
                  aria-label="share icon"
                  className="post-icon-button"
                >
                  <BiShareAlt className="post-icons" />
                </button>
              </li>
            </ul>
            <div className="caption-container">
              <p className="likes-count">{likesCount} likes</p>
              <p className="caption">{postDetails.caption}</p>
              {comments.map(eachComment => (
                <Comments
                  key={eachComment.userId}
                  commentDetails={eachComment}
                />
              ))}
              <p className="created-time">{createdAt}</p>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default Post
