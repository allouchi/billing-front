import User from "../domains/User";
import { useStoreState } from "../store/hooks";

const useSiret = (): string => {
  const item: User = useStoreState((state) => state.user.item);

  let siret: string = item && item.company && item.company.siret;
  return siret;
};

export default useSiret;
