// MyContext.jsx
import React, { createContext, useState,useMemo, useContext } from 'react';

// Create a context
export const MyContext = createContext();

export const usePort = () => useContext(MyContext);
// Context provider component
export const MyContextProvider = ({ children }) => {
  // Define state or any data you want to share
    const [data, setData] = useState([]);
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [portfolio, setPortfolio] = useState("");

  // Define functions to update the state

  // Pass data and functions through the context provider
  const value = useMemo(() => ({data,setData,loggedIn,setIsLoggedIn,portfolio,setPortfolio}), [data,setData,loggedIn,setIsLoggedIn,portfolio,setPortfolio]);
 
  // Render the context provider with its children
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
