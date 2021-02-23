import { action, Action, Thunk, thunk } from "easy-peasy";
import DataPDF from "../../domains/DataPDF";
import { Injections } from "../injections";

export interface PdfModel {
  isLoaded: boolean;
  items: [];

  // Actions
  loadSuccess: Action<PdfModel, []>;

  // Thunk
  downloadPdf: Thunk<PdfModel, number, Injections>;
}

export const pdfModel: PdfModel = {
  isLoaded: false,
  items: null,

  // Actions
  loadSuccess: action((state, payload: []) => {
    state.items = payload;
    state.isLoaded = true;
  }),

  // Thunks
  downloadPdf: thunk(async (actions, payload: number, { injections }) => {
    try {
      const { pdfService } = injections;
      const data = await pdfService.download(payload);
      actions.loadSuccess(data);
    } catch (error) {
      throw error;
    }
  }),
};
