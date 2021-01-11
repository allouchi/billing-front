import User from "../domains/User";
import { useStoreState } from "../store/hooks";

const useSiret = (): string => {
  const user: Partial<User> = useStoreState((state) => state.user.user);
  let siret: string =
    user && user.company && user.company.siret
      ? user.company.siret
      : "831 502 141 00011";
  return siret;
};

export default useSiret;
