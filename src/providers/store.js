import React, { createContext, useState, useContext } from 'react';

const storeContext = createContext();

const Store = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [museumResults, setMuseumResults] = useState([]);
  const [theatreResults, setTheatreResults] = useState([]);
  const [marketResults, setMarketResults] = useState([]);

  return (
    <>
      <storeContext.Provider
        value={{
          userName,
          setUserName,
          museumResults,
          setMuseumResults,
          theatreResults,
          setTheatreResults,
          marketResults,
          setMarketResults,
        }}
      >
        {children}
      </storeContext.Provider>
    </>
  );
};

export default Store;

export const useStore = () => useContext(storeContext);
