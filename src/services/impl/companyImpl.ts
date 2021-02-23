import Company from "../../domains/Company";
import { decodeMessage } from "../../shared/Utils";
import Webservice from "../../utils/webservice";
import { ICompanyService } from "../company.interface";

/**
 * Adapter for ICompanyService
 *
 * @author k.ALIANNE
 * @since 15/11/2020
 */
export class CompanyServiceImpl implements ICompanyService {
  private static readonly COMPNAY_PATH: string = "companies";

  async createOrUpdate(company: Company): Promise<Company> {
    const isNew: boolean = !company.id || company.id === 0;
    try {
      let response;
      if (isNew) {
        response = await Webservice.getInstance().post(
          CompanyServiceImpl.COMPNAY_PATH,
          company
        );
      } else {
        response = await Webservice.getInstance().put(
          CompanyServiceImpl.COMPNAY_PATH,
          company
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

  async findAll(): Promise<Company[]> {
    try {
      const response = await Webservice.getInstance().get(
        `${CompanyServiceImpl.COMPNAY_PATH}`
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
  async findAllBySiret(siret: string): Promise<Company[]> {
    try {
      const response = await Webservice.getInstance().get(
        `${CompanyServiceImpl.COMPNAY_PATH}/${siret}`
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

  async findByUserName(userName: string): Promise<Company[]> {
    try {
      const response = await Webservice.getInstance().get(
        `${CompanyServiceImpl.COMPNAY_PATH}/${userName}`
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
        `${CompanyServiceImpl.COMPNAY_PATH}/${id}`
      );
      return Promise.resolve("200");
    } catch (error) {
      return Promise.reject(`Error during deleting company with id ${id}`);
    }
  }
}
