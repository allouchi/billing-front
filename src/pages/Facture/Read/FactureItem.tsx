import React, { FC, ReactElement } from "react";
import TableRow from "@material-ui/core/TableRow";
import { useSnackbar } from "notistack";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Facture from "../../../domains/Facture";
import { StyledTableCell } from "./FactureList";
import { useIntl } from "react-intl";
import DeleteItem from "../../../components/DeleteItem/DeleteItem";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import { useHistory } from "react-router-dom";
import { IconButton, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import BuildMessageTooltip from "../../../shared/BuildMessageTooltip";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
  },
});

interface FactureItemProps {
  item: Facture;
}
const FactureItem: FC<FactureItemProps> = ({ item }): ReactElement => {
  const intl = useIntl();
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const deleteById = useStoreActions((actions) => actions.factures.deleteById);
  const downloadPdf = useStoreActions((actions) => actions.pdf.downloadPdf);
  const [open, setOpen] = React.useState(false);

  const updateFactureClick = () => {
    let dateEncaissement = item.dateEncaissement;
    if (dateEncaissement && dateEncaissement !== "") {
      let newDate = dateEncaissement.split("/");
      let date = newDate[2] + "-" + newDate[1] + "-" + newDate[0];
      item.dateEncaissement = date;
    }
    let facture = JSON.stringify(item);

    history.push({
      pathname: "/facture",
      search: "",
      state: { detail: facture },
    });
  };

  const handleDeleteClick = () => {
    const message = intl.formatMessage(
      { id: "messages.delete.success" },
      { cle: "La facture" }
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
  };

  const onClickTable = () => {
    setOpen(!open);
  };

  const downloadPdfClick = () => {
    const message = intl.formatMessage(
      { id: "messages.download.success" },
      { cle: "La facture" }
    );

    downloadPdf(item.id)
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

  const etatFature =
    item.dateEncaissement === "" || item.dateEncaissement === null
      ? { backgroundColor: "olive" }
      : { backgroundColor: "red" };

  return (
    <>
      <StyledTableRow style={etatFature}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={onClickTable}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell sortDirection="asc">
          {item.numeroFacture}
        </StyledTableCell>
        <StyledTableCell>{item.quantite}</StyledTableCell>
        <StyledTableCell>{item.prixTotalHT}</StyledTableCell>
        <StyledTableCell>{item.prixTotalTTC}</StyledTableCell>
        <StyledTableCell>{item.dateEcheance}</StyledTableCell>
        <StyledTableCell>{item.dateEncaissement}</StyledTableCell>
        <StyledTableCell>
          <Tooltip title={BuildMessageTooltip("facture", "update")}>
            <IconButton
              onClick={updateFactureClick}
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
          <Tooltip title={BuildMessageTooltip("facture", "download")}>
            <IconButton
              onClick={downloadPdfClick}
              aria-label="edit"
              size="small"
              style={{ marginRight: 6 }}
            >
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow style={etatFature}>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Détail facture
              </Typography>
              <Table
                className={classes.table}
                size="small"
                aria-label="purchases"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      Numéro commande
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Date de facturation
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Statut facture
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Frais retard
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Jours retard
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Délai paiement
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Montant TVA
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={item.id}>
                    <StyledTableCell align="center">
                      {item.numeroCommande}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.dateFacturation}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.factureStatus}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.fraisRetard}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.nbJourRetard}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.delaiPaiement}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.montantTVA}
                    </StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default FactureItem;
