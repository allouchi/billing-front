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
  items: { fileContent: "" },

  // Actions
  loadSuccess: action((state, payload: Pdf) => {
    state.items = payload;
    state.isLoaded = true;
  }),
  add: action((state, payload: Pdf) => {
    //state.items = [payload, ...state.items];
  }),

  // Thunks
  downloadPdf: thunk(async (actions, payload: PdfPath, { injections }) => {
    try {
      const { pdfService } = injections;
      const pdf = await pdfService.download(
        payload.siret,
        payload.prestationId,
        payload.factureId
      );
      let binary = "";
      const bytes = new Uint8Array(pdf.fileContent);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      window.open(binary);
      //actions.add(pdf);
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
