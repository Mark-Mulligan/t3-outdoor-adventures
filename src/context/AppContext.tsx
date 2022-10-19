// React
import React, { FC, Dispatch, SetStateAction, useState } from 'react';

interface InitialAppContext {
  lastSearchString: string;
  setLastSearchString: Dispatch<SetStateAction<string>>;
}

const defaultAppContext = {
  lastSearchString: '',
  setLastSearchString: () => {
    return '';
  },
};

export const AppContext = React.createContext<InitialAppContext>(defaultAppContext);

export const AppContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastSearchString, setLastSearchString] = useState(defaultAppContext.lastSearchString);

  return (
    <AppContext.Provider
      value={{
        lastSearchString,
        setLastSearchString,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
