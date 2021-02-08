import UserRolesRef from "../../domains/RolesRef";
import { decodeMessage } from "../../shared/Utils";
import Webservice from "../../utils/webservice";
import { IRolesRefService } from "../rolesRef.interface";

export class RolesRefImpl implements IRolesRefService {
  private static readonly ROLES_PATH: string = "roles";

  async findRolesRef(): Promise<UserRolesRef[]> {
    try {
      const response = await Webservice.getInstance().get(
        `${RolesRefImpl.ROLES_PATH}`
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
