import { createContext, useContext, useState } from 'react'

const StateContext = createContext({})

export const ContextProvider = (props) => {
  const { children } = props

  // Global State
  const [colHide, setColHide] = useState(false)
  const [colSideContent, setColSideContent] = useState('')

  // Auth State
  const [authName, setAuthName] = useState('Wildan')

  // Export collaboration state here
  const collabStates = {
    colHide,
    setColHide,
    colSideContent,
    setColSideContent
  }

  // Export global auth state here
  const authStates = {
    authName,
    setAuthName
  }

  return (
    <StateContext.Provider value={{
      authStates,
      collabStates
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
