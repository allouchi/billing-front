import UserRole from "./UseRole";
import Company from "./Company";

export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: Partial<Company>;
  userRole?: UserRole;
}
