/* eslint-disable @typescript-eslint/camelcase */
import { action, Action, Thunk, thunk } from 'easy-peasy';
import Consultant from '../../domains/Consultant';
import { Injections } from '../injections';

export interface ConsultantsModel {
  isLoaded: boolean;
  items: Consultant[];
  
  // Actions
  loadSuccess: Action<ConsultantsModel, Consultant[]>;
  remove: Action<ConsultantsModel, number>;
  add: Action<ConsultantsModel, Consultant>;
  updateState: Action<ConsultantsModel, Consultant>;

  // Thunk  
  findAllBySiret: Thunk<ConsultantsModel, string, Injections>;
  create: Thunk<ConsultantsModel,ConsultantSiret, Injections>;
  update: Thunk<ConsultantsModel, ConsultantSiret, Injections>;
  deleteById: Thunk<ConsultantsModel, ConsultantSiret, Injections>;
}

export const consultantsModel: ConsultantsModel = {
  isLoaded: false,
  items: [],

  // Actions  
  loadSuccess: action((state, payload: Consultant[]) => {
    state.items= payload;
    state.isLoaded = true;
  }), 
  remove: action((state, payload: number) => {
    state.items = state.items.filter((consultant: Consultant) => consultant.id !== payload);
  }),
  add: action((state, payload: Consultant) => {    
    state.items = [payload, ...state.items];  
  }),
  updateState: action((state, payload: Consultant) => {
    state.items.map((item: Consultant) => (item.id === payload.id ? payload : item));
  }),  
  // Thunks
  findAllBySiret: thunk(async (actions, payload: string, { injections }) => {
    try {
      const { consultantService } = injections;
      const consultant = await consultantService.findAllBySiret(payload);      
      actions.loadSuccess(consultant);
    } catch (error) {
      throw error;
    }
  }),

  // Thunks
  create: thunk(async (actions, payload: ConsultantSiret, { injections }) => {
    try {
      const { consultantService } = injections;
      const consultant = await consultantService.createOrUpdate(payload.consultant, payload.siret);
      actions.add(consultant);
    } catch (error) {
      throw error;
    }
  }),
  update: thunk(async (actions, payload: ConsultantSiret, { injections }) => {
    try {
      const { consultantService } = injections;
      const consultant = await consultantService.createOrUpdate(payload.consultant, payload.siret);
      actions.updateState(consultant);
    } catch (error) {
      throw error;
    }
  }),
  
  deleteById: thunk(async (actions, payload: ConsultantSiret, { injections }) => {
    try {
      const { consultantService } = injections;
      await consultantService.deleteById(payload.consultant.id, payload.siret);
      actions.remove(payload.consultant.id);
    } catch (error) {
      throw error;
    }
  }),
};

export interface ConsultantSiret {
  siret: string;
  consultant: Consultant;
}
