import DataPDF from "../../domains/DataPDF";
import Webservice from "../../utils/webservice";
import { IPdfService } from "../pdf.interface";

export class PdfServiceImpl implements IPdfService {
    private static readonly EDITIONS_PATH: string = "editions";
    
 async download(siret: string, prestationId: number, factureId: number): Promise<DataPDF[]> {   
    try {      
      const response = await Webservice.getInstance().get(
        `${PdfServiceImpl.EDITIONS_PATH}/${siret}/${prestationId}/${factureId}`,
         {responseType: 'arraybuffer'}
      );
      return response.data;
    } catch (error) {
      throw Error("Error during getting pdf");
    }
  }
}