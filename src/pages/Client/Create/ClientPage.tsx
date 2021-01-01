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
import { parseClientJsonObject } from "../../../shared/Utils";

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
    margin: 15,
  },
}));

const ClientPage: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();
  const siret: string = useSiret();
  const create = useStoreActions((actions) => actions.clients.create);
  const update = useStoreActions((actions) => actions.clients.update);
  /*
  const connectedUser: Partial<User> = useStoreState(
    (state) => state.user.user
  );
*/
  let client = parseClientJsonObject(history.location.state);

  const { enqueueSnackbar } = useSnackbar();
  const [clientInfo, setClientInfo] = useState(client);
  const [clientAdresse, setclientAdresse] = useState(client.adresseClient);

  const handleInfoClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientInfo({ ...clientInfo, [e.target.id]: e.target.value });
  };

  const handleAdresseClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setclientAdresse({ ...clientAdresse, [e.target.id]: e.target.value });
  };
  clientInfo.adresseClient = clientAdresse;

  const addClient = () => {
    const isNew: boolean = !clientInfo.id || clientInfo.id === 0;

    if (isNew) {
      create({ client: clientInfo, siret: siret })
        .then(() => history.push("/clients"))
        .then(() =>
          enqueueSnackbar("Le client a été créée avec succès", {
            variant: "success",
          })
        )
        .catch((err: Error) => {
          enqueueSnackbar(err.message, { variant: "error" });
        });
    } else {
      update({ client: clientInfo, siret: siret })
        .then(() => history.push("/clients"))
        .then(() =>
          enqueueSnackbar("Le client a été mis à jour avec succès", {
            variant: "success",
          })
        )
        .catch((err: Error) => {
          enqueueSnackbar(err.message, { variant: "error" });
        });
    }
  };
  const cancelClientInfo = () =>{
    history.push('/clients');
  }

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
                <Typography className={classes.heading}>
                  {intl.formatMessage({ id: "clients.create.info" })}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="socialReason"
                  label="Raison sociale"
                  value={clientInfo.socialReason}
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
                  value={clientInfo.mail}
                  variant="outlined"
                  color="secondary"
                  helperText="EMail obligatoire."
                  onChange={handleInfoClient}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.heading}>
                  {intl.formatMessage({ id: "clients.clientAdress" })}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="numero"
                  label="Numéro"
                  value={clientAdresse.numero}
                  variant="outlined"
                  color="secondary"
                  //helperText="Numéro obligatoire."
                  onChange={handleAdresseClient}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="voie"
                  label="voie"
                  value={clientAdresse.voie}
                  variant="outlined"
                  color="secondary"
                  //helperText="Voie obligatoire."
                  onChange={handleAdresseClient}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="complementAdresse"
                  label="Complément adresse"
                  value={clientAdresse.complementAdresse}
                  variant="outlined"
                  color="secondary"
                  //helperText="Numéro Siret obligatoire."
                  onChange={handleAdresseClient}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="codePostal"
                  label="Code postale"
                  value={clientAdresse.codePostal}
                  variant="outlined"
                  color="secondary"
                  //helperText="Code postale obligatoire."
                  onChange={handleAdresseClient}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="commune"
                  label="Commune"
                  value={clientAdresse.commune}
                  variant="outlined"
                  color="secondary"
                  //helperText="Nom commune obligatoire."
                  onChange={handleAdresseClient}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="pays"
                  label="Pays"
                  value={clientAdresse.pays}
                  variant="outlined"
                  color="secondary"
                  //helperText="Nom pays obligatoire."
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
                onClick={cancelClientInfo}
              >
                {intl.formatMessage({ id: "buttons.cancelButton" })}
              </Button>
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
