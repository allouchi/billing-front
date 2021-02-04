import UserRolesRef from "../../domains/UserRolesRef";
import { decodeMessage } from "../../shared/Utils";
import Webservice from "../../utils/webservice";
import { IUserRolesRefService } from "../userRolesRef.interface";

export class UserRolesRefImpl implements IUserRolesRefService {
  private static readonly ROLES_PATH: string = "roles";

  async findRolesRef(): Promise<UserRolesRef[]> {
    try {
      const response = await Webservice.getInstance().get(
        `${UserRolesRefImpl.ROLES_PATH}`
      );
      return response.data;
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
}
