import React, { FC, ReactElement, useState } from "react";
import { useStoreActions } from "../../../store/hooks";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button, Paper, Typography } from "@material-ui/core";
import PageLayout from "../../../components/PageLayout/PageLayout";
/*
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import { createStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'; */

const companyInit = {
  id: 0,
  socialReason: "",
  status: "",
  siret: "",
  rcsName: "",
  numeroTva: "",
  ape: "",
  companyAdresse: {
    id: 0,
    numero: "",
    rue: "",
    codePostal: "",
    localite: "",
    pays: "",
  },
  users: [],
  clients: [],
  consultants: [],
  prestations: [],
};

const companyAdresse = {
  id: 0,
  numero: "",
  rue: "",
  codePostal: "",
  localite: "",
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
  textField: {
    width: "35ch",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginBottom: 3
  },
}));

const CompanyPage: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();
  const createOrUpdate = useStoreActions((actions) => actions.companies.create);
  const { enqueueSnackbar } = useSnackbar();
  const [companyInfo, setCompanyInfo] = useState(companyInit);
  const [companyAdress, setCompanyAdress] = useState(companyAdresse);

  const handleInfoCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyInfo({ ...companyInfo, [e.target.id]: e.target.value });
  };

  const handleAdressCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyAdress({ ...companyAdress, [e.target.id]: e.target.value });
    companyInfo.companyAdresse = companyAdress;
  };
  const addCompany = () => {
    const message = intl.formatMessage(
      { id: "messages.create.success" },
      { cle: "La société" }
    );
    createOrUpdate(companyInfo)
      .then(() => history.push("/companies"))
      .then(() =>
        enqueueSnackbar(message, {
          variant: "success",
        })
      )
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  return (
    <PageLayout
      title={intl.formatMessage({ id: "companies.create.title" })}
      content={
        <form className={classes.root} noValidate autoComplete="off">
          <Paper style={{ padding: 15 }}>
            <Typography className={classes.heading}>Société</Typography>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={4}>
                <TextField
                  id="socialReason"
                  className={classes.textField}
                  label="Raison sociale"
                  variant="outlined"
                  color="secondary"
                  value={companyInfo.socialReason}
                  helperText="Raison sociale obligatoire."
                  onChange={handleInfoCompany}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="status"
                  className={classes.textField}
                  label="Status"
                  variant="outlined"
                  color="secondary"
                  value={companyInfo.status}
                  helperText="Statut obligatoire."
                  onChange={handleInfoCompany}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="siret"
                  className={classes.textField}
                  label="Numéro Siret"
                  variant="outlined"
                  color="secondary"
                  value={companyInfo.siret}
                  helperText="Numéro Siret obligatoire."
                  onChange={handleInfoCompany}
                  InputProps={{
                    //inputComponent: NumberFormatCustom as any,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="ape"
                  className={classes.textField}
                  label="Code APE"
                  variant="outlined"
                  color="secondary"
                  value={companyInfo.ape}
                  helperText="Code APE obligatoire."
                  onChange={handleInfoCompany}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="rcsName"
                  className={classes.textField}
                  label="Code RCS"
                  variant="outlined"
                  color="secondary"
                  value={companyInfo.rcsName}
                  helperText="Code RCS obligatoire."
                  onChange={handleInfoCompany}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="numeroTva"
                  className={classes.textField}
                  label="Numéro TVA"
                  variant="outlined"
                  color="secondary"
                  value={companyInfo.numeroTva}
                  helperText="Numéro TVA obligatoire."
                  onChange={handleInfoCompany}
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper style={{ marginTop: 6, padding: 15 }}>
            <Typography className={classes.heading}>Adresse</Typography>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={2}>
                <TextField
                  id="numero"
                  className={classes.textField}
                  label="Numéro"
                  variant="outlined"
                  color="secondary"
                  value={companyAdress.numero}
                  helperText="Numéro obligatoire."
                  onChange={handleAdressCompany}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="rue"
                  label="rue"
                  variant="outlined"
                  color="secondary"
                  value={companyAdress.rue}
                  helperText="Rue obligatoire."
                  onChange={handleAdressCompany}
                />
              </Grid>              
              <Grid item xs={2}>
                <TextField
                  id="codePostal"
                  className={classes.textField}
                  label="Code postale"
                  variant="outlined"
                  color="secondary"
                  value={companyAdress.codePostal}
                  helperText="Code postale obligatoire."
                  onChange={handleAdressCompany}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="localite"
                  className={classes.textField}
                  label="Commune"
                  variant="outlined"
                  color="secondary"
                  value={companyAdress.localite}
                  helperText="Nom localite obligatoire."
                  onChange={handleAdressCompany}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="pays"
                  className={classes.textField}
                  label="Pays"
                  variant="outlined"
                  color="secondary"  
                  value={companyAdress.pays}              
                  helperText="Nom pays obligatoire."
                  defaultValue="France"
                  onChange={handleAdressCompany}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={addCompany}
                >
                  {intl.formatMessage({ id: "companies.buttonSubmit" })}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      }
    />
  );
};

export default CompanyPage;
