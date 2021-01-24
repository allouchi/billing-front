import React, { ReactElement, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { isNotEmptyString } from "../../shared/Utils";
import { useIntl } from "react-intl";
import { useStoreActions, useStoreState } from "../../store/hooks";
import Company from "../../domains/Company";
import User from "../../domains/User";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SignUp = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();
  const createOrUpdate = useStoreActions(
    (actions) => actions.user.createOrUpdate
  );

  const item: User = useStoreState((state) => state.user.item);

  const [infosUser, setInfosUser] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    password: "",
    confirmPassword: "",
    roleId: "",
    roleDesc: "",
    companyId: "",
  });

  const userRoles = [
    { roleId: 0, roleDesc: "admin" },
    { roleId: 1, roleDesc: "Lecture" },
    { roleId: 2, roleDesc: "Modification" },
  ];

  const isValidForm = (): boolean => {
    return (
      isNotEmptyString(infosUser.lastName) &&
      isNotEmptyString(infosUser.firstName) &&
      isNotEmptyString(infosUser.mail) &&
      isNotEmptyString(infosUser.password) &&
      isNotEmptyString(infosUser.confirmPassword) &&
      infosUser.roleId !== "" &&
      infosUser.companyId !== "" &&
      infosUser.password === infosUser.confirmPassword &&
      infosUser.password.length >= 6
    );
  };

  const handleInfoUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;
    setInfosUser({
      ...infosUser,
      [id]: value,
    });
  };

  const handleUserRole = (event: React.ChangeEvent<{ value: string }>) => {
    const value = event.target.value;
    setInfosUser({
      ...infosUser,
      roleId: value,
    });
  };

  const handleCampanyChange = (event: React.ChangeEvent<{ value: string }>) => {
    const value = event.target.value;
    setInfosUser({
      ...infosUser,
      companyId: value,
    });
  };

  const addUser = () => {
    const message = intl.formatMessage(
      { id: "messages.create.success" },
      { cle: "Utilisateur" }
    );
    const user: User = {
      id: 0,
      firstName: infosUser.firstName,
      lastName: infosUser.lastName,
      email: infosUser.mail,
      role: infosUser.roleId,
      password: infosUser.password,
      company: {
        id: Number(infosUser.companyId),
      },
    };

    createOrUpdate(user)
      .then(() => history.push("/"))
      .then(() =>
        enqueueSnackbar(message, {
          variant: "success",
        })
      )
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const userCompanyDisplay = () => {
    let company = item && item.company;
    if (company !== null) {
      return (
        <MenuItem key={company.id} value={company.id}>
          {company.socialReason}
        </MenuItem>
      );
    } else {
      return "";
    }
  };

  const userRolesDisplay = () => {
    return userRoles.map((item) => {
      return (
        <MenuItem key={item.roleId} value={item.roleId}>
          {item.roleDesc}
        </MenuItem>
      );
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
          Ajouter utilisateur
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleInfoUser}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                onChange={handleInfoUser}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mail"
                label="Email Address"
                name="mail"
                autoComplete="mail"
                onChange={handleInfoUser}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInfoUser}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={handleInfoUser}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="roleLabelId">Role</InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  value={infosUser.roleId}
                  onChange={handleUserRole}
                  label="Role"
                >
                  {userRolesDisplay()}
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="companyLabelId">Société</InputLabel>
                <Select
                  labelId="company"
                  id="company"
                  value={infosUser.companyId}
                  onChange={handleCampanyChange}
                  label={intl.formatMessage({ id: "menu.companies" })}
                >
                  {userCompanyDisplay()}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValidForm()}
            onClick={addUser}
          >
            Ajouter
          </Button>
          <Grid container>
            <Grid item>
              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/login"
                exact
              >
                Vous avez un compte? connectez-vous
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;