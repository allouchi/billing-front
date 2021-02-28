import React, { FC, useContext, useState, ReactElement } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useStoreState } from "../../store/hooks";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { Button, Switch } from "@material-ui/core";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../../auth";
import User from "../../domains/User";
import { isUserAdmin } from "../../shared/Utils";
import { useSnackbar } from "notistack";
import LogoutDialog from "../LogoutDialog/LogoutDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(0),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
  })
);

interface AppHeaderProps {
  isAuthenticated: boolean;
  preventSubscribe(authenticated: boolean): void;
}

const AppHeader: FC<AppHeaderProps> = (props: AppHeaderProps): ReactElement => {
  const { preventSubscribe, isAuthenticated } = props;
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();
  const [checkedState, setCheckedState] = useState(isAuthenticated);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const firebase = useContext(FirebaseContext);
  const user: User = useStoreState((state) => state.user.item);
  const message = intl.formatMessage({ id: "messages.logout.success" });

  const handleLogin = (): void => {
    history.push("/login");
  };

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isLogin: boolean = event.target.checked;
    if (isLogin) {
      event.preventDefault();
      history.push("/login");
      return;
    }
    setCheckedState(isLogin);
    if (!isLogin) {
      setShowLogoutConfirm(true);
    }
    if (isLogin) {
      handleLogin();
    }
  };
  const handleLogout = (): void => {
    firebase.doSignOut();
    setShowLogoutConfirm(false);
    preventSubscribe(false);
    enqueueSnackbar(message, {
      variant: "success",
    });
    history.push("/login");
  };

  const handleLogoutCancel = (): void => {
    setShowLogoutConfirm(false);
  };

  const displayMenuAdmin = () => {
    let isAdmin = isUserAdmin(user);
    if (isAuthenticated && isAdmin) {
      return (
        <Button color="inherit" onClick={() => history.push("/signup")}>
          {intl.formatMessage({ id: "menu.admin" })}
        </Button>
      );
    } else {
      return "";
    }
  };

  const displayUser = () => {
    return (
      isAuthenticated &&
      user &&
      user.company &&
      ` : ${user.company.socialReason} (${user.firstName} ${user.lastName})`
    );
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {intl.formatMessage({ id: "menu.role" })} {displayUser()}
          </Typography>
          <div className={classes.grow} />
          {isAuthenticated && (
            <div className={classes.sectionDesktop}>
              <Button
                color="inherit"
                onClick={() => history.push("/companies")}
              >
                {intl.formatMessage({ id: "menu.companies" })}
              </Button>
              <Button
                color="inherit"
                onClick={() => history.push("/prestations")}
              >
                {intl.formatMessage({ id: "menu.prestations" })}
              </Button>
              <Button color="inherit" onClick={() => history.push("/factures")}>
                {intl.formatMessage({ id: "menu.factures" })}
              </Button>
              <Button color="inherit" onClick={() => history.push("/clients")}>
                {intl.formatMessage({ id: "menu.clients" })}
              </Button>
              <Button
                color="inherit"
                onClick={() => history.push("/consultants")}
              >
                {intl.formatMessage({ id: "menu.consultants" })}
              </Button>
            </div>
          )}
          <div>
            {displayMenuAdmin()}
            {!isAuthenticated && <span>Se connecter</span>}
            <Switch
              id="checked"
              checked={checkedState || isAuthenticated}
              onChange={handleSwitch}
              name="checked"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            {showLogoutConfirm && (
              <LogoutDialog
                logoutAction={handleLogout}
                handleLogoutCancel={handleLogoutCancel}
              />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppHeader;
