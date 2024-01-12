import {Component} from 'react'

import Loader from 'react-loader-spinner'

import CountryCard from '../CountryCard'

import {
  Container,
  Heading,
  LoaderContainer,
  CountriesContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {
    countriesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTravellingCountries()
  }

  getTravellingCountries = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.packages.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
        description: eachItem.description,
      }))
      this.setState({
        countriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedData)
    }
  }

  renderLadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoaderContainer>
  )

  renderCountries = () => {
    const {countriesData} = this.state
    return (
      <CountriesContainer>
        {countriesData.map(eachItem => (
          <CountryCard key={eachItem.id} countryDetails={eachItem} />
        ))}
      </CountriesContainer>
    )
  }

  renderResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCountries()
      case apiStatusConstants.inProgress:
        return this.renderLadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <Container>
        <Heading>Travel Guide</Heading>
        {this.renderResultView()}
      </Container>
    )
  }
}

export default TravelGuide
