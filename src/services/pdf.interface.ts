
import Pdf from '../domains/Pdf';


export interface IPdfService {
  /**
   * Download pdf file
   *
   * @param id siret, id facture
   */
  download(siret: string, prestationId: number, factureId: number): Promise<Pdf>;
 
}
