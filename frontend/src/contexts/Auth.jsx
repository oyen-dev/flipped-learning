import { createContext, useContext, useState, useEffect } from 'react'

import Cookies from 'js-cookie'
import api from '../api'
import { io } from 'socket.io-client'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(Cookies.get('jwtToken'))
  const [isAuthenticated, setIsAuthenticated] = useState(!!jwtToken)
  const [user, setUser] = useState({})
  const [singleEmit, setSingleEmit] = useState(true)

  // Socket states
  const [socket, setSocket] = useState({
    on: () => {},
    emit: () => { console.log('Not ready') },
    off: () => {}
  })

  // Connect to socket
  useEffect(() => {
    const socket = io('http://localhost:5000')
    setSocket(socket)
  }, [])

  // fetch user data
  const fetchUser = async () => {
    // Set header authorization
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    let result = null
    try {
      result = await api.get('/auth/me', config)
      setUser(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Fetch user data when jwtToken changed
  useEffect(() => {
    if (jwtToken) {
      console.log('Is authenticated')
      const asyncFetchUser = async () => {
        await fetchUser()
      }
      asyncFetchUser()
    }
  }, [jwtToken])

  // Export auth state here
  const authState = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    jwtToken,
    setJwtToken,
    socket,
    singleEmit,
    setSingleEmit
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
