import React, { FC, ReactElement, useState } from "react";
import Prestation from "../../../domains/Prestation";
import { useHistory } from "react-router-dom";
import useSiret from "../../../hooks/siret.hook";
import { useStoreActions } from "../../../store/hooks";
import { useSnackbar } from "notistack";
import PageLayout from "../../../components/PageLayout/PageLayout";
import { useIntl } from "react-intl";
import { Grid, makeStyles, Paper, TextField, Button } from "@material-ui/core";
import PrestationSiret from "../../../store/prestation/prestations.model";
import { parsePrestationJsonObject } from "../../../shared/Utils";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 180,
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
  paper: {
    //padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    padding: "8ch",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

interface ModifyPrestationProps {
  item: Prestation;
  location: Location;
}
const PrestationModify: FC<ModifyPrestationProps> = ({
  item,
  location,
}): ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const siret: string = useSiret();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const modify = useStoreActions(
    (actions) => actions.prestations.modifyPrestation
  );

  let prestaModif = parsePrestationJsonObject(history.location.state);

  let dateFin = prestaModif.dateFin;
  if (dateFin && dateFin !== null) {
    let newDate = dateFin.split("/");
    let date = newDate[2] + "-" + newDate[1] + "-" + newDate[0];
    prestaModif.dateFin = date;
  }

  const [state, setState] = useState({
    prestation: {
      id: prestaModif.id,
      tarifHT: prestaModif.tarifHT,
      delaiPaiement: prestaModif.delaiPaiement,
      clientPrestation: prestaModif.clientPrestation,
      designation: prestaModif.designation,
      numeroCommande: prestaModif.numeroCommande,
      quantite: prestaModif.quantite,
      dateDebut: prestaModif.dateDebut,
      dateFin: prestaModif.dateFin,
      consultant: prestaModif.consultant,
      client: prestaModif.client,
      facture: prestaModif.facture,
    },
  });

  const isValidForm = (): boolean => {
    return state.prestation.dateFin === null;
  };

  const handleInfoPrestation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = e.target.id;
    const value: string = e.target.value;
    setState({
      ...state,
      prestation: { ...state.prestation, [id]: value },
    });
  };

  const cancelPrestaionInfo = () => {
    history.push("/prestations");
  };

  const modifyPrestation = () => {
    const requiredMsg = intl.formatMessage({ id: "messages.required" });

    const prestationSiret: PrestationSiret = {
      prestation: state.prestation,
      siret: siret,
    };

    if (state.prestation.dateFin === null) {
      enqueueSnackbar(requiredMsg, { variant: "error" });
      return;
    }
    const successMsg = intl.formatMessage(
      { id: "messages.modify.success" },
      { cle: "La Prestation" }
    );

    modify(prestationSiret)
      .then(() => history.push("/prestations"))
      .then(() =>
        enqueueSnackbar(successMsg, {
          variant: "success",
        })
      )
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };
  return (
    <PageLayout
      title={intl.formatMessage(
        { id: "prestations.update.title" },
        { cle: state.prestation.clientPrestation }
      )}
      content={
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <form className={classes.root} noValidate autoComplete="on">
                <div>
                  <TextField
                    id="dateFin"
                    label="Date Fin"
                    variant="outlined"
                    color="secondary"
                    value={state.prestation.dateFin}
                    type="date"
                    className={classes.textField}
                    onChange={handleInfoPrestation}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </form>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={cancelPrestaionInfo}
              >
                {intl.formatMessage({ id: "buttons.cancelButton" })}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={isValidForm()}
                className={classes.button}
                onClick={modifyPrestation}
              >
                {intl.formatMessage({ id: "prestations.buttonSubmit" })}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      }
    />
  );
};

export default PrestationModify;
