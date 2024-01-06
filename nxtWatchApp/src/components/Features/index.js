import {Component} from 'react'
import WatchAppContext from '../../context/WatchAppContext'

import {
  Container,
  Feature,
  FeatureName,
  IconContainer,
  FeatureButton,
} from './styledComponents'

import './index.css'

class Features extends Component {
  onChooseFeature = () => {
    const {features, onClickFeature} = this.props
    const {id} = features
    onClickFeature(id)
  }

  render() {
    const {features, isTrue} = this.props
    const {feature, featureIcon} = features
    return (
      <WatchAppContext.Consumer>
        {value => {
          const {isDarkModeOn} = value
          let backgroundColor = ''
          if (isDarkModeOn && isTrue) {
            backgroundColor = 'on-dark-mode'
          } else if (isDarkModeOn || isTrue) {
            backgroundColor = 'on-light-mode'
          }
          return (
            <Container>
              <Feature className={backgroundColor} bgColor={isTrue}>
                <FeatureButton type="button" onClick={this.onChooseFeature}>
                  <IconContainer color={isTrue} bgColor={isDarkModeOn}>
                    {featureIcon}
                  </IconContainer>
                  <FeatureName color={isTrue} colorTwo={isDarkModeOn}>
                    {feature}
                  </FeatureName>
                </FeatureButton>
              </Feature>
            </Container>
          )
        }}
      </WatchAppContext.Consumer>
    )
  }
}

export default Features
