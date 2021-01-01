import { action, Action, Thunk, thunk } from "easy-peasy";
import Facture from "../../domains/Facture";
import { Injections } from "../injections";

export interface FacturesModel {
  isLoaded: boolean;
  items: Facture[];

  // Actions
  loadSuccess: Action<FacturesModel, Facture[]>;
  remove: Action<FacturesModel, number>;
  add: Action<FacturesModel, Facture>;
  updateState: Action<FacturesModel, Facture>;

  // Thunk
  findAllBySiret: Thunk<FacturesModel, string | undefined, Injections>;
  createOrUpdate: Thunk<FacturesModel, FacturePrestation, Injections>;
  //update: Thunk<FacturesModel, Facture, Injections>;
  deleteById: Thunk<FacturesModel, number, Injections>;
}

export const facturesModel: FacturesModel = {
  isLoaded: false,
  items: [],

  // Actions
  loadSuccess: action((state, payload: Facture[]) => {
    state.items = payload;
    state.isLoaded = true;
  }),
  remove: action((state, payload: number) => {
    state.items = state.items.filter(
      (facture: Facture) => facture.id !== payload
    );
  }),
  add: action((state, payload: Facture) => {
    state.items = [payload, ...state.items];
  }),
  updateState: action((state, payload: Facture) => {
    state.items.map((item: Facture) =>
      item.id === payload.id ? payload : item
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
  createOrUpdate: thunk(async (actions, payload: FacturePrestation, { injections }) => {
    try {
      const { factureService } = injections;
      const facture = await factureService.createOrUpdate(
        payload.facture,
        payload.siret,
        payload.prestationId,
        payload.numeroCommande
      );
      actions.add(facture);
    } catch (error) {
      throw error;
    }
  }),
 
  deleteById: thunk(async (actions, payload: number, { injections }) => {
    try {
      const { factureService } = injections;
      await factureService.deleteById(payload);
      actions.remove(payload);
    } catch (error) {
      throw error;
    }
  }),
};

interface FacturePrestation {
  prestationId: number;
  numeroCommande: string;
  facture: Facture;
  siret: string;
}
export default FacturePrestation;
