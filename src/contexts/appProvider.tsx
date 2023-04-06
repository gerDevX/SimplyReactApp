import { useReducer } from "react";
import { IAppState, IUserModel, userInitialState } from "../interfaces/index";
import ApiClient from "../services";
import { AppContext } from "./appContext";
import { AppReducer } from "./appReducer";

interface props {
  children: JSX.Element | JSX.Element[];
}

const appInitialState: IAppState = {
  user: userInitialState,
  usersRetrieve: [],
  isSignIn: false,
  isError: false,
  msg: "",
};

export const AppProvider = ({ children }: props) => {
  let _initialState = appInitialState;

  let stateBackup: IAppState;
  try {
    const appState = localStorage.getItem("appState") || "{}";
    stateBackup = JSON.parse(appState);
  } catch (error) {
    console.error("Couldn't read local storage state");
    stateBackup = appInitialState;
  }
  if (Object.keys(stateBackup).length) {
    _initialState = { ...appInitialState, ...stateBackup };
  }

  const [appState, dispatch] = useReducer(AppReducer, _initialState);
  localStorage.setItem("appState", JSON.stringify(appState));

  const signIn = async (username: string, password: string): Promise<void> => {
    if (username.length === 0 || password.length === 0) {
      dispatch({
        type: "signerror",
        payload: { msg: "Username and Password is required." },
      });
    } else {
      const userInfo = await new ApiClient().authLogin(username, password);

      if (userInfo !== null) {
        dispatch({
          type: "signin",
          payload: userInfo,
        });
      } else {
        dispatch({
          type: "signerror",
          payload: { msg: "The credentials isn't valid." },
        });
      }
    }
  };

  const signOut = (): void => {
    dispatch({
      type: "signout",
      payload: null,
    });
  };

  const retrieveUsers = async (): Promise<IUserModel[]> => {
    if (!appState.user) {
      return [];
    }

    return (await new ApiClient().getUsers(appState.user.token)) ?? [];
  };

  return (
    <AppContext.Provider value={{ appState, signIn, signOut, retrieveUsers }}>
      {children}
    </AppContext.Provider>
  );
};
