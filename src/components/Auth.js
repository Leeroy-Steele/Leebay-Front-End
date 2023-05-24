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

  // change between localhost and AWS backend here
  const backendURL = "http://localhost:4000"
  // const backendURL = "http://leebay-expressjs-backend-v2-dev602.ap-southeast-2.elasticbeanstalk.com"

  return (
    <AuthContext.Provider value={{ userName, login, logout, checkUserName,checkUserID, backendURL }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
