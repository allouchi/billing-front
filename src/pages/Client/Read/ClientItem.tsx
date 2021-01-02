import React, { FC, ReactElement } from "react";
import TableCell from "@material-ui/core/TableCell";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Client from "../../../domains/Client";
import { Tooltip } from "@material-ui/core";
import { useIntl } from "react-intl";
import DeleteItem from "../../../components/DeleteItem/DeleteItem";
import { useSnackbar } from "notistack";
import { useStoreActions } from "../../../store/hooks";
import { useHistory } from "react-router-dom";
import BuildMessageTooltip from "../../../shared/BuildMessageTooltip";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

interface ClientItemProps {
  item: Client;
}

const ClientItem: FC<ClientItemProps> = ({ item }): ReactElement => {
  const intl = useIntl();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const deleteById = useStoreActions((actions) => actions.clients.deleteById);

  const handleDeleteClick = () => {
    const message = intl.formatMessage(
      { id: "messages.delete.success" },
      { cle: "client" }
    );

    deleteById(item.id)
      .then(() => history.push("/clients"))
      .then(() =>
        enqueueSnackbar(message, {
          variant: "success",
        })
      )
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const editerClientClick = () => {   
    let client = JSON.stringify(item);
    history.push({
      pathname: "/client",
      search: "",
      state: { detail: client },
    });
  };
  return (
    <>
      <StyledTableCell> {item.id}</StyledTableCell>
      <StyledTableCell> {item.socialReason}</StyledTableCell>
      <StyledTableCell> {item.mail}</StyledTableCell>
      <StyledTableCell>
        {item.adresseClient.numero} {item.adresseClient.rue}{" "}
        {item.adresseClient.codePostal}{" "}
        {item.adresseClient.localite} {" "} {item.adresseClient.pays}
      </StyledTableCell>
      <StyledTableCell>
        <Tooltip title={BuildMessageTooltip("client", "edit")}>
          <IconButton
            onClick={editerClientClick}
            aria-label="edit"
            size="small"
            style={{ marginRight: 6 }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <DeleteItem
          id={item.id}
          cle="client"
          value={item.socialReason}
          deleteAction={handleDeleteClick}
        />
      </StyledTableCell>
    </>
  );
};

export default ClientItem;
