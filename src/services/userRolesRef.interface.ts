import UserRoleRef from "../domains/UserRolesRef";

/**
 * UserRoleRef fetcher port
 *
 */
export interface IUserRolesRefService {
  /**
   * Find Roles ref
   *
   * @returns Promise<UserRoleRef>
   */
  findRolesRef(): Promise<UserRoleRef[]>;
}
