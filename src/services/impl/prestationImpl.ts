import Prestation from "../../domains/Prestation";
import { decodeMessage } from "../../shared/Utils";
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
    siret: string,
    templateChoice,
    moisFactureId
  ): Promise<Prestation> {
    const isNew: boolean = !prestation.id || prestation.id === 0;
    try {
      let response;
      if (isNew) {
        response = await Webservice.getInstance().post(
          `${PrestationServiceImpl.PRESTATION_PATH}/${siret}/${templateChoice}/${moisFactureId}`,
          prestation
        );
      } else {
        response = await Webservice.getInstance().put(
          `${PrestationServiceImpl.PRESTATION_PATH}/${siret}/${templateChoice}/${moisFactureId}`,
          prestation
        );
      }
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
  async findAllBySiret(siret: string): Promise<Prestation[]> {
    try {
      const response = await Webservice.getInstance().get(
        `${PrestationServiceImpl.PRESTATION_PATH}/${siret}`
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
