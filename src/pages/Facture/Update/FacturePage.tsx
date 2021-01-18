import React, { FC, ReactElement, useState } from "react";
import Facture from "../../../domains/Facture";
import { useHistory } from "react-router-dom";
import { useStoreActions } from "../../../store/hooks";
import { useSnackbar } from "notistack";
import {
  isEmptyString,
  isNotEmptyString,
  parseFactureJsonObject,
} from "../../../shared/Utils";
import PageLayout from "../../../components/PageLayout/PageLayout";
import { useIntl } from "react-intl";
import { Grid, makeStyles, Paper, TextField, Button } from "@material-ui/core";



const emptyFacture: Facture = {
  id: 0,
  numeroFacture: "",
  dateFacturation: "",
  dateEcheance: "",
  dateEncaissement: "",
  delaiPaiement: 0,
  montantTVA: 0,
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
  const { enqueueSnackbar } = useSnackbar(); 
  
  const update = useStoreActions(
    (actions) => actions.factures.update
  );
  
  let factureToEdit = parseFactureJsonObject(history.location.state);

  const [state, setState] = useState({
    facture: factureToEdit ? factureToEdit : emptyFacture,   
    dateEncaissementMessage: "",    
  });

  const isValidForm = (): boolean => {
    return (      
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
    setState({
      ...state,
      [`${id}Message`]: isEmptyString(value) ? "factureStatusRequired" : "",
    });
  }; 
 
  const cancelFactureInfo = () => {
    history.push("/factures");
  };

  const updateFacture = () => {
    const messageUpdate = intl.formatMessage(
      { id: "messages.update.success" },
      { cle: "La facture" }
    );

    const messageRequired = intl.formatMessage({ id: "messages.required" });
    if (state.facture.dateEncaissement === '' ) {
      enqueueSnackbar(messageRequired, 
      { variant: "error" });      
      return;
    }

    update(state.facture)
    .then(() => history.push("/factures"))
    .then(() =>
      enqueueSnackbar(messageUpdate, {
        variant: "success",
      })
    ).catch((err: Error) => {
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
