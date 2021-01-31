import Prestation from "../domains/Prestation";

/**
 * Prestation fetcher port
 *
 */
export interface IPrestationService {
  /**
   * Create new facture for the current project or update it if already exists
   *
   * @param prestation prestation to create or to update
   * @returns Promise<Prestation>
   */
  createOrUpdate(
    prestation: Partial<Prestation>,
    siret: string,
    templateChoice: boolean,
    moisFactureId: number
  ): Promise<Prestation>;

  /**
   * Delete one facture by it's id
   *
   * @param id facture id to delete
   */
  deleteById(id: number): Promise<String>;

  /**
   * Get all schemas if no project or all schemas for project name in otherwise
   *
   * @param company company name
   * @returns Promise<Company>
   */
  findAllBySiret(siret: string): Promise<Prestation[]>;
}
