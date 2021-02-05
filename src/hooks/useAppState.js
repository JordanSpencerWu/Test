import React, { useReducer, createContext, useContext } from "react";

import {
  reducer as appStateReducer,
  INITIAL_APP_STATE,
} from "./useAppState/reducer";

const AppStateContext = createContext();
const AppStateDispatchContext = createContext();

function AppStateProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(appStateReducer, INITIAL_APP_STATE);

  return (
    <AppStateContext.Provider value={state}>
      <AppStateDispatchContext.Provider value={dispatch}>
        {children}
      </AppStateDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = useContext(AppStateContext);

  if (context === undefined) {
    throw new Error(
      "useAppState must be used within a AppStateContext.Provider"
    );
  }

  return context;
}

function useAppStateDispatch() {
  const context = useContext(AppStateDispatchContext);

  if (context === undefined) {
    throw new Error(
      "useAppStateDispatch must be used within a AppStateDispatchContext.Provider"
    );
  }

  return context;
}

export { AppStateProvider, useAppState, useAppStateDispatch };
