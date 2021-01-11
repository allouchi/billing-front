/* eslint-disable @typescript-eslint/camelcase */
import { action, Action, Thunk, thunk } from 'easy-peasy';
import User from '../../domains/User';
import { Injections } from '../injections';

export interface UserModel {
  isConnected: boolean;
  user: Partial<User>;

  // Actions
  doConnect: Action<UserModel, User>;
  doDisconnect: Action<UserModel, void>;

  // Thunk  
  connect: Thunk<UserModel, Partial<User>, Injections>;
  disconnect: Thunk<UserModel, User, Injections>;
}

export const userModel: UserModel = {
  isConnected: false,
  user: {company: {siret: '831 502 141 00011'}},

  // Actions  
  doConnect: action((state, payload: User) => {
    state.user = payload;
    state.isConnected= true;
  }),
  doDisconnect: action((state, _void) => {
    state.isConnected= false;
  }),
  // Thunks
  connect: thunk(async (actions, payload: Partial<User>, { injections }) => {
    try {
      const { userService } = injections;
      const user = await userService.connect(payload);      
      actions.doConnect(user);
    } catch (error) {
      throw error;
    }
  }),
  disconnect: thunk(async (actions, payload: User, { injections }) => {
    try {
      const { userService } = injections;
      await userService.disconnect(payload);      
      actions.doDisconnect();
    } catch (error) {
      throw error;
    }
  }),
};
