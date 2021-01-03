import Facture from '../domains/Facture';

/**
 * Facture fetcher port
 *
 */
export interface IFactureService {
   /**
   * Create new facture for the current project or update it if already exists
   *
   * @param facture facture to create or to update
   * @returns Promise<Facture>
   */  
  createOrUpdate(facture: Facture, siret: string, prestationId: number): Promise<Map<string, object>>;

  /**
   * Get all schemas if no project or all schemas for project name in otherwise
   *
   * @param company company name
   * @returns Promise<Facture[]>
   */
  findAllBySiret(siret: string): Promise<Facture[]>;

  /**
   * Delete one facture by it's id
   *
   * @param id facture id to delete
   */
  deleteById(id: number): Promise<String>;
 
}
