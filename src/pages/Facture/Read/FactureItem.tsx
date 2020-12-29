import React, { FC, ReactElement } from "react";
import TableRow from "@material-ui/core/TableRow";
import { useSnackbar } from "notistack";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Facture from "../../../domains/Facture";
import { StyledTableCell } from "./FactureList";
import { IconButton, Tooltip } from "@material-ui/core";
import { useIntl } from "react-intl";
import DeleteItem from "../../../components/DeleteItem/DeleteItem";
import { useStoreActions } from "../../../store/hooks";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

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
  const { enqueueSnackbar } = useSnackbar();
  const deleteById = useStoreActions((actions) => actions.factures.deleteById);
  //const items: Facture[] = useStoreState((state) => state.factures.items);
  //const [state, setState] = useState();

  const handleEditClick = () =>{
    
  }

  const handleDeleteClick = () =>{ 
    const message = intl.formatMessage(
      { id: "messages.delete.success"}, 
      { value: "facture" }
    );
    deleteById(item.id)
    .then(() => history.push("/factures"))
    .then(() =>
      enqueueSnackbar(message, {
        variant: "success",
      })
    )
    .catch((err: Error) => {
      enqueueSnackbar(err.message, { variant: "error" });
    });
  }
  
  return (
    <StyledTableRow>
      <StyledTableCell>{item.id}</StyledTableCell>
      <StyledTableCell>{item.numeroFacture}</StyledTableCell>
      <StyledTableCell>{item.quantite}</StyledTableCell>
      <StyledTableCell>{item.designation}</StyledTableCell>
      <StyledTableCell>{item.prixTotalHT}</StyledTableCell>
      <StyledTableCell>{item.prixTotalTTC}</StyledTableCell>
      <StyledTableCell>{item.dateFacturation}</StyledTableCell>
      <StyledTableCell>{item.dateEcheance}</StyledTableCell>
      <StyledTableCell>{item.delaiPaiement}</StyledTableCell>
      <StyledTableCell>{item.dateEncaissement}</StyledTableCell>
      <StyledTableCell>{item.nbJourRetard}</StyledTableCell>
      <StyledTableCell>{item.factureStatus}</StyledTableCell>
      <StyledTableCell>{item.fraisRetard}</StyledTableCell>
      <StyledTableCell>
        <Tooltip title={intl.formatMessage({ id: "tooltip.edit" })}>
          <IconButton onClick={() =>handleEditClick()}aria-label="edit" size="small" style={{ marginRight: 6 }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        </StyledTableCell>
        <StyledTableCell>
        <Tooltip title={intl.formatMessage({ id: "tooltip.delete" })}>
        <DeleteItem
          id={item.id}
          cle="facture"
          value={item.numeroFacture}
          deleteAction={handleDeleteClick}
        />
        </Tooltip>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default FactureItem;
