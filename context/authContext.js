import { createContext, useReducer } from "react";
import Reducer from "./reducers";
const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
  //notifications
  notify: [],
};
export const DataContext = createContext(INITIAL_STATE);

export const DataProvider = ({ children }) => {
  //initial state
  

  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  return (
    <DataContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        notify: state.notify,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
