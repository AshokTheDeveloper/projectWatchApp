import {Component} from 'react'

import {FaHotjar, FaGamepad} from 'react-icons/fa'
import {HiHome} from 'react-icons/hi'
import {RiPlayListAddFill} from 'react-icons/ri'
import Header from '../Header'
import Features from '../Features'
import WatchAppContext from '../../context/WatchAppContext'
import {
  Container,
  FeaturesSection,
  HomeContentSection,
} from './styledComponents'

const featuresList = [
  {
    id: 0,
    feature: 'Home',
    featureIcon: <HiHome />,
  },
  {
    id: 1,
    feature: 'Trending',
    featureIcon: <FaHotjar />,
  },
  {
    id: 2,
    feature: 'Gaming',
    featureIcon: <FaGamepad />,
  },
  {
    id: 3,
    feature: 'Saved Videos',
    featureIcon: <RiPlayListAddFill />,
  },
]

class Home extends Component {
  state = {
    activeFeature: featuresList[0].id,
  }

  onClickFeature = id => {
    this.setState({activeFeature: id})
  }

  renderSidebarFeatures = () => {
    const {activeFeature} = this.state
    return (
      <WatchAppContext.Consumer>
        {value => {
          const {isDarkModeOn} = value
          return (
            <FeaturesSection bgColor={isDarkModeOn}>
              {featuresList.map(eachItem => (
                <Features
                  key={eachItem.id}
                  features={eachItem}
                  onClickFeature={this.onClickFeature}
                  isTrue={eachItem.id === activeFeature}
                />
              ))}
            </FeaturesSection>
          )
        }}
      </WatchAppContext.Consumer>
    )
  }

  render() {
    return (
      <>
        <Header />
        <Container>
          {this.renderSidebarFeatures()}
          <HomeContentSection>
            <h1>Home content</h1>
          </HomeContentSection>
        </Container>
      </>
    )
  }
}

export default Home
