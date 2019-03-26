import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <ToastContainer autoClose={1000} />
    </div>
  )
}

export default App
