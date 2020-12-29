import Adresse from "./Adresse";

export default interface Client {
  id: number;
  socialReason: string;
  mail: string;  
  adresseClient: Adresse;  
}
