import { createContext, useReducer } from "react";
import { getFromLocalStorage } from "../utils/browserStorage";
import Reducer from "./reducers";

const initialUserString= getFromLocalStorage("user");
const initialUser=JSON.parse(initialUserString)
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
