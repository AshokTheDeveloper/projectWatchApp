import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

import InstaShareContext from '../../context/InstaShareContext'

const NotFound = () => (
  <InstaShareContext.Consumer>
    {value => {
      const {isModeOn} = value

      // Dark theme feature
      const notFoundDarkBgContainer = isModeOn ? 'not-found-dark-container' : ''
      const notFoundDarkHeading = isModeOn ? 'not-found-dark-heading' : ''
      const notFoundDarkDescription = isModeOn
        ? 'not-found-dark-description'
        : ''
      return (
        <>
          <Header />
          <div className={`not-found-container ${notFoundDarkBgContainer}`}>
            <img
              src="https://res.cloudinary.com/daecqm1j8/image/upload/v1705750051/Insta_share/erroring_1_ttkako.svg"
              alt="page not found"
              className="not-found-image"
            />
            <h1 className={`not-found-text ${notFoundDarkHeading}`}>
              Page Not Found
            </h1>
            <p className={`not-found-description ${notFoundDarkDescription}`}>
              we are sorry, the page you requested could not be found. Please go
              back to the homepage.
            </p>
            <Link to="/" className="links">
              <button type="button" className="not-found-button">
                Home Page
              </button>
            </Link>
          </div>
        </>
      )
    }}
  </InstaShareContext.Consumer>
)

export default NotFound
