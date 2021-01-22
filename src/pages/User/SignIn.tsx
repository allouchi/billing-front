import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
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
import User from "../../domains/User";
import { useStoreActions, useStoreState } from "../../store/hooks";
import useSiret from "../../hooks/siret.hook";

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

interface SignUpProps {
  isAuthenticated: boolean;
  preventSubscribe(authenticated: boolean): void;
}

const SignIn: FC<SignUpProps> = (props: SignUpProps): ReactElement => {
  const history = useHistory();
  const { isAuthenticated, preventSubscribe } = props;

  const findUserByEMail = useStoreActions(
    (actions) => actions.user.findUserByEMail
  );
  const item: User = useStoreState((state) => state.user.item);
  const classes = useStyles();
  const siret = useSiret();
  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();
  const firebase = useContext(FirebaseContext);
  const [errorFirebase, setErrorFirebase] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    passwordMessage: "",
    emailMessage: "",
  });

  const sucessMsg = intl.formatMessage({ id: "messages.authentif.success" });
  const echecMsg = intl.formatMessage({ id: "messages.authentif.echec" });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setLoginData({
      ...loginData,
      [id]: value,
      [`${id}Message`]: isEmptyString(value) ? "Required" : "",
    });
  };

  const findUserSever = (email: string): void => {
    findUserByEMail(email)
      .then(() => {
        enqueueSnackbar(sucessMsg, {
          variant: "success",
        });
      })
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
        setErrorServer(true);
        history.push("/login");
      });
  };

  const findUserFirebase = (email: string, password: string): void => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((user) => {
        enqueueSnackbar(sucessMsg, {
          variant: "success",
        });
      })
      .catch((error) => {
        history.push("/login");
        enqueueSnackbar(echecMsg, { variant: "error" });
        setLoginData({ ...loginData });
        setErrorFirebase(true);
        history.push("/login");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    findUserFirebase(email, password);
    findUserSever(email);
  };

  const isValidForm = (): boolean => {
    return (
      isNotEmptyString(loginData.email) &&
      isEmptyString(loginData.emailMessage) &&
      isNotEmptyString(loginData.password) &&
      loginData.password.length >= 6 &&
      isEmptyString(loginData.passwordMessage)
    );
  };

  useEffect(() => {
    props.preventSubscribe(false);
    console.log("errorServer ", errorServer);
    console.log("errorFirebase ", errorFirebase);
    if (errorServer === false && errorFirebase === false) {
      history.push("/");
      props.preventSubscribe(true);
    } else {
      history.push("/login");
      props.preventSubscribe(false);
    }
  }, [errorServer, errorFirebase, props]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
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
            id="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Rester connecter"
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
            Connexion
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Mot de passe oublié?
              </Link>
            </Grid>
            <Grid item>
              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/signup"
                exact
              >
                Vous n'avez pas encore de compte? inscrivez-vous
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
