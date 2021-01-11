import { action, Action, Thunk, thunk } from "easy-peasy";
import Pdf from "../../domains/Pdf";
import { Injections } from "../injections";

export interface PdfsModel {
  isLoaded: boolean;
  items: Pdf;

  // Actions
  loadSuccess: Action<PdfsModel, Pdf>;
  add: Action<PdfsModel, Pdf>;
  // Thunk
  downloadPdf: Thunk<PdfsModel, PdfPath, Injections>;
}

export const pdfsModel: PdfsModel = {
  isLoaded: false,
  items: { fileContent: [] },

  // Actions
  loadSuccess: action((state, payload: Pdf) => {
    state.items = payload;
    state.isLoaded = true;
  }),
  add: action((state, payload: Pdf) => {
    //state.items = [payload, ...state.items.fileContent];
  }),

  // Thunks
  downloadPdf: thunk(async (actions, payload: PdfPath, { injections }) => {
    try {
      const { pdfService } = injections;
      const binaryPdf = await pdfService.download(
        payload.siret,
        payload.prestationId,
        payload.factureId
      );   

      
      console.log("byte :", binaryPdf);
      const file = new Blob([binaryPdf.fileContent], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
      
      actions.add(binaryPdf);
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
