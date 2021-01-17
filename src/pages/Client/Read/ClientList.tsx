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
import ClientItem from "./ClientItem";
import Client from "../../../domains/Client";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import { useSnackbar } from "notistack";
import Alert from "@material-ui/lab/Alert";
import User from "../../../domains/User";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 700,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const clients = (
  items: Client[],
  classes: Record<"table", string>
): ReactElement => {
  return (
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>

          <StyledTableCell>Id</StyledTableCell>
          <StyledTableCell align="left">Raison sociale</StyledTableCell>
          <StyledTableCell align="left">Adresse Email</StyledTableCell>
          <StyledTableCell align="left">Adresse client</StyledTableCell>
          <StyledTableCell align="left">{}</StyledTableCell>                            
        </TableRow>
      </TableHead>
      <TableBody>
        {items && items.map((client: Client, index: number) => (
          <StyledTableRow key={index}>
            <ClientItem key={index} item={client} />
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const ClientList: FC<{}> = () => {
  const classes = useStyles();
  const findAllBySiret = useStoreActions(
    (actions) => actions.clients.findAllBySiret
  );
  const isLoaded: boolean = useStoreState(
    (state) => state.clients.isLoaded
  );
  const items: Client[] = useStoreState((state) => state.clients.items);
  const connectedUser: Partial<User> = useStoreState((state) => state.user.user);

  const { enqueueSnackbar } = useSnackbar();
  const [onError, setOnError] = useState(false);
  let siret: string = connectedUser && connectedUser.company && connectedUser.company.siret ? connectedUser.company.siret : "85292702900011";

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
          clients(items, classes)
        ) : (
          <Alert severity="warning">Aucun client enregistré</Alert>
        )}
      </TableContainer>
    </div>
  );
};

export default ClientList;
