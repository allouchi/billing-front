import React, { ReactElement, useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { FirebaseContext } from "../../auth";
import User from "../../domains/User";

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

const SignIn = (): ReactElement => {
  const classes = useStyles();
  const data = {
    email: "",
    password: "",
  };

  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState();
  const [loginData, setLoginData] = useState(data);

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

    const { email, password } = loginData;
    firebase
      .loginUser(email, password)
      .then((user) => {
        console.log("user : ", user);
        setLoginData({
          ...data,
        });
      })
      .catch((error) => {
        console.log(error.message);
        setLoginData({
          ...data,
        });
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              label="Addresse Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
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
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignIn;
