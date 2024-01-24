import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/daecqm1j8/image/upload/v1705750051/Insta_share/erroring_1_ttkako.svg"
      alt="page not found"
      className="not-found-image"
    />
    <h1 className="not-found-text">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/" className="links">
      <button type="button" className="not-found-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
