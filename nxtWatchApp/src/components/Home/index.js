import {Component} from 'react'

import Header from '../Header'
import SideBar from '../SideBar'
import PremiumPlan from '../PremiumPlan'
import Videos from '../Videos'
import WatchAppContext from '../../context/WatchAppContext'
import {Container, HomeContentSection} from './styledComponents'

class Home extends Component {
  renderPremiumSubscription = () => <PremiumPlan />

  renderVideos = () => <Videos />

  render() {
    return (
      <WatchAppContext.Consumer>
        {value => {
          const {isDarkModeOn} = value
          return (
            <>
              <Header />
              <Container bgColor={isDarkModeOn} data-testid="home">
                <SideBar />
                <HomeContentSection bgColor={isDarkModeOn}>
                  {this.renderPremiumSubscription()}
                  {this.renderVideos()}
                </HomeContentSection>
              </Container>
            </>
          )
        }}
      </WatchAppContext.Consumer>
    )
  }
}

export default Home
