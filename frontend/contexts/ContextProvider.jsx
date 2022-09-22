import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2/dist/sweetalert2.all'
import withReactContent from 'sweetalert2-react-content'

const StateContext = createContext({})

export const GlobalContext = (props) => {
  const { children } = props

  // Global State
  const [colHide, setColHide] = useState(false)
  const [colSideContent, setColSideContent] = useState('')

  // Auth State
  const auth = Cookies.get('jwtToken') !== undefined
  const [isAuthenticated, setIsAuthenticated] = useState(auth)

  // Swal
  const MySwal = withReactContent(Swal)

  // Router
  const router = useRouter()

  // Create function to check if jwtToken is exist and valid
  const checkAuth = () => {
    if (Cookies.get('jwtToken') !== undefined) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }

  // Validate auth
  const validateAuth = () => {
    console.log('Validating auth...')
    const path = router.pathname
    if (isAuthenticated && path.includes('auth')) {
      router.push('/dashboard')
    } else {
      router.push('/auth')
    }
  }

  // Export collaboration state here
  const collabStates = {
    colHide,
    setColHide,
    colSideContent,
    setColSideContent
  }

  // Export global auth state here
  const authStates = {
    isAuthenticated,
    setIsAuthenticated
  }

  const globalFunctions = {
    MySwal,
    checkAuth,
    validateAuth
  }

  return (
    <StateContext.Provider value={{
      authStates,
      collabStates,
      globalFunctions
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const globalStateContext = () => useContext(StateContext)
