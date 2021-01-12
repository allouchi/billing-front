import { action, Action, Thunk, thunk } from "easy-peasy";
import DataPDF from "../../domains/DataPDF";
import { Injections } from "../injections";

export interface PdfModel {
  isLoaded: boolean;
  items: DataPDF[];

  // Actions
  loadSuccess: Action<PdfModel, DataPDF[]>;
 
  // Thunk
  downloadPdf: Thunk<PdfModel, PdfPath, Injections>;
}

export const pdfModel: PdfModel = {
  isLoaded: false,
  items: [],

  // Actions
  loadSuccess: action((state, payload: DataPDF[]) => {
    state.items = payload; 
    state.isLoaded = true;    
  }),

  // Thunks
  downloadPdf: thunk(async (actions, payload: PdfPath, { injections }) => {
    try {
      const { pdfService } = injections;     
      const data = await pdfService.download(
        payload.siret,
        payload.prestationId,
        payload.factureId
      );      
      actions.loadSuccess(data);
    } catch (error) {
      throw error;
    }
  }),
};

interface PdfPath {
  siret: string;
  prestationId: number;
  factureId: number;
}

export default PdfPath;
