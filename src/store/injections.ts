/* istanbul ignore file */
import { IFactureService } from '../services/facture.interface';
import { ICompanyService } from '../services/company.interface';
import { IClientService } from '../services/client.interface';
import { IConsultantService } from '../services/consultant.interface';
import { IPrestationService } from '../services/prestation.interface';
import { IUserService } from '../services/user.interface';
import { IPdfService } from '../services/pdf.interface';

export interface Injections {
  factureService: IFactureService;
  companyService: ICompanyService;
  clientService: IClientService;
  consultantService: IConsultantService;
  prestationService: IPrestationService;
  userService: IUserService;
  pdfService: IPdfService;
}


