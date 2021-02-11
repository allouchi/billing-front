import Role from "./Role";
import Company from "./Company";

export default interface User {
  userName: string;
  password: string;
  company?: Partial<Company>;
  role?: Role;
}
