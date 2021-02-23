import Company from "../domains/Company";

/**
 * Company fetcher port
 *
 */
export interface ICompanyService {
  /**
   * Create new facture for the current project or update it if already exists
   *
   * @param company company to create or to update
   * @returns Promise<Company>
   */
  createOrUpdate(company: Company): Promise<Company>;

  /**
   * Get all schemas if no project or all schemas for project name in otherwise
   *
   * @param company company name
   * @returns Promise<Company>
   */
  findAllBySiret(siret: string): Promise<Company[]>;

  /**
   * Get all schemas if no project or all schemas for project name in otherwise
   *
   * @param company company name
   * @returns Promise<Company>
   */
  findByUserName(siret: string): Promise<Company[]>;

  /**
   * Get all schemas if no project or all schemas for project name in otherwise
   *
   * @param company company name
   * @returns Promise<Company[]>
   */
  findAll(): Promise<Company[]>;

  /**
   * Delete one facture by it's id
   *
   * @param id facture id to delete
   */
  deleteById(id: number): Promise<String>;
}
