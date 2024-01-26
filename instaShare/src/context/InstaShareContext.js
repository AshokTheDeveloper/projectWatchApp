import React from 'react'

const InstaShareContext = React.createContext({
  searchInput: '',
  onClickSearch: () => {},
  isSearchButtonClicked: false,
  status: 'INITIAL',
  searchedData: [],
  isDataThere: false,
  returnHome: () => {},

  setSuccess: false,
  setLoading: false,
  setFailure: false,
})

export default InstaShareContext
