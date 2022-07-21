import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [userObject, setUserObject] = useState(null);

  const auth = getAuth();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrentUser(uid);
        setUserObject(user);
      } else {
        setCurrentUser(null);
      };
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userObject }}>
      {children}
    </AuthContext.Provider>
  );

};