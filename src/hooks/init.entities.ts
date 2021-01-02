export interface ClientInit{
    id: 0,
    socialReason: "",
    adresseClient: {
      id: 0,
      numero: "",
      rue: "", 
      codePostal: "",
      localite: "",
      pays: "",
    }
}
export interface ConsultantInit{
    id: 0,
    lastName: "",
    firstName: "",
    mail: "";
}
export interface PrestationInit{
    id: 0,
    tarifHT: 0,
    numeroCommande: "",
    delaiPaiement: 0,
    nbJourEffectue: 0,
    consultant: {},
    client: {},
    facture: {},
}
export interface UserInit{
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    company: {},
}
export interface FactureInit{
    id: 0,
    numeroFacture: "",
    dateFacturation: "",
    dateEcheance: "",
    dateEncaissement: "", 
    nbJoursEffectues: 0,
    delaiPaiement: 0,
    tva: 0,
    prixTotalHT: 0,
    prixTotalTTC: 0,
    nbJourRetard: 0,
    fraisRetard: 0,  
    factureStatus: "",
}
export interface CompanyInit{
    id: 0,
    socialReason: "",
    status: "",
    siret: "",
    rcsName: "",
    numeroTva: "",
    ape: "",
    adresseCompnay: {
        id: 0,
        numero: "",
        rue: "",       
        codePostal: "",
        localite: "",
        pays: "",
      },
    users: {},
    clients:{},
    consultants:{},
    prestations: {},
}