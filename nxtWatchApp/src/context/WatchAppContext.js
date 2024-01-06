import React from 'react'

const WatchAppContext = React.createContext({
  isDarkModeOn: false,
  toggleDarkMode: () => {},
})

export default WatchAppContext
