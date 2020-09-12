import React, { useState, createContext, useEffect } from 'react';
import API from '../utils/API';

export const UserContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const getUser = async () => {
    try {
      const result = await API.currentUser();
      console.log(result.data.user);
      setUser(result.data.user);
      setIsLoaded(true);
    } catch (err) {
      console.error('ERROR - UserContext.js - getUser', err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser, isLoaded, setIsLoaded }}>
        {children}
      </UserContext.Provider>
    </div>
  );
};
