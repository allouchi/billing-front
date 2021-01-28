import Prestation from "../../domains/Prestation";
import Webservice from "../../utils/webservice";
import { IPrestationService } from "../prestation.interface";

/**
 * Adapter for IPrestationService
 *
 * @author k.ALIANNE
 * @since 15/11/2020
 */
export class PrestationServiceImpl implements IPrestationService {
  private static readonly PRESTATION_PATH: string = "prestations";

  async createOrUpdate(
    prestation: Prestation,
    siret: string
  ): Promise<Prestation> {
    const isNew: boolean = !prestation.id || prestation.id === 0;
    try {
      let response;
      if (isNew) {
        response = await Webservice.getInstance().post(
          `${PrestationServiceImpl.PRESTATION_PATH}/${siret}`,
          prestation
        );
      } else {
        response = await Webservice.getInstance().put(
          `${PrestationServiceImpl.PRESTATION_PATH}/${siret}`,
          prestation
        );
      }
      return response.data;
    } catch (error) {
      let jsonMessage = JSON.parse(error.request.response);
      throw Error(
        `Erreur pendant ${
          isNew ? "la création" : "la modification"
        } prestation : ` + jsonMessage.message
      );
    }
  }
  async findAllBySiret(siret: string): Promise<Prestation[]> {
    try {
      const response = await Webservice.getInstance().get(
        `${PrestationServiceImpl.PRESTATION_PATH}/${siret}`
      );
      return response.data;
    } catch (error) {
      throw Error("Error during getting prestations");
    }
  }

  async deleteById(id: number): Promise<string> {
    try {
      await Webservice.getInstance().delete(
        `${PrestationServiceImpl.PRESTATION_PATH}/${id}`
      );
      return Promise.resolve("200");
    } catch (error) {
      return Promise.reject(`Error during deleting prestation with id ${id}`);
    }
  }
}
