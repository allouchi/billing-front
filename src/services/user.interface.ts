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

  /**
   * Create new user
   *
   * @param user user to create or to update
   * @returns Promise<>
   */
  createUser(user: User): Promise<string>;
}
