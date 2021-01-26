/* eslint-disable @typescript-eslint/camelcase */
import { action, Action, Thunk, thunk } from "easy-peasy";
import User from "../../domains/User";
import { Injections } from "../injections";

export interface UserModel {
  isLoaded: boolean;
  item: User;

  // Actions
  loadSuccess: Action<UserModel, User>;
  // Thunk
  findUserByEMail: Thunk<UserModel, string, Injections>;
  createUser: Thunk<UserModel, User, Injections>;
}

export const userModel: UserModel = {
  isLoaded: false,
  item: null,

  // Actions
  loadSuccess: action((state, payload: User) => {
    state.item = payload;
    state.isLoaded = true;
  }),

  // Thunks
  createUser: thunk(async (actions, payload: User, { injections }) => {
    try {
      const { userService } = injections;
      await userService.createUser(payload);
    } catch (error) {
      throw error;
    }
  }),
  // Thunks
  findUserByEMail: thunk(async (actions, payload: string, { injections }) => {
    try {
      const { userService } = injections;
      const user = await userService.findUserByEMail(payload);
      actions.loadSuccess(user);
    } catch (error) {
      throw error;
    }
  }),
};
