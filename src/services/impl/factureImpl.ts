import Facture from "../../domains/Facture";
import { decodeMessage } from "../../shared/Utils";
import Webservice from "../../utils/webservice";
import { IFactureService } from "../facture.interface";

/**
 * Adapter for IFactureService
 *
 * @author k.ALIANNE
 * @since 15/11/2020
 */
export class FactureServiceImpl implements IFactureService {
  private static readonly FACTURES_PATH: string = "factures";

  async update(facture: Facture): Promise<Facture> {
    try {
      let response = await Webservice.getInstance().put(
        `${FactureServiceImpl.FACTURES_PATH}`,
        facture
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
  async create(
    facture: Facture,
    siret: string,
    prestationId: number
  ): Promise<Facture> {
    try {
      let response = await Webservice.getInstance().post(
        `${FactureServiceImpl.FACTURES_PATH}/${siret}/${prestationId}`,
        facture
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
  async findAllBySiret(siret: string): Promise<Facture[]> {
    try {
      const response = await Webservice.getInstance().get(
        `${FactureServiceImpl.FACTURES_PATH}/${siret}`
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
  async deleteById(factureId: number): Promise<string> {
    try {
      await Webservice.getInstance().delete(
        `${FactureServiceImpl.FACTURES_PATH}/${factureId}`
      );
      return Promise.resolve("200");
    } catch (error) {
      return Promise.reject(
        `Error during deleting facture with id ${factureId}`
      );
    }
  }
}
