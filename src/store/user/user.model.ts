/* eslint-disable @typescript-eslint/camelcase */
import { action, Action, Thunk, thunk } from "easy-peasy";
import User from "../../domains/User";
import { Injections } from "../injections";

export interface UserModel {
  isLoaded: boolean;
  item: User;

  // Actions
  loadSuccess: Action<UserModel, User>;
  add: Action<UserModel, User>;
  // Thunk
  findByEmailAndPassword: Thunk<UserModel, UserEmailPassword, Injections>;
  toConnect: Thunk<UserModel, User, Injections>;
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
  add: action((state, payload: User) => {
    state.item = payload;
  }),

  // Thunks
  createUser: thunk(async (actions, payload: User, { injections }) => {
    try {
      const { userService } = injections;
      const user = await userService.createUser(payload);
      actions.add(user);
    } catch (error) {
      throw error;
    }
  }),
  // Thunks
  findByEmailAndPassword: thunk(
    async (actions, payload: UserEmailPassword, { injections }) => {
      try {
        const { userService } = injections;
        const user = await userService.findByEmailAndPassword(
          payload.email,
          payload.password
        );
        actions.loadSuccess(user);
      } catch (error) {
        throw error;
      }
    }
  ),

  toConnect: thunk(async (actions, payload: User, { injections }) => {
    try {
      const { userService } = injections;
      const user = await userService.toConnect(payload);
      actions.loadSuccess(user);
    } catch (error) {
      throw error;
    }
  }),
};

interface UserEmailPassword {
  email: string;
  password: string;
}
export default UserEmailPassword;
