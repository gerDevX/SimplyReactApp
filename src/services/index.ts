import { IUserInfo, IUserModel } from "../interfaces";
import { API_BASE } from "../utils/constants";

export default class ApiClient {
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  constructor() {}

  async authLogin(
    username: string,
    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    password: string,
  ): Promise<IUserInfo | null> {
    const response = await fetch(API_BASE + "/login");
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const data: any = await response.json();

    if (Object.keys(data).length) {
      // This api mockup don't use auth with password
      if (data.username === username) {
        return {
          fullname: data.name + " " + data.lastname,
          username: data.username,
          token: data.access_token,
        } as IUserInfo;
      }
    }

    return null;
  }

  async getUsers(accessToken: string): Promise<IUserModel[] | null> {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`, // notice the Bearer before your token
      },
    };
    const response = await fetch(API_BASE + "/users", options);
    const dataJSON = await response.json();
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const data: IUserModel[] = <IUserModel[]>(
      JSON.parse(JSON.stringify(dataJSON.users))
    );

    if (Array.from(data).length) {
      return data;
    }

    return null;
  }
}
