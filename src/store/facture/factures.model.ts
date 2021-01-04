import { action, Action, Thunk, thunk } from "easy-peasy";
import Facture from "../../domains/Facture";
import { Injections } from "../injections";

export interface FacturesModel {
  isLoaded: boolean;
  items: Facture[];
  
  // Actions
  loadSuccess: Action<FacturesModel, Facture[]>;
  remove: Action<FacturesModel, FacturePrestation>;
  add: Action<FacturesModel, Facture>; 
  updateState: Action<FacturesModel, Facture>;

  // Thunk
  findAllBySiret: Thunk<FacturesModel, string | undefined, Injections>;
  createOrUpdate: Thunk<FacturesModel, FacturePrestation, Injections>;
  deleteById: Thunk<FacturesModel, FacturePrestation, Injections>;
}

export const facturesModel: FacturesModel = {
  isLoaded: false,
  items: [],
 
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

 
  updateState: action((state, payload: Facture) => {
    //state.items = [payload, ...state.items];
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

  deleteById: thunk(async (actions, payload: FacturePrestation, { injections }) => {
    try {
      const { factureService } = injections;
      await factureService.deleteById(       
        payload.siret,
        payload.prestationId,
        payload.factureId);
      actions.remove(payload);
    } catch (error) {
      throw error;
    }
  }),
};

interface FacturePrestation {
  prestationId: number;
  facture: Facture;
  siret: string;
  factureId: number;
}
export default FacturePrestation;
