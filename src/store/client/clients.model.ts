import { action, Action, Thunk, thunk } from 'easy-peasy';
import Client from '../../domains/Client';
import { Injections } from '../injections';

export interface ClientsModel {
  isLoaded: boolean;
  items: Client[];

  // Actions
  loadSuccess: Action<ClientsModel, Client[]>;
  remove: Action<ClientsModel, number>;
  add: Action<ClientsModel, Client>;
  updateState: Action<ClientsModel, Client>;

  // Thunk
  findAllBySiret: Thunk<ClientsModel, string | undefined, Injections>;
  createOrUpdate: Thunk<ClientsModel, ClientSiret, Injections>;  
  deleteById: Thunk<ClientsModel, number, Injections>;
}

export const clientsModel: ClientsModel = {
  isLoaded: false,
  items: [],

  // Actions
  loadSuccess: action((state, payload: Client[]) => {
    state.items = payload;
    state.isLoaded = true;
  }),
  remove: action((state, payload: number) => {
    state.items = state.items.filter((client: Client) => client.id !== payload);
  }),
  add: action((state, payload: Client) => {
    state.items = [payload, ...state.items];
  }),
  updateState: action((state, payload: Client) => {
    state.items.map((item: Client) => (item.id === payload.id ? payload : item));
  }),

  // Thunks
  findAllBySiret: thunk(async (actions,  siret: string, { injections }) => {
    try {
      const { clientService } = injections;      
      const clients = await clientService.findAllBySiret(siret);
      actions.loadSuccess(clients);
    } catch (error) {
      throw error;
    }
  }),
  // Thunks
  createOrUpdate: thunk(async (actions, payload: ClientSiret, { injections }) => {
    const isNew: boolean = !payload.client.id || payload.client.id === 0;
    try {     
      const { clientService } = injections;
      const client = await clientService.createOrUpdate(payload.client, payload.siret);
     
      if(isNew){
        actions.add(client);
      }else{
        actions.updateState(client);
      }     
    } catch (error) {
      throw error;
    }
  }),
  
  deleteById: thunk(async (actions, payload: number, { injections }) => {
    try {
      const { clientService } = injections;
      await clientService.deleteById(payload);
      actions.remove(payload);
    } catch (error) {
      throw error;
    }
  }),
};

export interface ClientSiret {
  siret: string;
  client: Client;
}