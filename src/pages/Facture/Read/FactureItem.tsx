import React, { FC, ReactElement, useEffect, useState } from "react";
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
import { IconButton, Tooltip } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

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

const StyledDetailTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#d0f0f5",
      color: "#25829e",
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const useStyles = makeStyles({
  table: {
    width: "110%",
  },
  description_aquited: {
    color: "#1FA055",
  },
  description_non_aquited: {
    color: "#b63939",
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
  const pdf: [] = useStoreState((state) => state.pdf.items);
  const isLoaded: boolean = useStoreState((state) => state.pdf.isLoaded);
  const deleteById = useStoreActions((actions) => actions.factures.deleteById);
  const downloadPdf = useStoreActions((actions) => actions.pdf.downloadPdf);
  const [open, setOpen] = useState(false);
  const [onClick, setOnClick] = useState(false);

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

  const base64ToArrayBuffer = (data) => {
    var binaryString = window.atob(data);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return new Blob([bytes], { type: "application/pdf" });
  };

  const downloadFile = () => {
    let blob = base64ToArrayBuffer(pdf);
    let data = window.URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = data;
    link.download = "Facture.pdf";
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
  };

  const downloadPdfClick = () => {
    setOnClick(true);
    const message = intl.formatMessage(
      { id: "messages.download.success" },
      { cle: "La facture" }
    );

    downloadPdf(item.id)
      .then(() => history.push("/factures"))
      .then(() => {
        enqueueSnackbar(message, {
          variant: "success",
        });
      })
      .catch((err: Error) => {
        setOnClick(false);
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const etatFature = item.dateEncaissement
    ? classes.description_aquited
    : classes.description_non_aquited;

  useEffect(() => {
    if (onClick && isLoaded) {
      downloadFile();
    }
  }, [onClick, isLoaded]);

  return (
    <>
      <StyledTableRow>
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
        <StyledTableCell>{item.tarifHT}€</StyledTableCell>
        <StyledTableCell>{item.quantite}</StyledTableCell>
        <StyledTableCell>{item.prixTotalHT}€</StyledTableCell>
        <StyledTableCell>{item.prixTotalTTC}€</StyledTableCell>
        <StyledTableCell>{item.dateEcheance}</StyledTableCell>
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
      <StyledTableRow>
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
                    <StyledDetailTableCell align="center">
                      Numéro commande
                    </StyledDetailTableCell>
                    <StyledDetailTableCell align="center">
                      Date de facturation
                    </StyledDetailTableCell>
                    <StyledDetailTableCell align="center">
                      Date d'encaissement
                    </StyledDetailTableCell>
                    <StyledDetailTableCell align="center">
                      Statut facture
                    </StyledDetailTableCell>
                    <StyledDetailTableCell align="center">
                      Description
                    </StyledDetailTableCell>
                    <StyledDetailTableCell align="center">
                      Frais retard
                    </StyledDetailTableCell>
                    <StyledDetailTableCell align="center">
                      Jours retard
                    </StyledDetailTableCell>
                    <StyledDetailTableCell align="center">
                      Délai paiement
                    </StyledDetailTableCell>
                    <StyledDetailTableCell align="center">
                      Montant TVA
                    </StyledDetailTableCell>
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
                      {item.dateEncaissement}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b className={etatFature}>{item.factureStatus}</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b className={etatFature}>{item.statusDesc}</b>
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
                      {item.montantTVA}€
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
