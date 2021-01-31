import Client from "../domains/Client";
import Consultant from "../domains/Consultant";
import Facture from "../domains/Facture";
import Company from "../domains/Company";
import Prestation from "../domains/Prestation";
import User from "../domains/User";

export const isUserAdmin = (user: User): boolean => {
  let isAdmin = false;
  if (
    user !== null &&
    user !== undefined &&
    user.userRole !== null &&
    user.userRole !== undefined &&
    user.userRole.roleId !== undefined &&
    user.userRole.roleId === "1"
  ) {
    isAdmin = true;
  }
  return isAdmin;
};

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

export const parseCompanyJsonObject = (jsonObject: any): Company => {
  let company: Company = {
    id: 0,
    socialReason: "",
    status: "",
    siret: "",
    rcsName: "",
    numeroTva: "",
    codeApe: "",
    numeroIban: "",
    numeroBic: "",
    companyAdresse: {
      id: 0,
      numero: "",
      rue: "",
      codePostal: "",
      localite: "",
      pays: "",
    },
    users: [],
    clients: [],
    consultants: [],
    prestations: [],
  };

  if (
    jsonObject !== null &&
    jsonObject !== undefined &&
    jsonObject.detail !== null &&
    jsonObject.detail !== undefined
  ) {
    let detail = jsonObject.detail;
    let item = JSON.parse(detail);

    company = {
      id: item.id,
      socialReason: item.socialReason,
      status: item.status,
      siret: item.siret,
      rcsName: item.rcsName,
      numeroTva: item.numeroTva,
      codeApe: item.codeApe,
      numeroIban: item.numeroIban,
      numeroBic: item.numeroBic,
      companyAdresse: {
        id: item.companyAdresse.id,
        numero: item.companyAdresse.numero,
        rue: item.companyAdresse.rue,
        codePostal: item.companyAdresse.codePostal,
        localite: item.companyAdresse.localite,
        pays: item.companyAdresse.pays,
      },
      users: [],
      clients: [],
      consultants: [],
      prestations: [],
    };
  }
  return company;
};

export const parseConsultJsonObject = (jsonObject: any): Consultant => {
  let consult = {
    id: 0,
    lastName: "",
    firstName: "",
    mail: "",
    fonction: "",
  };

  if (
    jsonObject !== null &&
    jsonObject !== undefined &&
    jsonObject.detail !== null &&
    jsonObject.detail !== undefined
  ) {
    let detail = jsonObject.detail;
    let item = JSON.parse(detail);
    consult = {
      id: item.id,
      lastName: item.lastName,
      firstName: item.firstName,
      mail: item.mail,
      fonction: item.fonction,
    };
  }
  return consult;
};

export const parseClientJsonObject = (jsonObject: any): Client => {
  let client = {
    id: 0,
    socialReason: "",
    mail: "",
    adresseClient: {
      id: 0,
      numero: "",
      rue: "",
      codePostal: "",
      localite: "",
      pays: "France",
    },
  };

  if (
    jsonObject !== null &&
    jsonObject !== undefined &&
    jsonObject.detail !== null &&
    jsonObject.detail !== undefined
  ) {
    let detail = jsonObject.detail;
    let item = JSON.parse(detail);
    client = {
      id: item.id,
      socialReason: item.socialReason,
      mail: item.mail,
      adresseClient: {
        id: item.adresseClient.id,
        numero: item.adresseClient.numero,
        rue: item.adresseClient.rue,
        codePostal: item.adresseClient.codePostal,
        localite: item.adresseClient.localite,
        pays: item.adresseClient.pays,
      },
    };
  }
  return client;
};

export const parseFactureJsonObject = (jsonObject: any): Facture => {
  let facture = {
    id: 0,
    numeroFacture: "",
    dateFacturation: "",
    dateEcheance: "",
    dateEncaissement: "",
    delaiPaiement: 0,
    numeroCommande: "",
    montantTVA: 0,
    prixTotalHT: 0,
    prixTotalTTC: 0,
    nbJourRetard: 0,
    fraisRetard: 0,
    factureStatus: "",
    quantite: 0,
    designation: "",
    clientPrestation: "",
    filePath: "",
  };

  if (
    jsonObject !== null &&
    jsonObject !== undefined &&
    jsonObject.detail !== null &&
    jsonObject.detail !== undefined
  ) {
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
      montantTVA: item.montantTVA,
      prixTotalHT: item.prixTotalHT,
      prixTotalTTC: item.prixTotalTTC,
      nbJourRetard: item.nbJourRetard,
      fraisRetard: item.fraisRetard,
      factureStatus: item.factureStatus,
      quantite: item.quantite,
      designation: item.designation,
      clientPrestation: item.clientPrestation,
      filePath: item.filePath,
    };
  }
  return facture;
};

export const parseModeJsonObject = (jsonObject: any): string => {
  let retour = "create";
  if (
    jsonObject !== null &&
    jsonObject !== undefined &&
    jsonObject.mode !== null &&
    jsonObject.mode !== undefined
  ) {
    let mode = jsonObject.mode;

    if (mode === "update") {
      retour = "update";
    }
  }
  return retour;
};

export const calculJoursOuvresMois = (date: Date): void => {};
