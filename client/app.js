import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Searchbar from './components/Searchbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Searchbar />
      <Routes />
    </div>
  )
}

export default App
