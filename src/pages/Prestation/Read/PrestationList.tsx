import React, { FC, useEffect, useState } from "react";
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
import PrestationItem from "./PrestationItem";
import Prestation from "../../../domains/Prestation";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import { useSnackbar } from "notistack";
//import User from "../../../domains/User";
import FactureEdit from "../Edit/FactureEdit";
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
    minWidth: 900,
  },
});


const PrestationList: FC<{}> = () => {
  const classes = useStyles();
  //const intl = useIntl();
  const findAllBySiret = useStoreActions(
    (actions) => actions.prestations.findAllBySiret
  );
  const isLoaded: boolean = useStoreState(
    (state) => state.prestations.isLoaded
  );
  const items: Prestation[] = useStoreState((state) => state.prestations.items);
  /*
  const connectedUser: Partial<User> = useStoreState(
    (state) => state.user.user
  );
  */
  const { enqueueSnackbar } = useSnackbar();
  const [onError, setOnError] = useState(false);
  const [clickOn, setClickOn] = useState(true);
  const [currentItem, setCurrentItem] = useState<Prestation>();
  const siret: string = useSiret();

  const handleEditFacture = (item: Prestation) => {    
    setCurrentItem(item);    
    setClickOn(true);
  };

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
          <>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Id</StyledTableCell>
                  <StyledTableCell align="left">Tarif HT</StyledTableCell>
                  <StyledTableCell align="left">Numéro de commande</StyledTableCell>
                  <StyledTableCell align="left">
                    Délai de paiement
                  </StyledTableCell>
                  <StyledTableCell align="left">Consultant</StyledTableCell>
                  <StyledTableCell align="left">Client</StyledTableCell>
                  <StyledTableCell align="left">{}</StyledTableCell>                  
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((prestation: Prestation, index: number) => (
                  <PrestationItem
                    key={index}
                    item={prestation}
                    editerFacture={handleEditFacture}
                  />
                ))}
              </TableBody>
            </Table>
            {currentItem && <FactureEdit item={currentItem} clickOn={clickOn} />}
          </>
        ) : (
          <Alert severity="warning">Aucune prestation enregistrée</Alert>
        )}
      </TableContainer>
    </div>
  );
};

export default PrestationList;
