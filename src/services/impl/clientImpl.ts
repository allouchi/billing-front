import Client from "../../domains/Client";
import Webservice from "../../utils/webservice";
import { IClientService } from "../client.interface";

/**
 * Adapter for ICompanyService
 *
 * @author k.ALIANNE
 * @since 15/11/2020
 */
export class ClientServiceImpl implements IClientService {
  private static readonly CLIENT_PATH: string = "clients";

  async createOrUpdate(client: Client, siret: string): Promise<Client> {
    const isNew: boolean = !client.id || client.id === 0;
    try {
      let response;
      if (isNew) {
        response = await Webservice.getInstance().post(
          `${ClientServiceImpl.CLIENT_PATH}/${siret}`,
          client
        );
      } else {
        response = await Webservice.getInstance().put(
          `${ClientServiceImpl.CLIENT_PATH}/${siret}`,
          client
        );
      }
      return response.data;
    } catch (error) {
      let jsonMessage = JSON.parse(error.request.response);
      throw Error(jsonMessage.message);
    }
  }
  async findAllBySiret(siret: string): Promise<Client[]> {
    try {
      const response = await Webservice.getInstance().get(
        `${ClientServiceImpl.CLIENT_PATH}/${siret}`
      );
      return response.data;
    } catch (error) {
      let jsonMessage = JSON.parse(error.request.response);
      throw Error(jsonMessage.message);
    }
  }

  async deleteById(id: number): Promise<string> {
    try {
      await Webservice.getInstance().delete(
        `${ClientServiceImpl.CLIENT_PATH}/${id}`
      );
      return Promise.resolve("200");
    } catch (error) {
      return Promise.reject(`Error during deleting client with id ${id}`);
    }
  }
}
