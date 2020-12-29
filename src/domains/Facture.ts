import Prestation from "./Prestation";

export default interface Facture {
  id: number;
  numeroFacture: string;
  dateFacturation: string;
  dateEcheance: string;
  dateEncaissement: string; 
  delaiPaiement: number;
  numeroCommande: string;
  tva: number;
  prixTotalHT: number;
  prixTotalTTC: number;
  nbJourRetard: number;
  fraisRetard: number;  
  factureStatus: string;
  quantite: number,
  designation: string,  
}
