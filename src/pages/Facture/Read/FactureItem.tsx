import React, { FC, ReactElement } from "react";
import TableRow from "@material-ui/core/TableRow";
import { useSnackbar } from "notistack";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Facture from "../../../domains/Facture";
import { StyledTableCell } from "./FactureList";
import { IconButton, Tooltip } from "@material-ui/core";
import { useIntl } from "react-intl";
import DeleteItem from "../../../components/DeleteItem/DeleteItem";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import useSiret from "../../../hooks/siret.hook";
import Prestation from "../../../domains/Prestation";
import FacturePrestation from "../../../store/facture/factures.model";
import BuildMessageTooltip from "../../../shared/BuildMessageTooltip";

//import useSiret from "../../../hooks/siret.hook";

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

interface FactureItemProps {
  item: Facture;
}
const FactureItem: FC<FactureItemProps> = ({ item }): ReactElement => {
  const intl = useIntl();
  const history = useHistory();
  const siret: string = useSiret();
  const { enqueueSnackbar } = useSnackbar();
  const deleteById = useStoreActions((actions) => actions.factures.deleteById);
  const createOrUpdate = useStoreActions(
    (actions) => actions.factures.createOrUpdate
  );

  const items: Prestation[] = useStoreState((state) => state.prestations.items);
  //const [state, setState] = useState();

  const findPrestationId = (): number => {
    let pestationId: number = 0;
    let prestation = items.map((prestat) => {
      return prestat;
    });

    for (let i = 0; i < prestation.length; i++) {
      if (typeof prestation[i] !== "undefined") {
        let facture = prestation[i].facture;        
        for (let j = 0; j < facture.length; j++) {
          if (facture[j].id === item.id) {
            pestationId = prestation[i].id;            
          }
        }
      }
    }
    return pestationId;
  };
  const editerFactureClick = () => {    
    const message = intl.formatMessage(
      { id: "messages.edit.success" },
      { cle: "La facture" }
    );
   
    const facturePrestation: FacturePrestation = {
      prestationId: findPrestationId(),
      siret: siret,
      facture: item,
      factureId: item.id,
    };

    createOrUpdate(facturePrestation)
      .then(() => history.push("/factures"))
      .then(() =>
        enqueueSnackbar(message, {
          variant: "success",
        })
      )
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }; 

  const handleDeleteClick = () => {
    const message = intl.formatMessage(
      { id: "messages.delete.success" },
      { cle: "La facture" }
    );
    
    const facturePrestation: FacturePrestation = {
      prestationId: findPrestationId(),
      siret: siret,
      facture: item,
      factureId: item.id,
    };

    deleteById(facturePrestation)
      .then(() => history.push("/factures"))
      .then(() =>
        enqueueSnackbar(message, {
          variant: "success",
        })
      )
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const styleStatus =
    item.factureStatus === "KO" ? "color:green" : "color: red";

  return (
    <StyledTableRow>
      <StyledTableCell>{item.id}</StyledTableCell>
      <StyledTableCell>{item.numeroFacture}</StyledTableCell>
      <StyledTableCell>{item.numeroCommande}</StyledTableCell>
      <StyledTableCell>{item.quantite}</StyledTableCell>
      <StyledTableCell>{item.prixTotalHT}</StyledTableCell>
      <StyledTableCell>{item.prixTotalTTC}</StyledTableCell>
      <StyledTableCell>{item.dateFacturation}</StyledTableCell>
      <StyledTableCell>{item.dateEcheance}</StyledTableCell>
      <StyledTableCell>{item.delaiPaiement}</StyledTableCell>
      <StyledTableCell>{item.dateEncaissement}</StyledTableCell>
      <StyledTableCell>{item.nbJourRetard}</StyledTableCell>
      <StyledTableCell className={styleStatus}>
        {item.factureStatus}
      </StyledTableCell>
      <StyledTableCell>{item.fraisRetard}</StyledTableCell>
      <StyledTableCell>
        <Tooltip title={BuildMessageTooltip("facture", "edit")}>
          <IconButton
            onClick={editerFactureClick}
            aria-label="edit"
            size="small"
            style={{ marginRight: 6 }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <DeleteItem
          id={item.id}
          cle="facture"
          value={item.numeroFacture}
          deleteAction={handleDeleteClick}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default FactureItem;
