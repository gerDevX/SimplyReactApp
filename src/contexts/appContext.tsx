import { createContext } from "react";
import { IAppState, IUserModel } from "../interfaces";

export type AppContextProps = {
  appState: IAppState;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  retrieveUsers: () => Promise<IUserModel[]>;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
