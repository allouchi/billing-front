import User from "../../domains/User";
import Webservice from "../../utils/webservice";
import { IUserService } from "../user.interface";

export class UserServiceImpl implements IUserService {
  private static readonly USER_PATH: string = "users";

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
