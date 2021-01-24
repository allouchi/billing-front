import User from "../../domains/User";
import Webservice from "../../utils/webservice";
import { IUserService } from "../user.interface";

export class UserServiceImpl implements IUserService {
  private static readonly USER_PATH: string = "users";

  async createOrUpdate(user: User): Promise<User> {
    const isNew: boolean = !user.id || user.id === 0;
    try {
      let response;
      if (isNew) {
        response = await Webservice.getInstance().post(
          `${UserServiceImpl.USER_PATH}`,
          user
        );
      } else {
        response = await Webservice.getInstance().put(
          `${UserServiceImpl.USER_PATH}`,
          user
        );
      }
      return response.data;
    } catch (error) {
      throw Error(`Error during ${isNew ? "creating" : "editing"} new user`);
    }
  }

  async findUserByEMail(email: string): Promise<User> {
    try {
      const response = await Webservice.getInstance().get(
        `${UserServiceImpl.USER_PATH}/${email}`
      );
      return response.data;
    } catch (error) {
      throw Error("Error during getting user");
    }
  }
}
