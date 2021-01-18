import React, { FC, ReactElement, useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import { useSnackbar } from "notistack";
import Prestation from "../../../domains/Prestation";
import Consultant from "../../../domains/Consultant";
import Client from "../../../domains/Client";
import { makeStyles } from "@material-ui/core/styles";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PrestationSiret from "../../../store/prestation/prestations.model";
import { Button, CircularProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useSiret from "../../../hooks/siret.hook";
import Alert from "@material-ui/lab/Alert";
import { clientIdentity, consultantIdentity } from "../../../shared/Utils";
import PageLayout from "../../../components/PageLayout/PageLayout";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  title: {
    flex: "1 1 100%",
    paddingBottom: 20,
  },
  textField: {
    width: "35ch",
  },
}));

interface PrestationState {
  client?: Client;
  consultant?: Consultant;
  prestation: Partial<Prestation>;
  clientsOnError: boolean;
  consultantsOnError: boolean;
}

const PrestationPage: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();
  const siret: string = useSiret();
  const { enqueueSnackbar } = useSnackbar();
  
  const createOrUpdate = useStoreActions(
    (actions) => actions.prestations.createOrUpdate
  );
  const consultants: Consultant[] = useStoreState(
    (state) => state.consultants.items
  );
  const isConsultantsLoaded: boolean = useStoreState(
    (state) => state.consultants.isLoaded
  );
  const findAllConsultants = useStoreActions(
    (actions) => actions.consultants.findAllBySiret
  );

  const clients: Client[] = useStoreState((state) => state.clients.items);
  const isClientsLoaded: boolean = useStoreState(
    (state) => state.clients.isLoaded
  );
  const findAllClients = useStoreActions(
    (actions) => actions.clients.findAllBySiret
  );

  const [state, setState] = useState<PrestationState>({
    consultant: { id: 0, firstName: "", lastName: "", mail: "", fonction:"" },
    client: {
      id: 0,
      socialReason: "",
      mail: "",
      adresseClient: {
        id: 0,
        numero: "",
        rue: "",   
        codePostal: "",
        localite: "",
        pays: "",
      },
    },
    prestation: {
    designation : "",
    numeroCommande: "",
    clientPrestation: "",
    quantite: 0   
    },
    clientsOnError: false,
    consultantsOnError: false,
  });

  const handleInfoPrestation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      prestation: {
        ...state.prestation,
        [e.target.id]: e.target.value,
      },
    });
  };

  const addPrestation = () => {
    if (state.client?.id === undefined || state.consultant?.id === undefined) {
      return;
    }
    const param: PrestationSiret = {
      prestation: state.prestation,
      siret: siret,
    };

    const message = intl.formatMessage(
      { id: "messages.create.success" },
      { cle: "La prestation" }
    );
    createOrUpdate(param)
      .then(() => history.push("/prestations"))
      .then(() =>
        enqueueSnackbar(message, {
          variant: "success",
        })
      )
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const onSelectConsultant = (value: Consultant | null): void => {
    if (!value) {
      return;
    }
    setState({
      ...state,
      prestation: { ...state.prestation, consultant: value },
    });
  };
  const onSelectClient = (value: Client | null): void => {
    if (!value) {
      return;
    }
    setState({
      ...state,
      prestation: { ...state.prestation, client: value },
    })    
  };

  const consultantsAutocomplete = () => {
    return state.consultantsOnError ? (
      <Alert severity="error">
        Une erreur s'est produite lors de la récupération de la liste des
        consultants
      </Alert>
    ) : (

      <Autocomplete
        id="consultant"
        options={consultants}
        value={state.consultant}
        className={classes.textField}
        getOptionLabel={(option: Consultant) => consultantIdentity(option)}
        onChange={(e, value) => onSelectConsultant(value)}
        renderInput={(params) => (
          <TextField {...params} label="Consultant" variant="outlined" />
        )}
        disablePortal
      />
    );
  };

  const clientsAutoComplete = () => {
    return state.clientsOnError ? (
      <Alert severity="error">
        Une erreur s'est produite lors de la récupération de la liste des
        clients
      </Alert>
    ) : (
      <Autocomplete
        id="client"
        options={clients}        
        className={classes.textField}             
        getOptionLabel={(option: Client) => clientIdentity(option)}
        onChange={(e, value) => onSelectClient(value)}       
        renderInput={(params) => (
          <TextField {...params} label="Client" variant="outlined" />
        )}
        disablePortal
      />
    );
  };

  useEffect(() => {
    if (!isClientsLoaded) {
      findAllClients(siret).catch(() =>
        setState({ ...state, clientsOnError: true })
      );
    }
  }, [isClientsLoaded, findAllClients, siret, state]);

  useEffect(() => {
    if (!isConsultantsLoaded) {
      findAllConsultants(siret).catch(() =>
        setState({ ...state, consultantsOnError: true })
      );
    }
  }, [isConsultantsLoaded, findAllConsultants, siret, state]);

  if (
    (!isClientsLoaded || !isConsultantsLoaded) &&
    !(state.clientsOnError && state.consultantsOnError)
  ) {
    return <CircularProgress color="primary" />;
  }

  return (
    <PageLayout
      title={intl.formatMessage({ id: "prestations.create.title" })}
      content={
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={6}>
              {clientsAutoComplete()}
            </Grid>
            <Grid item xs={6}>
              {consultantsAutocomplete()}
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="tarifHT"
                className={classes.textField}
                label="Tarif HT"
                variant="outlined"
                color="secondary"
                helperText="Tarif obligatoire."
                onChange={handleInfoPrestation}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="numeroCommande"
                className={classes.textField}
                label="Numéro de commande"
                variant="outlined"
                color="secondary"
                helperText="N° commande obligatoire."
                onChange={handleInfoPrestation}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="delaiPaiement"
                className={classes.textField}
                label="Délai de paiement"
                variant="outlined"
                color="secondary"
                helperText="Délai obligatoire."
                onChange={handleInfoPrestation}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={1}>
              <Button
                variant="contained"
                color="secondary"
                onClick={addPrestation}
              >
                {intl.formatMessage({ id: "buttons.submitButton" })}
              </Button>
            </Grid>
          </Grid>
        </form>
      }
    />
  );
};

export default PrestationPage;
