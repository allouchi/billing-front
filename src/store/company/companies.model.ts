/* eslint-disable @typescript-eslint/camelcase */
import { action, Action, Thunk, thunk } from 'easy-peasy';
import Company from '../../domains/Company';
import { Injections } from '../injections';

export interface CompaniesModel {
  isLoaded: boolean;
  items: Company[];

  // Actions
  loadSuccess: Action<CompaniesModel, Company[]>;
  remove: Action<CompaniesModel, number>;
  add: Action<CompaniesModel, Company>;
  updateState: Action<CompaniesModel, Company>;

  // Thunk
  findAll: Thunk<CompaniesModel, void, Injections>;
  findAllBySiret: Thunk<CompaniesModel, string, Injections>;
  create: Thunk<CompaniesModel, Company, Injections>;
  update: Thunk<CompaniesModel, Company, Injections>;
  deleteById: Thunk<CompaniesModel, number, Injections>;
}

export const companiesModel: CompaniesModel = {
  isLoaded: false,
  items: [],

  // Actions  
  loadSuccess: action((state, payload: Company[]) => {
    state.items= payload;
    state.isLoaded = true;
  }), 
  remove: action((state, payload: number) => {
    state.items = state.items.filter((company: Company) => company.id !== payload);
  }),
  add: action((state, payload: Company) => {
    state.items = [payload, ...state.items];    
  }),
  updateState: action((state, payload: Company) => {
    state.items.map((item: Company) => (item.id === payload.id ? payload : item));
  }), 

   // Thunks
   findAll: thunk(async (actions, _void, { injections }) => {
    try {
      const { companyService } = injections;
      const companys = await companyService.findAll();
      actions.loadSuccess(companys);
    } catch (error) {
      throw error;
    }
  }),
  // Thunks
  findAllBySiret: thunk(async (actions, payload: string, { injections }) => {
    try {
      const { companyService } = injections;
      const company = await companyService.findAllBySiret(payload);      
      actions.loadSuccess(company);
    } catch (error) {
      throw error;
    }
  }),

  // Thunks
  create: thunk(async (actions, payload: Company, { injections }) => {
    try {
      const { companyService } = injections;
      const company = await companyService.createOrUpdate(payload);
      actions.add(company);
    } catch (error) {
      throw error;
    }
  }),
  update: thunk(async (actions, payload: Company, { injections }) => {
    try {
      const { companyService } = injections;
      const company = await companyService.createOrUpdate(payload);
      actions.update(company);
    } catch (error) {
      throw error;
    }
  }),
  deleteById: thunk(async (actions, payload: number, { injections }) => {
    try {
      const { companyService } = injections;
      await companyService.deleteById(payload);
      actions.remove(payload);
    } catch (error) {
      throw error;
    }
  }),
};
