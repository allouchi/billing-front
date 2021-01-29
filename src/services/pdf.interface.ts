import DataPDF from "../domains/DataPDF";

export interface IPdfService {
  /**
   * Download pdf file
   *
   * @param id facture
   */
  download(factureId: number): Promise<DataPDF[]>;
}
