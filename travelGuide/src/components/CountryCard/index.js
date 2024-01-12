import {CardContainer, Image, Heading, Description} from './styledComponents'

const CountryGuide = props => {
  const {countryDetails} = props
  const {imageUrl, name, description} = countryDetails
  return (
    <CardContainer>
      <Image src={imageUrl} alt={name} />
      <Heading>{name}</Heading>
      <Description>{description}</Description>
    </CardContainer>
  )
}

export default CountryGuide
