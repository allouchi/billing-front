import User from "../domains/User";
import { useStoreState } from "../store/hooks";

const useSiret = (): string => {
  /*
  const user: Partial<User> = useStoreState((state) => state.user.user);
  let siret: string =
    user && user.company && user.company.siret
      ? user.company.siret
      : "85292702900011";
  */
  return "85292702900011";
};

export default useSiret;
