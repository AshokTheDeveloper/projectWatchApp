import {Container, TagButton} from './styledComponents'

const TagItem = props => {
  const {tagDetails, onChooseTag} = props
  const {displayText, optionId} = tagDetails

  const onSelectTag = () => {
    onChooseTag(optionId)
  }

  //   const bgColor = isTrue ? '#f3aa4e' : 'transparent'
  //   const color = isTrue ? '#ffffff' : '#000000'
  //   console.log(isTrue)

  return (
    <Container>
      <TagButton type="button" onClick={onSelectTag}>
        {displayText}
      </TagButton>
    </Container>
  )
}

export default TagItem
