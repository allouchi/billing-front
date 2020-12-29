import Client from "./Client";
import Adresse from "./Adresse";
import Consultant from "./Consultant";
import User from "./User";
import Prestation from "./Prestation";

/**
 * Company domain
 * @author M.ALIANE
 */
export default interface Company {
  id: number;
  socialReason: string;
  status: string;
  siret: string;
  rcsName: string;
  numeroTva: string;
  ape: string;
  companyAdresse: Adresse;
  users: Partial<User[]>;
  clients?: Client[];
  consultants?: Consultant[];
  prestations?: Prestation[];
}
