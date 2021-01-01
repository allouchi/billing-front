import Client from "../domains/Client";
import Consultant from "../domains/Consultant";
import Facture from "../domains/Facture";

export const clientIdentity = (client: Client): string => {
  return upperFirstCase(client.socialReason);
};

export const consultantIdentity = (consultant: Consultant): string => {
  return `${upperFirstCase(
    consultant.firstName
  )} ${consultant.lastName.toUpperCase()}`;
};

export const isEmptyString = (value: string | undefined | null): boolean => {
  return value === undefined || value === null || value.trim() === "";
};

export const isNotEmptyString = (value: string | undefined | null): boolean => {
  return !isEmptyString(value);
};

const upperFirstCase = (value: string): string => {
  return `${value.charAt(0).toUpperCase()}${value
    .substring(1, value.length)
    .toLowerCase()}`;
};

export const initial = (value: string): string => {
  return value.charAt(0).toUpperCase();
};

export const parseConsultJsonObject = (jsonObject: any): Consultant => {
  let consult = {
    id: 0,
    lastName: "",
    firstName: "",
    mail: "",
  };

  if (jsonObject !== null && jsonObject.detail !== null) {
    let detail = jsonObject.detail;
    let item = JSON.parse(detail);
    consult = {
      id: item.id,
      lastName: item.lastName,
      firstName: item.firstName,
      mail: item.mail,
    };
  }
  return consult;
};

export const parseClientJsonObject = (jsonObject: any): Client => {
  let adresseClient = {
    id: 0,
    numero: "",
    voie: "",
    complementAdresse: "",
    codePostal: "",
    commune: "",
    pays: "France",
  };
  let client = {
    id: 0,
    socialReason: "",
    mail: "",
    adresseClient: adresseClient,
  };

  if (jsonObject !== null && jsonObject.detail !== null) {
    let detail = jsonObject.detail;
    let item = JSON.parse(detail);
    client = {
      id: item.id,
      socialReason: item.socialReason,
      mail: item.mail,
      adresseClient: item.adresseClient,
    };
  }
  return client;
};

export const parseFactureJsonObject = (jsonObject: any): Facture => {
  
  let facture = {
  id: 0,
  numeroFacture: '',
  dateFacturation: '',
  dateEcheance: '',
  dateEncaissement: '', 
  delaiPaiement: 0,
  numeroCommande: '',
  tva: 0,
  prixTotalHT: 0,
  prixTotalTTC: 0,
  nbJourRetard: 0,
  fraisRetard: 0,  
  factureStatus: '',
  quantite: 0,
  designation: '',  
  };

  if (jsonObject !== null && jsonObject.detail !== null) {
    let detail = jsonObject.detail;
    let item = JSON.parse(detail);
    facture = {
      id: item.id,
      numeroFacture: item.numeroFacture,
      dateFacturation: item.dateFacturation,
      dateEcheance: item.dateEcheance,
      dateEncaissement: item.dateEncaissement, 
      delaiPaiement: item.delaiPaiement,
      numeroCommande: item.numeroCommande,
      tva: item.tva,
      prixTotalHT: item.prixTotalHT,
      prixTotalTTC: item.prixTotalTTC,
      nbJourRetard: item.nbJourRetard,
      fraisRetard: item.fraisRetard,  
      factureStatus: item.factureStatus,
      quantite: item.quantite,
      designation: item.designation,  
    };
  }
  return facture;
};
