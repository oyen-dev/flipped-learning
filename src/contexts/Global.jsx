import { createContext, useContext, useState } from 'react'

import Swal from 'sweetalert2/dist/sweetalert2.all'
import withReactContent from 'sweetalert2-react-content'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  // Global States
  const [theme, setTheme] = useState(true)
  const [tabKey, setTabKey] = useState('1')
  const [play, setPlay] = useState(false)

  // Global Functions
  const mySwal = withReactContent(Swal)

  // Export global state here
  const globalState = {
    theme,
    setTheme,
    tabKey,
    setTabKey,
    play,
    setPlay
  }

  // Export global functions here
  const globalFunctions = {
    mySwal
  }

  return (
    <GlobalContext.Provider value={{ globalState, globalFunctions }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)
