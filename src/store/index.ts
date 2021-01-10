import { createStore } from "easy-peasy";
import model from "./model";
import { Configuration } from "../configuration";

const factureService = Configuration.factureService;
const companyService = Configuration.companyService;
const clientService = Configuration.clientService;
const prestationService = Configuration.prestationService;
const consultantService = Configuration.consultantService;
const userService = Configuration.userService;
const pdfService = Configuration.pdfService;
const store = createStore(model, {
  injections: {
    factureService,
    companyService,
    clientService,
    prestationService,
    consultantService,
    userService,
    pdfService,
  },
});

export default store;
