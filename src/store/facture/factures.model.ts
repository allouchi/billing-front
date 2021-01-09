import { action, Action, Thunk, thunk } from "easy-peasy";
import Facture from "../../domains/Facture";
import { Injections } from "../injections";

export interface FacturesModel {
  isLoaded: boolean;
  items: Facture[];
  //pdf: Blob;

  // Actions
  loadSuccess: Action<FacturesModel, Facture[]>;
  remove: Action<FacturesModel, FacturePrestation>;
  add: Action<FacturesModel, Facture>;
  //addPdf: Action<FacturesModel, Blob>;
  updateState: Action<FacturesModel, Facture>;

  // Thunk
  findAllBySiret: Thunk<FacturesModel, string | undefined, Injections>;
  createOrUpdate: Thunk<FacturesModel, FacturePrestation, Injections>;
  deleteById: Thunk<FacturesModel, FacturePrestation, Injections>;
}

export const facturesModel: FacturesModel = {
  isLoaded: false,
  items: [],
  //pdf : Blob,

  // Actions
  loadSuccess: action((state, payload: Facture[]) => {
    state.items = payload;
    state.isLoaded = true;
  }),
  remove: action((state, payload: FacturePrestation) => {
    state.items = state.items.filter(
      (facture: Facture) => facture.id !== payload.facture.id
    );
  }),
  add: action((state, payload: Facture) => {
    state.items = [payload, ...state.items];
  }),

  /*
  addPdf: action((state, payload: Blob) => {
    //state.pdf = [payload, ...state.pdf];
  }),
  */
  updateState: action((state, payload: Facture) => {
    //state.items = [payload, ...state.items];
    state.items.map((item: Facture) =>
      item.filePath === payload.filePath ? item : payload
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
        let response: Map<String, object>;
        response = await factureService.createOrUpdate(
          payload.facture,
          payload.siret,
          payload.prestationId
        );
        let facture: Facture;
        
        const objectArray = Object.entries(response);
        objectArray.forEach(([key, value]) => {
          if (key === "facture") {
            facture = value;
            if (isNew) {
              actions.add(facture);
            } else {
              actions.updateState(facture);
            }
          }
          if (key === "pdf") {
            if(value !== undefined){
              const file = new Blob([value], { type: "application/pdf" });
              const fileURL = URL.createObjectURL(file); 
              console.log(value);       
              //window.open(fileURL); 
            }           
          }
        });

        
      } catch (error) {
        throw error;
      }
    }
  ),

  deleteById: thunk(
    async (actions, payload: FacturePrestation, { injections }) => {
      try {
        const { factureService } = injections;
        await factureService.deleteById(
          payload.siret,
          payload.prestationId,
          payload.facture.id
        );
        actions.remove(payload);
      } catch (error) {
        throw error;
      }
    }
  ),
};

interface FacturePrestation {
  prestationId: number;
  facture: Facture;
  siret: string;
  factureId: number;
}
export default FacturePrestation;
