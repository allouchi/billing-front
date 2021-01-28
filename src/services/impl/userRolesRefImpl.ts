import UserRolesRef from "../../domains/UserRolesRef";
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
      let jsonMessage = JSON.parse(error.request.response);
      throw Error(jsonMessage.message);
    }
  }
}
