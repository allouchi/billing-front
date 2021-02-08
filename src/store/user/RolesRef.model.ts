/* eslint-disable @typescript-eslint/camelcase */
import { action, Action, Thunk, thunk } from "easy-peasy";
import RolesRef from "../../domains/RolesRef";
import { Injections } from "../injections";

export interface RolesRefModel {
  isLoaded: boolean;
  items: RolesRef[];

  // Actions
  loadSuccess: Action<RolesRefModel, RolesRef[]>;
  add: Action<RolesRefModel, RolesRef>;
  updateState: Action<RolesRefModel, RolesRef>;
  // Thunk
  findRolesRef: Thunk<RolesRefModel, void, Injections>;
}

export const rolesRefModel: RolesRefModel = {
  isLoaded: false,
  items: [],

  // Actions
  loadSuccess: action((state, payload: RolesRef[]) => {
    state.items = payload;
    state.isLoaded = true;
  }),

  add: action((state, payload: RolesRef) => {
    state.items = [payload, ...state.items];
  }),
  updateState: action((state, payload: RolesRef) => {
    state.items = state.items.map((item: RolesRef) =>
      item.id === payload.id ? payload : item
    );
  }),

  findRolesRef: thunk(async (actions, payload: void, { injections }) => {
    try {
      const { rolesRefService } = injections;
      const roles = await rolesRefService.findRolesRef();
      actions.loadSuccess(roles);
    } catch (error) {
      throw error;
    }
  }),
};
