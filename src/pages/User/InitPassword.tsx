import React, { FC, ReactElement, useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, Container, FormControlLabel } from "@material-ui/core";
import { FirebaseContext } from "../../auth";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { NavLink, useHistory } from "react-router-dom";
import { isEmptyString, isNotEmptyString } from "../../shared/Utils";
import { useStoreActions } from "../../store/hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "35vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface initPasswordProps {
  isAuthenticated: boolean;
  preventSubscribe(authenticated: boolean): void;
}

const InitPassword: FC<initPasswordProps> = (
  props: initPasswordProps
): ReactElement => {
  const history = useHistory();
  const { preventSubscribe } = props;
  const findRolesRef = useStoreActions(
    (actions) => actions.userRolesRef.findRolesRef
  );
  const findUserByEMail = useStoreActions(
    (actions) => actions.user.findUserByEMail
  );
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();
  const firebase = useContext(FirebaseContext);
  const [loginData, setLoginData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const sucessMsg = intl.formatMessage({ id: "messages.authentif.success" });
  const echecMsg = intl.formatMessage({ id: "messages.authentif.echec" });

  const isValidForm = (): boolean => {
    return (
      isNotEmptyString(loginData.email) &&
      isNotEmptyString(loginData.lastName) &&
      isNotEmptyString(loginData.firstName)
    );
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setLoginData({
      ...loginData,
      [id]: value,
      [`${id}Message`]: isEmptyString(value) ? "Required" : "",
    });
  };

  const findUserRolesRef = () => {
    findRolesRef()
      .then(() => {
        enqueueSnackbar(sucessMsg, {
          variant: "success",
        });
      })
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const findUserSever = (email: string): void => {
    findUserByEMail(email)
      .then(() => {
        history.push("/");
        findUserRolesRef();
        preventSubscribe(true);
        enqueueSnackbar(sucessMsg, {
          variant: "success",
        });
      })
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
        preventSubscribe(false);
        setLoginData({
          email: "",
          lastName: "",
          firstName: "",
        });
      });
  };

  const findUserFirebase = (email: string, password: string): void => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((user) => {
        findUserSever(email);
      })
      .catch((error) => {
        enqueueSnackbar(echecMsg, { variant: "error" });
        preventSubscribe(false);
        setLoginData({
          email: "",
          lastName: "",
          firstName: "",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, lastName, firstName } = loginData;
    //findUserFirebase(email, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Initialiser mot de passe
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            id="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleLoginChange}
            value={loginData.email}
          />
          <TextField
            id="firstName"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="firstName"
            type="firstName"
            value={loginData.firstName}
            onChange={handleLoginChange}
          />

          <TextField
            id="lastName"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="lastName"
            type="lastName"
            value={loginData.lastName}
            onChange={handleLoginChange}
          />
          <Button
            id="valider"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValidForm()}
            onClick={handleSubmit}
          >
            Envoyer
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default InitPassword;
