import { useState, createContext, useContext } from 'react'
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

  const [userName, setUser] = useState(null)
  const [userID, setUserID] = useState(null)

  const login = (userEmail,user_ID) => {
    // console.log('login attempt made')
    setUser(userEmail)
    setUserID(user_ID)
  }

  const logout = () => {
    setUser(null)
    setUserID(null)
  }

  const checkUserName = () => {
    return userName
  }

  const checkUserID = () => {
    return userID
  }

  return (
    <AuthContext.Provider value={{ userName, login, logout, checkUserName,checkUserID }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
