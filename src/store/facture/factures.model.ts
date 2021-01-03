import { action, Action, Thunk, thunk } from "easy-peasy";
import Facture from "../../domains/Facture";
import { Injections } from "../injections";
import jsPDF from 'jspdf';

export interface FacturesModel {
  isLoaded: boolean;
  items: Facture[];
  pdf: Blob;

  // Actions
  loadSuccess: Action<FacturesModel, Facture[]>;
  remove: Action<FacturesModel, number>;
  add: Action<FacturesModel, Facture>;
  addPdf: Action<FacturesModel, BinaryType>;
  updateState: Action<FacturesModel, Facture>;

  // Thunk
  findAllBySiret: Thunk<FacturesModel, string | undefined, Injections>;
  createOrUpdate: Thunk<FacturesModel, FacturePrestation, Injections>;
  deleteById: Thunk<FacturesModel, number, Injections>;
}

export const facturesModel: FacturesModel = {
  isLoaded: false,
  items: [],
  pdf: new Blob(),

  // Actions
  loadSuccess: action((state, payload: Facture[]) => {
    state.items = payload;
    state.isLoaded = true;
  }),
  remove: action((state, payload: number) => {
    state.items = state.items.filter(
      (facture: Facture) => facture.id !== payload
    );
  }),
  add: action((state, payload: Facture) => {
    state.items = [payload, ...state.items];
  }),

  addPdf: action((state, payload: BinaryType) => {
    //state.pdf = [payload, ...state.pdf];
  }),

  updateState: action((state, payload: Facture) => {
    state.items.map((item: Facture) =>
      item.factureStatus === payload.factureStatus ? item : payload
    );
  }),

  // Thunks
  findAllBySiret: thunk(async (actions, payload: string, { injections }) => {
    try {
      const { factureService } = injections;
      const factures = await factureService.findAllBySiret(payload);
      actions.loadSuccess(factures);
    } catch (error) {
      throw error;
    }
  }),

  // Thunks
  createOrUpdate: thunk(
    async (actions, payload: FacturePrestation, { injections }) => {
      const isNew: boolean = !payload.facture.id || payload.facture.id === 0;
      try {
        const { factureService } = injections;
        const response: Map<
          string,
          object
        > = await factureService.createOrUpdate(
          payload.facture,
          payload.siret,
          payload.prestationId
        );

        let facture: Facture;
        let pdf: Blob;

        for (const [key, value] of Object.entries(response)) {
          if (`${key}` === "facture") {
            facture = value;
            if (isNew) {
              actions.add(facture);
            } else {
              actions.updateState(facture);
            }
          }
          if (`${key}` === "pdf") {
           
            pdf = value;
            const file = new Blob([pdf], { type: "application/pdf" });
            const doc = new jsPDF();
            const reader = new FileReader();
            //doc.text(reader.result, 10, 10);
            //doc.save("test.pdf");
            
          }
        }
      } catch (error) {
        throw error;
      }
    }
  ),

  deleteById: thunk(async (actions, payload: number, { injections }) => {
    try {
      const { factureService } = injections;
      await factureService.deleteById(payload);
      actions.remove(payload);
    } catch (error) {
      throw error;
    }
  }),
};

interface FacturePrestation {
  prestationId: number;
  facture: Facture;
  siret: string;
}
export default FacturePrestation;
