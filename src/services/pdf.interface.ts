
import DataPDF from '../domains/DataPDF';


export interface IPdfService {
  /**
   * Download pdf file
   *
   * @param id siret, id facture
   */
  download(siret: string, prestationId: number, factureId: number): Promise<DataPDF[]>;
 
}
