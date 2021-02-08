import { IFactureService } from "./services/facture.interface";
import { FactureServiceImpl } from "./services/impl/factureImpl";

import { ICompanyService } from "./services/company.interface";
import { CompanyServiceImpl } from "./services/impl/companyImpl";

import { IClientService } from "./services/client.interface";
import { ClientServiceImpl } from "./services/impl/clientImpl";

import { IConsultantService } from "./services/consultant.interface";
import { ConsultantServiceImpl } from "./services/impl/consultantImpl";

import { IPrestationService } from "./services/prestation.interface";
import { PrestationServiceImpl } from "./services/impl/prestationImpl";

import { IUserService } from "./services/user.interface";
import { UserServiceImpl } from "./services/impl/userImpl";

import { IRolesRefService } from "./services/rolesRef.interface";
import { RolesRefImpl } from "./services/impl/rolesRefImpl";

import { IPdfService } from "./services/pdf.interface";
import { PdfServiceImpl } from "./services/impl/pdfImpl";

class ManualDependenciesConfiguration {
  private readonly _factureService: IFactureService;
  private readonly _companyService: ICompanyService;
  private readonly _clientService: IClientService;
  private readonly _consultantService: IConsultantService;
  private readonly _prestationService: IPrestationService;
  private readonly _userService: IUserService;
  private readonly _pdfService: IPdfService;
  private readonly _rolesRefService: IRolesRefService;

  constructor() {
    this._factureService = new FactureServiceImpl();
    this._companyService = new CompanyServiceImpl();
    this._clientService = new ClientServiceImpl();
    this._consultantService = new ConsultantServiceImpl();
    this._prestationService = new PrestationServiceImpl();
    this._userService = new UserServiceImpl();
    this._rolesRefService = new RolesRefImpl();
    this._pdfService = new PdfServiceImpl();
  }
  get factureService(): IFactureService {
    return this._factureService;
  }
  get companyService(): ICompanyService {
    return this._companyService;
  }
  get clientService(): IClientService {
    return this._clientService;
  }
  get consultantService(): IConsultantService {
    return this._consultantService;
  }
  get prestationService(): IPrestationService {
    return this._prestationService;
  }
  get rolesRefService(): IRolesRefService {
    return this._rolesRefService;
  }

  get userService(): IUserService {
    return this._userService;
  }
  get pdfService(): IPdfService {
    return this._pdfService;
  }
}
export const Configuration = new ManualDependenciesConfiguration();
