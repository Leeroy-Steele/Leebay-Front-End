import { useState, createContext, useContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

  const [userEmail, setUser] = useState(null)

  // console.log('Auth Provider function')

  const login = userEmail => {
    // console.log('login attempt made')
    setUser(userEmail)
  }

  const logout = () => {
    setUser(null)
  }

  const checkUserName = () => {
    return userEmail
  }

  return (
    <AuthContext.Provider value={{ userEmail, login, logout, checkUserName }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
