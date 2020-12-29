import React, { FC, ReactElement, useState } from "react";
import { useStoreActions } from "../../../store/hooks";
import { useSnackbar } from "notistack";
//import User from "../../../domains/User";
import { makeStyles } from "@material-ui/core/styles";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";
import PageLayout from "../../../components/PageLayout/PageLayout";
import useSiret from "../../../hooks/siret.hook";

const clientInit = {
  id: 0,
  socialReason: "",
  mail:"",
  adresseClient: {
    id: 0,
    numero: "",
    voie: "",
    complementAdresse: "",
    codePostal: "",
    commune: "",
    pays: "",
  },
};
const adresseClient = {
  id: 0,
  numero: "",
  voie: "",
  complementAdresse: "",
  codePostal: "",
  commune: "",
  pays: "",
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
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    margin: 15
  },
}));

const ClientPage: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();
  const siret: string = useSiret();
  const createOrUpdate = useStoreActions((actions) => actions.clients.create);
  /*
  const connectedUser: Partial<User> = useStoreState(
    (state) => state.user.user
  );
*/
  const { enqueueSnackbar } = useSnackbar();
  const [clientInfo, setClientInfo] = useState(clientInit);
  const [clientAdresse, setclientAdresse] = useState(adresseClient);

  const handleInfoClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientInfo({ ...clientInfo, [e.target.id]: e.target.value });
  };

  const handleAdresseClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setclientAdresse({ ...clientAdresse, [e.target.id]: e.target.value });
  };
  clientInfo.adresseClient = clientAdresse;

  const addClient = () => {
    createOrUpdate({ client: clientInfo, siret: siret })
      .then(() => history.push("/clients"))
      .then(() =>
        enqueueSnackbar("Le client a été créée avec succès", {
          variant: "success",
        })
      )
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  return (
    <PageLayout
      title={intl.formatMessage({ id: "clients.create.title" })}
      content={
        <form className={classes.root} noValidate autoComplete="off">
          <Paper style={{ padding: 15 }}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Typography className={classes.heading} >
                  {intl.formatMessage({ id: "clients.create.info" })}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="socialReason"
                  label="Raison sociale"
                  variant="outlined"
                  color="secondary"
                  helperText="Raison sociale obligatoire."
                  onChange={handleInfoClient}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="mail"
                  label="EMail"
                  variant="outlined"
                  color="secondary"
                  helperText="EMail obligatoire."
                  onChange={handleInfoClient}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.heading} >
                  {intl.formatMessage({ id: "clients.clientAdress" })}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="numero"
                  label="Numéro"
                  variant="outlined"
                  color="secondary"
                  helperText="Numéro obligatoire."
                  onChange={handleAdresseClient}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="voie"
                  label="voie"
                  variant="outlined"
                  color="secondary"
                  helperText="Voie obligatoire."
                  onChange={handleAdresseClient}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="complementAdresse"
                  label="Complément adresse"
                  variant="outlined"
                  color="secondary"
                  helperText="Numéro Siret obligatoire."
                  onChange={handleAdresseClient}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="codePostal"
                  label="Code postale"
                  variant="outlined"
                  color="secondary"
                  helperText="Code postale obligatoire."
                  onChange={handleAdresseClient}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="commune"
                  label="Commune"
                  variant="outlined"
                  color="secondary"
                  helperText="Nom commune obligatoire."
                  onChange={handleAdresseClient}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="pays"
                  label="Pays"
                  variant="outlined"
                  color="secondary"
                  helperText="Nom pays obligatoire."
                  defaultValue="France"
                  onChange={handleAdresseClient}
                />
              </Grid>
            </Grid>
          </Paper>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={addClient}
          >
            {intl.formatMessage({ id: "clients.buttonSubmit" })}
          </Button>
        </form>
      }
    />
  );
};

export default ClientPage;
