import { createContext, useContext, useState } from "react";

const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
