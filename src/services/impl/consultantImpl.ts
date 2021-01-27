import Consultant from "../../domains/Consultant";
import Webservice from "../../utils/webservice";
import { IConsultantService } from "../consultant.interface";

/**
 * Adapter for IConsultantService
 *
 * @author k.ALIANNE
 * @since 15/11/2020
 */
export class ConsultantServiceImpl implements IConsultantService {
  private static readonly CONSULTANT_PATH: string = "consultants";

  async createOrUpdate(
    consultant: Consultant,
    siret: string
  ): Promise<Consultant> {
    const isNew: boolean = !consultant.id || consultant.id === 0;
    try {
      let response;
      if (isNew) {
        response = await Webservice.getInstance().post(
          `${ConsultantServiceImpl.CONSULTANT_PATH}/${siret}`,
          consultant
        );
      } else {
        response = await Webservice.getInstance().put(
          `${ConsultantServiceImpl.CONSULTANT_PATH}/${siret}`,
          consultant
        );
      }

      return response.data;
    } catch (error) {
      console.log(error);

      throw Error(
        `Error during ${isNew ? "creating" : "editing"} new consultant`
      );
    }
  }

  async findAllBySiret(siret: string): Promise<Consultant[]> {
    try {
      const response = await Webservice.getInstance().get(
        `${ConsultantServiceImpl.CONSULTANT_PATH}/${siret}`
      );
      return response.data;
    } catch (error) {
      throw Error("Error during getting consultants");
    }
  }

  async deleteById(id: number, siret: string): Promise<string> {
    try {
      await Webservice.getInstance().delete(
        `${ConsultantServiceImpl.CONSULTANT_PATH}/${siret}/${id}`
      );
      return Promise.resolve("200");
    } catch (error) {
      return Promise.reject(`Error during deleting consultant with id ${id}`);
    }
  }
}
