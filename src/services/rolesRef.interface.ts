import RoleRef from "../domains/RolesRef";

/**
 * UserRoleRef fetcher port
 *
 */
export interface IRolesRefService {
  /**
   * Find Roles ref
   *
   * @returns Promise<UserRoleRef>
   */
  findRolesRef(): Promise<RoleRef[]>;
}
