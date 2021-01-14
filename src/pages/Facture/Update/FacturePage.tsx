import React, { FC, ReactElement, useState } from "react";
import Facture from "../../../domains/Facture";
import { useHistory } from "react-router-dom";
import { useStoreActions } from "../../../store/hooks";
import FacturePrestation from "../../../store/facture/factures.model";
import { useSnackbar } from "notistack";
import {
  isEmptyString,
  isNotEmptyString,
  parseFactureJsonObject,
} from "../../../shared/Utils";
import PageLayout from "../../../components/PageLayout/PageLayout";
import { useIntl } from "react-intl";
import { Grid, makeStyles, Paper, TextField, Button } from "@material-ui/core";
import useSiret from "../../../hooks/siret.hook";

const emptyFacture: Facture = {
  id: 0,
  numeroFacture: "",
  dateFacturation: "",
  dateEcheance: "",
  dateEncaissement: "",
  delaiPaiement: 0,
  tva: 0,
  prixTotalHT: 0,
  prixTotalTTC: 0,
  nbJourRetard: 0,
  fraisRetard: 0,
  factureStatus: "",
  quantite: 0,
  numeroCommande: "",
  designation: "",
  clientPrestation: "",
  filePath: "",
};

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
  }
}));

interface FacturePageProps {
  location: Location;

  // Le reste des props ici
}
const FacturePage: FC<FacturePageProps> = (props): ReactElement => {
  const history = useHistory();
  const intl = useIntl();
  const classes = useStyles();
  let siret: string = useSiret();
  const { enqueueSnackbar } = useSnackbar();
  
  const createOrUpdate = useStoreActions(
    (actions) => actions.factures.createOrUpdate
  );

  let factureToEdit = parseFactureJsonObject(history.location.state);

  const [state, setState] = useState({
    facture: factureToEdit ? factureToEdit : emptyFacture,
    factureStatusMessage: "",
    dateEncaissementMessage: "",    
  });

  const isValidForm = (): boolean => {
    return (
      isNotEmptyString(state.facture.factureStatus) &&
      isEmptyString(state.factureStatusMessage) &&
      isNotEmptyString(state.facture.dateEncaissement) &&
      isEmptyString(state.dateEncaissementMessage)     
    );
  };

  const handleInfoFacture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = e.target.id;
    const value: string = e.target.value;
    setState({
      ...state,
      facture: { ...state.facture, [id]: value },
      [`${id}Message`]: isEmptyString(value) ? "Required" : "",
    });
  }; 

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const id: string = e.target.id;
    const value: string = e.target.value;

    if(id === 'dateEncaissement' && value !== ''){
      setState({
        ...state,
        facture: { ...state.facture, factureStatus: 'OK' }        
      });
      //alert(state.facture.factureStatus);
    }
    setState({
      ...state,
      [`${id}Message`]: isEmptyString(value) ? "factureStatusRequired" : "",
    });
  }; 
 
  const cancelFactureInfo = () => {
    history.push("/factures");
  };

  const updateFacture = () => {
    const message = intl.formatMessage(
      { id: "messages.update.success" },
      { cle: "La facture" }
    );

    const facturePrestation: FacturePrestation = {
      prestationId: 1,         
      facture:state.facture,      
      siret: siret,
      factureId: state.facture.id,
    };

    if (
      facturePrestation.facture.factureStatus === '' ||
      facturePrestation.facture.dateEncaissement === ''      
    ) {
      enqueueSnackbar("La saisie de tous les champs est obligatoire", 
      { variant: "error" });      
      return;
    }

    createOrUpdate(facturePrestation)
    .then(() => history.push("/factures"))
    .then(() =>
      enqueueSnackbar(message, {
        variant: "success",
      })
    )
    .catch((err: Error) => {
      enqueueSnackbar(err.message, { variant: "error" });
    });  
  }

  return (
    <PageLayout
      title={intl.formatMessage({ id: "factures.update.title" },  {cle: state.facture.numeroFacture})}
      content={
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <form className={classes.root} noValidate autoComplete="on">
                <div>
                  <TextField
                    id="factureStatus"
                    label="Statut facture"
                    variant="outlined"
                    color="secondary"
                    value={state.facture.factureStatus}
                    helperText={state.factureStatusMessage}
                    error={state.factureStatusMessage !== ""}
                    onChange={handleInfoFacture}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <TextField
                    id="dateEncaissement"
                    label="Date Encaissement"
                    variant="outlined"
                    color="secondary"                   
                    value={state.facture.dateEncaissement}
                    helperText={state.dateEncaissementMessage}
                    type="date"
                    className={classes.textField}                  
                    error={state.dateEncaissementMessage !== ""}
                    onChange={handleInfoFacture}
                    onBlur={handleBlur}
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
                onClick={cancelFactureInfo}
              >
                {intl.formatMessage({ id: "buttons.cancelButton" })}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={!isValidForm()}
                className={classes.button}
                onClick={updateFacture}
              >
                {intl.formatMessage({ id: "consultants.buttonSubmit" })}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      }
    />
  );
};

export default FacturePage;
