import Role from "./Role";
import Company from "./Company";

export default interface User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: Partial<Company>;
  role?: Role;
}
