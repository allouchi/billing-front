import DataPDF from "../../domains/DataPDF";
import { decodeMessage } from "../../shared/Utils";
import Webservice from "../../utils/webservice";
import { IPdfService } from "../pdf.interface";

export class PdfServiceImpl implements IPdfService {
  private static readonly EDITIONS_PATH: string = "editions";

  async download(factureId: number): Promise<DataPDF[]> {
    try {
      const response = await Webservice.getInstance().get(
        `${PdfServiceImpl.EDITIONS_PATH}/${factureId}`
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
