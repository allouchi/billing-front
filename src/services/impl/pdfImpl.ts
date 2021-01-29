import DataPDF from "../../domains/DataPDF";
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
      let jsonMessage = JSON.parse(error.request.response);
      throw Error(jsonMessage.message);
    }
  }
}
