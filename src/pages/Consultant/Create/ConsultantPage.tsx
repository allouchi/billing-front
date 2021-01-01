import React, { FC, ReactElement, useState } from "react";
import { useStoreActions } from "../../../store/hooks";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import useSiret from "../../../hooks/siret.hook";
import {
  isEmptyString,
  isNotEmptyString,
  parseConsultJsonObject,
} from "../../../shared/Utils";
import PageLayout from "../../../components/PageLayout/PageLayout";

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
}));

const ConsultantPage: FC<{}> = (props): ReactElement => {
  const siret: string = useSiret();
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();
  //const location = useLocation();
  const create = useStoreActions((actions) => actions.consultants.create);
  const update = useStoreActions((actions) => actions.consultants.update);

  const isValidForm = (): boolean => {
    return (
      isNotEmptyString(state.consultant.firstName) &&
      isEmptyString(state.firstNameMessage) &&
      isNotEmptyString(state.consultant.lastName) &&
      isEmptyString(state.lastNameMessage) &&
      isNotEmptyString(state.consultant.mail) &&
      isEmptyString(state.mailMessage)
    );
  };

  let consult = parseConsultJsonObject(history.location.state);
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    consultant: consult,
    firstNameMessage: "",
    lastNameMessage: "",
    mailMessage: "",
  });

  const handleInfoConsultant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = e.target.id;
    const value: string = e.target.value;
    setState({
      ...state,
      consultant: { ...state.consultant, [id]: value },
      [`${id}Message`]: isEmptyString(value) ? "Required" : "",
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const id: string = e.target.id;
    const value: string = e.target.value;
    setState({
      ...state,
      [`${id}Message`]: isEmptyString(value) ? "Required" : "",
    });
  };

  const addConsultant = () => {
    const isNew: boolean = !state.consultant.id || state.consultant.id === 0;
    if (isNew) {
      create({ consultant: state.consultant, siret: siret })
        .then(() => history.push("/consultants"))
        .then(() =>
          enqueueSnackbar("Le consultant a été créée avec succès", {
            variant: "success",
          })
        )
        .catch((err: Error) => {
          enqueueSnackbar(err.message, { variant: "error" });
        });
    } else {
      update({ consultant: state.consultant, siret: siret })
        .then(() => history.push("/consultants"))
        .then(() =>
          enqueueSnackbar("Le consultant a été mis à jour avec succès", {
            variant: "success",
          })
        )
        .catch((err: Error) => {
          enqueueSnackbar(err.message, { variant: "error" });
        });
    }
  };
  const cancelConsultantInfo = () => {
   history.push('/consultants');
  }

  return (
    <PageLayout
      title={intl.formatMessage({ id: "consultants.create.title" })}
      content={
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <form className={classes.root} noValidate autoComplete="off">
                <div>
                  <TextField
                    id="firstName"
                    label="Prénom"
                    variant="outlined"
                    color="secondary"
                    value={state.consultant.firstName}
                    helperText={state.firstNameMessage}
                    error={state.firstNameMessage !== ""}
                    onChange={handleInfoConsultant}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <TextField
                    id="lastName"
                    label="Nom"
                    variant="outlined"
                    color="secondary"
                    value={state.consultant.lastName}
                    helperText={state.lastNameMessage}
                    error={state.lastNameMessage !== ""}
                    onChange={handleInfoConsultant}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <TextField
                    id="mail"
                    label="Email"
                    variant="outlined"
                    color="secondary"
                    value={state.consultant.mail}
                    helperText={state.mailMessage}
                    error={state.mailMessage !== ""}
                    onChange={handleInfoConsultant}
                    onBlur={handleBlur}
                  />
                </div>
              </form>
              <Button
                variant="contained"
                color="secondary"                
                className={classes.button}
                onClick={cancelConsultantInfo}
              >
                {intl.formatMessage({ id: "buttons.cancelButton" })}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={!isValidForm()}
                className={classes.button}
                onClick={addConsultant}
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

export default ConsultantPage;
