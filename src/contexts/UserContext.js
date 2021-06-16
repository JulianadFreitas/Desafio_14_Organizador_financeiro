import React, { useState, createContext } from 'react';

const UserContext = createContext();
export default UserContext;

export function UserProvider ({ children }) {
  const [userData, setUserData] = useState({
    token: ''
  });

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      { children }
    </UserContext.Provider>
  );
}
