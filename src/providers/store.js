import React, { createContext, useState, useContext } from 'react';

const storeContext = createContext();

const Store = ({ children }) => {
  const [userName, setUserName] = useState('');

  return (
    <>
      <storeContext.Provider
        value={{
          userName,
          setUserName,
        }}
      >
        {children}
      </storeContext.Provider>
    </>
  );
};

export default Store;

export const useStore = () => useContext(storeContext);
