/* eslint-disable @typescript-eslint/camelcase */
import { action, Action, Thunk, thunk } from "easy-peasy";
import UseRolesRef from "../../domains/UserRolesRef";
import { Injections } from "../injections";

export interface UserRolesRefModel {
  isLoaded: boolean;
  items: UseRolesRef[];

  // Actions
  loadSuccess: Action<UserRolesRefModel, UseRolesRef[]>;
  add: Action<UserRolesRefModel, UseRolesRef>;
  updateState: Action<UserRolesRefModel, UseRolesRef>;
  // Thunk
  findRolesRef: Thunk<UserRolesRefModel, void, Injections>;
}

export const userRolesRefModel: UserRolesRefModel = {
  isLoaded: false,
  items: [],

  // Actions
  loadSuccess: action((state, payload: UseRolesRef[]) => {
    state.items = payload;
    state.isLoaded = true;
  }),

  add: action((state, payload: UseRolesRef) => {
    state.items = [payload, ...state.items];
  }),
  updateState: action((state, payload: UseRolesRef) => {
    state.items = state.items.map((item: UseRolesRef) =>
      item.id === payload.id ? payload : item
    );
  }),

  findRolesRef: thunk(async (actions, payload: void, { injections }) => {
    try {
      const { userRolesRefService } = injections;
      const roles = await userRolesRefService.findRolesRef();
      actions.loadSuccess(roles);
    } catch (error) {
      throw error;
    }
  }),
};
