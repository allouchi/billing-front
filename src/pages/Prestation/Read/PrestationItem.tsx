import React, { FC, ReactElement } from "react";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Prestation from "../../../domains/Prestation";
import { StyledTableCell } from "./PrestationList";
import ConsultantAvatar from "./../../../components/Avatar/ConsultantAvatar";
import { useIntl } from "react-intl";
import {IconButton, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteItem from "../../../components/DeleteItem/DeleteItem";
import { useStoreActions } from "../../../store/hooks";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import BuildMessageTooltip from "../../../shared/BuildMessageTooltip";

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

interface PrestationItemProps {
  item: Prestation;
  editerFacture(item: Prestation): void;
}
const FactureItem: FC<PrestationItemProps> = ({
  item,
  ...props
}): ReactElement => {
  const intl = useIntl();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const deleteById = useStoreActions(
    (actions) => actions.prestations.deleteById
  ); 

  const handleEditClick = () => {
    props.editerFacture(item);   
  };

  const handleDeleteClick = () => {
    const message = intl.formatMessage(
      { id: "messages.delete.success" },
      { cle: "La prestation" }
    );

    deleteById(item.id)
      .then(() => history.push("/prestations"))
      .then(() =>
        enqueueSnackbar(message, {
          variant: "success",
        })
      )
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  return (
    <StyledTableRow>
      <StyledTableCell>{item.id}</StyledTableCell>
      <StyledTableCell>{item.tarifHT}</StyledTableCell>
      <StyledTableCell>{item.numeroCommande}</StyledTableCell>
      <StyledTableCell>{item.delaiPaiement}</StyledTableCell>
      <StyledTableCell>
        <ConsultantAvatar consultant={item.consultant} />{" "}
      </StyledTableCell>
      <StyledTableCell>{item.client.socialReason}</StyledTableCell>
      <StyledTableCell>
        <Tooltip title={BuildMessageTooltip("prestation", "edit")}>
          <IconButton
            onClick={() => handleEditClick()}
            aria-label="edit"
            size="small"
            style={{ marginRight: 6 }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <DeleteItem
          id={item.id}
          cle="prestation"
          value={item.numeroCommande}
          deleteAction={handleDeleteClick}
        />      
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default FactureItem;
