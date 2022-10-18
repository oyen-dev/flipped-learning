import { createContext, useContext, useState, useEffect } from 'react'

import Cookies from 'js-cookie'
import api from '../api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(Cookies.get('jwtToken'))
  const [isAuthenticated, setIsAuthenticated] = useState(!!jwtToken)
  const [user, setUser] = useState({})

  // fetch user data
  const fetchUser = async () => {
    // Set header authorization
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    await api.get('/auth/me', config).then((res) => {
      // console.log(res.data)
      setUser(res.data.data)
    })
  }

  // Fetch user data when jwtToken changed
  useEffect(() => {
    if (jwtToken) {
      fetchUser(jwtToken)
    }
  }, [jwtToken])

  // Export auth state here
  const authState = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    jwtToken,
    setJwtToken
  }

  // Export auth functions here
  const authFunctions = {
    fetchUser
  }

  return (
    <AuthContext.Provider value={{ authState, authFunctions }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
