import intl, { IntlModel } from './intl.model';
import { facturesModel, FacturesModel } from './facture/factures.model';
import { companiesModel, CompaniesModel } from './company/companies.model';
import { clientsModel, ClientsModel } from './client/clients.model';
import { consultantsModel, ConsultantsModel } from './consultant/consultants.model';
import { prestationsModel, PrestationsModel } from './prestation/prestations.model';
import { userModel, UserModel } from './user/user.model';

export interface AppStoreModel {
  intl: IntlModel;
  companies: CompaniesModel;
  clients: ClientsModel;
  consultants: ConsultantsModel;
  prestations: PrestationsModel;
  factures: FacturesModel;
  user: UserModel;
}

const model: AppStoreModel = {
  intl,
  companies: companiesModel,
  factures: facturesModel, 
  clients: clientsModel,
  consultants: consultantsModel,
  prestations: prestationsModel,
  user: userModel
};

export default model;
