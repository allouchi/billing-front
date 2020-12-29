import Client from "./Client";
import Consultant from "./Consultant";
import Facture from "./Facture";

export default interface Prestation {
  id: number; 
  tarifHT: number;
  delaiPaiement: number;  
  consultant: Consultant;
  client: Client;
  facture: Facture;
  numeroCommande: string;
  startDate?: Date;
  endDate?: Date;
}
