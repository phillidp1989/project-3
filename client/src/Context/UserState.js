import React, { useState, createContext, useEffect } from "react";
import axios from 'axios';

export const UserContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState({});  
  const [isLoaded,setIsLoaded] = useState(false);

const getUser = async () => {
  try {
    const result = await axios.get('/api/user', {withCredentials: true});    
    setUser(result.data.user);
    setIsLoaded(true);    
  } catch (err) {
    console.error("ERROR - UserState.js - getUser", err);
  }  
}

useEffect(() => {
  getUser();  
}, []);

  return (
    <div>      
      <UserContext.Provider value={{user, setUser, isLoaded, setIsLoaded}}>
        {children}
        {/* {user ? <img src={user.avatar} alt={user.displayName}/> : <h2>Not logged in</h2>}   */}
      </UserContext.Provider>
    </div>
  )
}
