import { useState, createContext, useContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

  const [userName, setUser] = useState(null)

  // console.log('Auth Provider function')

  const login = userEmail => {
    // console.log('login attempt made')
    setUser(userEmail)
  }

  const logout = () => {
    setUser(null)
  }

  const checkUserName = () => {
    return userName
  }

  return (
    <AuthContext.Provider value={{ userName, login, logout, checkUserName }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
