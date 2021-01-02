import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FactureItem from "./FactureItem";
import Facture from "../../../domains/Facture";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import { useSnackbar } from "notistack";
import useSiret from "../../../hooks/siret.hook";
//import {useIntl} from 'react-intl';

export const StyledTableCell = withStyles((theme: Theme) =>
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

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
  },
});

const factures = (
  items: Facture[],
  classes: Record<"table", string>
): ReactElement => {
  return (
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Id</StyledTableCell>
          <StyledTableCell align="left">Numéro Facture</StyledTableCell>          
          <StyledTableCell align="left">Quantité</StyledTableCell>         
          <StyledTableCell align="left">Prix Total HT</StyledTableCell>
          <StyledTableCell align="left">Prix Total TTC</StyledTableCell>
          <StyledTableCell align="left">Date de Facturation</StyledTableCell>
          <StyledTableCell align="left">Date d'Echéance</StyledTableCell>
          <StyledTableCell align="left">Délai(j)</StyledTableCell>
          <StyledTableCell align="left">Date d'Encaissement</StyledTableCell>          
          <StyledTableCell align="left">Jours de Retard</StyledTableCell>
          <StyledTableCell align="left">Statut de la Facture</StyledTableCell>          
          <StyledTableCell align="left">Frais de Retard</StyledTableCell>
          <StyledTableCell></StyledTableCell> 
          <StyledTableCell></StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((facture: Facture, index: number) => (
          <FactureItem key={index} item={facture} />
        ))}
      </TableBody>
    </Table>
  );
};

const FactureList: FC<{}> = () => {
  const classes = useStyles();
  //const intl = useIntl();
  const findAllBySiret = useStoreActions(
    (actions) => actions.factures.findAllBySiret
  );
  const isLoaded: boolean = useStoreState((state) => state.factures.isLoaded);
  const items: Facture[] = useStoreState((state) => state.factures.items);
  const { enqueueSnackbar } = useSnackbar();
  const [onError, setOnError] = useState(false);

  let siret: string = useSiret();

  useEffect(() => {
    if (!isLoaded) {
      findAllBySiret(siret).catch((e: Error) => {
        enqueueSnackbar(e.message, { variant: "error" });
        setOnError(true);
      });
    }
  }, [findAllBySiret, enqueueSnackbar, isLoaded, siret]);

  if (!isLoaded && !onError) {
    return <CircularProgress color="inherit" />;
  }
  return (
    <div className={classes.table}>
      <TableContainer component={Paper}>
        {items && items.length > 0 ? (
          factures(items, classes)
        ) : (
          <Alert severity="warning">Aucune facture enregistrée</Alert>
        )}
      </TableContainer>
    </div>
  );
};

export default FactureList;
