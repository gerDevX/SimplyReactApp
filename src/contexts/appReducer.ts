import {
  IAppState,
  IUserInfo,
  IUserModel,
  userInitialState,
} from "../interfaces";

type AppAction =
  | { type: "signin"; payload: IUserInfo }
  | { type: "signout"; payload: null }
  | { type: "signerror"; payload: { msg: string } }
  | { type: "retrieve_users"; payload: IUserModel[] };

export const AppReducer = (state: IAppState, action: AppAction) => {
  switch (action.type) {
    case "signin":
      return {
        ...state,
        user: action.payload,
        isSignIn: true,
        isError: false,
        msg: "",
      };
    case "signout":
      return {
        ...state,
        user: userInitialState,
        isSignIn: false,
        isError: false,
        msg: "",
      };
    case "signerror":
      return {
        ...state,
        isError: true,
        msg: action.payload.msg,
      };
    case "retrieve_users":
      return {
        ...state,
        usersRetrieve: action.payload,
      };
    default:
      return state;
  }
};
