import React, { FC, ReactElement } from "react";
import TableCell from "@material-ui/core/TableCell";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Company from "../../../domains/Company";
import { IconButton, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useIntl } from "react-intl";
import DeleteItem from "../../../components/DeleteItem/DeleteItem";
import { useStoreActions } from "../../../store/hooks";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import BuildMessageTooltip from "../../../shared/BuildMessageTooltip";

interface CompanyItemProps {
  item: Company;
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

const CompanyItem: FC<CompanyItemProps> = ({ item }): ReactElement => {
  const intl = useIntl();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const deleteById = useStoreActions((actions) => actions.companies.deleteById);

  const handleDeleteClick = () => {
    const messageId = intl.formatMessage(
      { id: "delete.success" },
      { cle: "tooltip.company" }
    );
    deleteById(item.id)
      .then(() => history.push("/companies"))
      .then(() =>
        enqueueSnackbar(messageId, {
          variant: "success",
        })
      )
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const editerCompanyClick = () => {
    let company = JSON.stringify(item);
    history.push({
      pathname: "/company",
      search: "",
      state: { mode: "update", detail: company },
    });
  };

  return (
    <>
      <StyledTableCell> {item.socialReason}</StyledTableCell>
      <StyledTableCell> {item.siret} </StyledTableCell>
      <StyledTableCell> {item.rcsName} </StyledTableCell>
      <StyledTableCell> {item.numeroTva} </StyledTableCell>
      <StyledTableCell> {item.codeApe} </StyledTableCell>
      <StyledTableCell>
        <Tooltip title={BuildMessageTooltip("company", "edit")}>
          <IconButton
            onClick={editerCompanyClick}
            aria-label="edit"
            size="small"
            style={{ marginRight: 6 }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <DeleteItem
          id={item.id}
          cle="company"
          value={item.socialReason}
          deleteAction={handleDeleteClick}
        />
      </StyledTableCell>
    </>
  );
};

export default CompanyItem;
