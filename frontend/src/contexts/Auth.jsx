import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('Wildan')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Export auth state here
  const authState = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated
  }

  return (
    <AuthContext.Provider value={{ authState }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
