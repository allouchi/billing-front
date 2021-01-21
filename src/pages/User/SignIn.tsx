import React, { ReactElement, useContext, useEffect, useState } from "react";
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
import { NavLink } from "react-router-dom";

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

const SignIn = (props): ReactElement => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();
  const data = {
    email: "",
    password: "",
  };

  const firebase = useContext(FirebaseContext);
  const [btnIsValid, setBtnIsValid] = useState(true);
  const [loginData, setLoginData] = useState(data);

  useEffect(() => {
    if (loginData.email !== "" && loginData.password.length >= 6) {
      setBtnIsValid(true);
    } else if (btnIsValid) {
      setBtnIsValid(false);
    }
  }, [loginData.email, loginData.password, btnIsValid]);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setLoginData({
      ...loginData,
      [id]: value,
    });
  };

  const handleValider = (e) => {
    e.preventDefault();
    const sucessMsq = intl.formatMessage({ id: "messages.authentif.success" });
    const echecMsg = intl.formatMessage({ id: "messages.authentif.echec" });
    const { email, password } = loginData;

    firebase
      .loginUser(email, password)
      .then((user) => {
        //props.history.push("/home");
        enqueueSnackbar(sucessMsq, {
          variant: "success",
        });
        setLoginData({
          ...data,
        });
      })
      .catch((error) => {
        props.history.push("/login");
        enqueueSnackbar(echecMsg, { variant: "error" });
        setLoginData({
          ...data,
        });
      });
  };

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
            onChange={handleChange}
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
            onChange={handleChange}
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
            disabled={!btnIsValid}
            onClick={handleValider}
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
