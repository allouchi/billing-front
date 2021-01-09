import { action, Action, Thunk, thunk } from "easy-peasy";
import Facture from "../../domains/Facture";
import Pdf from "../../domains/Pdf";
import { Injections } from "../injections";

export interface FacturesModel {
  isLoaded: boolean;
  items: Facture[];
  pdf: Pdf | any;

  // Actions
  loadSuccess: Action<FacturesModel, Facture[]>;
  remove: Action<FacturesModel, FacturePrestation>;
  add: Action<FacturesModel, Facture>;
  updateState: Action<FacturesModel, Facture>;
  download: Action<FacturesModel, PdfPath>;

  // Thunk
  findAllBySiret: Thunk<FacturesModel, string | undefined, Injections>;
  createOrUpdate: Thunk<FacturesModel, FacturePrestation, Injections>;
  deleteById: Thunk<FacturesModel, FacturePrestation, Injections>;
  downloadPdf: Thunk<FacturesModel, PdfPath, Injections>;
}

export const facturesModel: FacturesModel = {
  isLoaded: false,
  items: [],
  pdf: {},

  // Actions
  loadSuccess: action((state, payload: Facture[]) => {
    state.items = payload;
    state.isLoaded = true;
  }),
  remove: action((state, payload: FacturePrestation) => {
    state.items = state.items.filter(
      (facture: Facture) => facture.id !== payload.facture.id
    );
  }),
  add: action((state, payload: Facture) => {
    state.items = [payload, ...state.items];
  }),

  download: action((state, payload: PdfPath) => {
    state.pdf = [payload, ...state.pdf];    
  }),

  updateState: action((state, payload: Facture) => {
    state.items.map((item: Facture) =>
      item.filePath === payload.filePath ? item : payload
    );
  }),

  // Thunks
  findAllBySiret: thunk(async (actions, payload: string, { injections }) => {
    try {
      const { factureService } = injections;
      const factures = await factureService.findAllBySiret(payload);
      actions.loadSuccess(factures);
    } catch (error) {
      throw error;
    }
  }),
  // Thunks
  createOrUpdate: thunk(
    async (actions, payload: FacturePrestation, { injections }) => {
      const isNew: boolean = !payload.facture.id || payload.facture.id === 0;
      try {
        const { factureService } = injections;
        const facture = await factureService.createOrUpdate(
          payload.facture,
          payload.siret,
          payload.prestationId
        );

        if (isNew) {
          actions.add(facture);
        } else {
          actions.updateState(facture);
        }
      } catch (error) {
        throw error;
      }
    }
  ),

  deleteById: thunk(
    async (actions, payload: FacturePrestation, { injections }) => {
      try {
        const { factureService } = injections;
        await factureService.deleteById(
          payload.siret,
          payload.prestationId,
          payload.facture.id
        );
        actions.remove(payload);
      } catch (error) {
        throw error;
      }
    }
  ),

  // Thunks
  downloadPdf: thunk(async (actions, payload: PdfPath, { injections }) => {
    try {
      const { factureService } = injections;  
      const pdf = await factureService.download(payload.siret, payload.path);
      actions.download(payload);
    } catch (error) {
      throw error;
    }
  }),
};

export interface PdfPath { 
  siret: string;
  path: string;
  pdf: Pdf;
}

interface FacturePrestation {
  prestationId: number;
  facture: Facture;
  siret: string;
  factureId: number;
}
export default FacturePrestation;
