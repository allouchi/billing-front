import User from '../domains/User';

/**
 * User fetcher port
 *
 */
export interface IUserService { 
  /**
   * Connect user
   *
   * @param user user to find
   * @returns Promise<User>
   */
  connect(user: Partial<User>): Promise<User>;

  /**
   * Disconnect user
   *
   * @param user user
   * @returns Promise<void>
   */
  disconnect(user: User): Promise<void>;
}
