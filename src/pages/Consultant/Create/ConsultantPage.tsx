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
  parseModeJsonObject,
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
  const createOrUpdate = useStoreActions(
    (actions) => actions.consultants.createOrUpdate
  );

  let consult = parseConsultJsonObject(history.location.state);

  const { enqueueSnackbar } = useSnackbar();
  const [consultant, setConsultant] = useState(consult);

  const isValidForm = (): boolean => {
    return (
      isNotEmptyString(consultant.firstName) &&
      isNotEmptyString(consultant.lastName) &&
      isNotEmptyString(consultant.fonction) &&
      isNotEmptyString(consultant.email)
    );
  };

  const handleInfoConsultant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = e.target.id;
    const value: string = e.target.value;
    setConsultant({ ...consultant, [id]: value });
  };

  const addConsultant = () => {
    let messageId = "";
    const isNew: boolean = !consultant.id || consultant.id === 0;
    if (isNew) {
      messageId = "messages.create.success";
    } else {
      messageId = "messages.edit.success";
    }
    const message = intl.formatMessage(
      { id: messageId },
      { cle: "Le consultant" }
    );

    createOrUpdate({ consultant: consultant, siret: siret })
      .then(() => history.push("/consultants"))
      .then(() =>
        enqueueSnackbar(message, {
          variant: "success",
        })
      )
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const cancelConsultantInfo = () => {
    history.push("/consultants");
  };

  let mode = parseModeJsonObject(history.location.state);

  return (
    <PageLayout
      title={intl.formatMessage(
        { id: `consultants.${mode}.title` },
        { cle: `${consultant.firstName} ${consultant.lastName}` }
      )}
      content={
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <form className={classes.root} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="firstName"
                      name="firstName"
                      variant="outlined"
                      value={consultant.firstName}
                      required
                      fullWidth
                      label="First Name"
                      autoComplete="fname"
                      autoFocus
                      onChange={handleInfoConsultant}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="lastName"
                      variant="outlined"
                      value={consultant.lastName}
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={handleInfoConsultant}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="email"
                      variant="outlined"
                      required
                      fullWidth
                      value={consultant.email}
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleInfoConsultant}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="fonction"
                      variant="outlined"
                      required
                      fullWidth
                      name="fonction"
                      value={consultant.fonction}
                      label="Fonction"
                      autoComplete="fname"
                      type="text"
                      onChange={handleInfoConsultant}
                    />
                  </Grid>
                </Grid>
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
