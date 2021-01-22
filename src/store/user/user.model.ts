/* eslint-disable @typescript-eslint/camelcase */
import { action, Action, Thunk, thunk } from "easy-peasy";
import User from "../../domains/User";
import { Injections } from "../injections";

export interface UserModel {
  isLoaded: boolean;
  item: User;

  // Actions
  loadSuccess: Action<User, User>;
  findUserByEMail: Thunk<User, string, Injections>;
}

export const userModel: UserModel = {
  isLoaded: false,
  item: null,

  // Actions
  loadSuccess: action((state, payload: User) => {
    //state.items = payload;
    //state.isLoaded = true;
  }),

  // Thunks
  findUserByEMail: thunk(async (actions, payload: string, { injections }) => {
    try {
      const { userService } = injections;
      const user = await userService.findUserByEMail(payload);
      //actions.loadSuccess(user);
    } catch (error) {
      throw error;
    }
  }),
};
