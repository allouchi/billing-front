import React, { FC, ReactElement } from "react";
import TableCell from "@material-ui/core/TableCell";
import {
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Consultant from "../../../domains/Consultant";
import { Tooltip } from "@material-ui/core";
import { useIntl } from "react-intl";
import DeleteItem from "../../../components/DeleteItem/DeleteItem";
import { useSnackbar } from "notistack";
import { useStoreActions } from "../../../store/hooks";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import BuildMessageTooltip from "../../../shared/BuildMessageTooltip";
import { IconButton} from "@material-ui/core";
import ConsultantEditPage from "../Create/ConsultantEditPage";


interface ConsultantItemProps {
  item: Consultant;
}

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

const ConsultantItem: FC<ConsultantItemProps> = ({ item }): ReactElement => {
  const intl = useIntl();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const deleteById = useStoreActions((actions) => actions.consultants.deleteById);

  const handleDeleteClick = () => {
    const message = intl.formatMessage(
      { id: "messages.delete.success" },
      { cle: "consultant" }
    );

    deleteById(item.id)
      .then(() => history.push("/consultants"))
      .then(() =>
        enqueueSnackbar(message, {
          variant: "success",
        })
      )
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const editerConsultantClick = () =>{
    alert(item.firstName);
   
  }

  return (
    <>
      <StyledTableCell> {item.id}</StyledTableCell>
      <StyledTableCell> {item.firstName}</StyledTableCell>
      <StyledTableCell> {item.lastName}</StyledTableCell>
      <StyledTableCell> {item.mail}</StyledTableCell> 
      <StyledTableCell>
        <Tooltip title={BuildMessageTooltip("consultant", "edit")}>
          <IconButton onClick={editerConsultantClick} aria-label="edit" size="small" style={{ marginRight: 6 }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <DeleteItem
          id={item.id}
          cle="consultant"
          value={item.firstName}
          deleteAction={handleDeleteClick}
        />
      </StyledTableCell>   
    </>
  );
};

export default ConsultantItem;
