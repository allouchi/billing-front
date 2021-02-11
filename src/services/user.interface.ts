import User from "../domains/User";

/**
 * User fetcher port
 *
 */
export interface IUserService {
  /**
   * Create new user
   *
   * @param user user to create or to update
   * @returns Promise<User>
   */
  createUser(user: User): Promise<User>;

  /**
   * Find user
   *
   * @param email email
   * @param password password
   * @returns Promise<User>
   */
  findByEmailAndPassword(email: string, password: string): Promise<User>;

  /**
   * Connect user
   *
   * @param user user to find
   * @returns Promise<User>
   */
  connect(user: User): Promise<User>;

  /**
   * Disconnect user
   *
   * @param user user
   * @returns Promise<void>
   */
  disconnect(user: User): Promise<void>;
}
