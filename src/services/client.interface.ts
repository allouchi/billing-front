import Client from '../domains/Client';

/**
 * Client fetcher port
 *
 */
export interface IClientService {
  /**
   * Create new Client for the current project or update it if already exists
   *
   * @param client facture to create or to update
   * @returns Promise<Facture>
   */
  createOrUpdate(client: Client, siret: string): Promise<Client>;

  /**
   * Get all schemas if no project or all schemas for project name in otherwise
   *
   * @param client client name
   * @returns Promise<Client[]>
   */
  findAllBySiret(siret : string): Promise<Client[]>;

  /**
   * Delete one facture by it's id
   *
   * @param id facture id to delete
   */
  deleteById(id: number): Promise<String>;
}
