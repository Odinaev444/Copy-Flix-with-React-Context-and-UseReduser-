import React, { useReducer } from "react";

import { AppReducer, initialState } from './reducer';

const AppDispatchContext = React.createContext({ initialState });
const AppStateContext = React.createContext({ initialState });



export function useAppState() {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}

export function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
}


export const AppProvaider = ({ children }) => {
  const [watchList, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppStateContext.Provider value={watchList}>
      <AppDispatchContext.Provider value={dispatch}>\
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};