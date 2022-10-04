import { createContext, useContext, useState } from 'react'

import Cookies from 'js-cookie'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(Cookies.get('jwtToken'))
  const [isAuthenticated, setIsAuthenticated] = useState(!!jwtToken)
  const [user, setUser] = useState('Wildan')

  // Export auth state here
  const authState = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    jwtToken,
    setJwtToken
  }

  return (
    <AuthContext.Provider value={{ authState }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
