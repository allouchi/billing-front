import React, { FC, ReactElement, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { isEmptyString, isNotEmptyString } from "../../../shared/Utils";
import PageLayout from "../../../components/PageLayout/PageLayout";
import Consultant from "../../../domains/Consultant";


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

interface ConsultantItemProps{
  consultItem: Consultant;
}
const ConsultantEditPage: FC<ConsultantItemProps> = ({consultItem}): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();
  
  const [state, setState] = useState({
    firstName: consultItem.firstName,
    lastName: consultItem.lastName,
    mail: consultItem.mail,
  });

  const isValidForm = (): boolean => {
    return (
      isNotEmptyString(state.firstName) &&
      //isEmptyString(state.firstNameMessage) &&
      isNotEmptyString(state.lastName) &&
      //isEmptyString(state.lastNameMessage) &&
      isNotEmptyString(state.mail)
      //isEmptyString(state.mailMessage)
    );
  };
  alert(state.mail);

  const handleInfoConsultant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = e.target.id;
    const value: string = e.target.value;

    setState({
      ...state,
      [id] : [value]
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const id: string = e.target.id;
    const value: string = e.target.value;
    setState({
      ...state,
      [id] : [value]
    });
  };

  const addConsultant = () => {
    
  };

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
                    value={state.firstName}
                    helperText={state.firstName}
                    error={state.firstName !== ""}
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
                    value={state.lastName}
                    helperText={state.lastName}
                    error={state.lastName !== ""}
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
                    value={state.mail}
                    helperText={state.mail}
                    error={state.mail !== ""}
                    onChange={handleInfoConsultant}
                    onBlur={handleBlur}
                  />
                </div>
              </form>
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

export default ConsultantEditPage;
