import { action, Action, Thunk, thunk } from "easy-peasy";
import Prestation from "../../domains/Prestation";
import { Injections } from "../injections";

export interface PrestationsModel {
  isLoaded: boolean;
  items: Prestation[];

  // Actions
  loadSuccess: Action<PrestationsModel, Prestation[]>;
  remove: Action<PrestationsModel, number>;
  add: Action<PrestationsModel, Prestation>;
  updateState: Action<PrestationsModel, Prestation>;
  findAllBySiret: Thunk<PrestationsModel, string, Injections>;

  // Thunk
  createOrUpdate: Thunk<PrestationsModel, PrestationSiret, Injections>;
  deleteById: Thunk<PrestationsModel, number, Injections>;
}

export const prestationsModel: PrestationsModel = {
  isLoaded: false,
  items: [],

  // Actions
  loadSuccess: action((state, payload: Prestation[]) => {
    state.items = payload;
    state.isLoaded = true;
  }),
  remove: action((state, payload: number) => {
    state.items = state.items.filter(
      (Prestation: Prestation) => Prestation.id !== payload
    );
  }),
  add: action((state, payload: Prestation) => {
    state.items = [payload, ...state.items];
  }),
  updateState: action((state, payload: Prestation) => {
    state.items = state.items.map((item: Prestation) =>
      item.id === payload.id ? payload : item
    );
  }),

  // Thunks
  findAllBySiret: thunk(async (actions, payload: string, { injections }) => {
    try {
      const { prestationService } = injections;
      const prestation = await prestationService.findAllBySiret(payload);
      actions.loadSuccess(prestation);
    } catch (error) {
      throw error;
    }
  }),

  // Thunks
  createOrUpdate: thunk(
    async (actions, payload: PrestationSiret, { injections }) => {
      const isNew: boolean =
        !payload.prestation.id || payload.prestation.id === 0;
      try {
        const { prestationService } = injections;
        const prestation = await prestationService.createOrUpdate(
          payload.prestation,
          payload.siret
        );
        if (isNew) {
          actions.add(prestation);
        } else {
          actions.updateState(prestation);
        }
      } catch (error) {
        throw error;
      }
    }
  ),
  deleteById: thunk(async (actions, payload: number, { injections }) => {
    try {
      const { prestationService } = injections;
      await prestationService.deleteById(payload);
      actions.remove(payload);
    } catch (error) {
      throw error;
    }
  }),
};

interface PrestationSiret {
  prestation: Partial<Prestation>;
  siret: string;
}
export default PrestationSiret;
