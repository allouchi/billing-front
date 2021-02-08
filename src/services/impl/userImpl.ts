import User from "../../domains/User";
import { decodeMessage } from "../../shared/Utils";
import Webservice from "../../utils/webservice";
import { IUserService } from "../user.interface";

export class UserServiceImpl implements IUserService {
  private static readonly USER_PATH: string = "users";

  async createUser(user: User): Promise<User> {
    try {
      let reponse = await Webservice.getInstance().post(
        `${UserServiceImpl.USER_PATH}`,
        user
      );
      return reponse.data;
    } catch (error) {
      let messageJson;
      if (error.request !== undefined && error.request.response === "") {
        messageJson = "Problème réseau";
      } else {
        messageJson = decodeMessage(error);
      }
      throw Error(messageJson);
    }
  }

  async findUserByEMail(email: string): Promise<User> {
    try {
      const response = await Webservice.getInstance().get(
        `${UserServiceImpl.USER_PATH}/${email}`
      );
      return response.data;
    } catch (error) {
      console.log("erreur : ", error.request.status);
      let messageJson;
      if (error.request !== undefined && error.request.response === "") {
        messageJson = "Problème réseau";
      } else {
        messageJson = decodeMessage(error);
      }
      throw Error(messageJson);
    }
  }
}
