import Company from "./Company";

export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  company: Partial<Company>;
}
