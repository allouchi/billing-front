import User from "../domains/User";

/**
 * User fetcher port
 *
 */
export interface IUserService {
  /**
   * Find user
   *
   * @param email email
   * @returns Promise<User>
   */
  findUserByEMail(email: string): Promise<User>;
}
