export interface IUserInfo {
  fullname: string;
  username: string;
  token: string;
}

export const userInitialState: IUserInfo = {
  fullname: "",
  username: "",
  token: "",
};

export interface IAppState {
  user: IUserInfo;
  usersRetrieve: IUserModel[];
  isSignIn: boolean;
  isError: boolean;
  msg: string;
}

export interface IUserModel {
  contactId: number;
  name: string;
  surnames: string;
  birthDate: Date;
  gender: string;
  photo: string;
  phone: string;
  profesion: string;
  email: string;
}
