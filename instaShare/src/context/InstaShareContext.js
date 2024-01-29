import React from 'react'

const InstaShareContext = React.createContext({
  searchInput: '',
  onClickSearch: () => {},
  isSearchButtonClicked: false,
  returnHome: () => {},
  onClickMobileSearchBar: () => {},
  showMobileSearchBar: false,
  onChangeMode: () => {},
  isModeOn: false,
  onClickTab: () => {},
  activeOption: 'home',
})

export default InstaShareContext
