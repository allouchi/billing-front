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
  const intl = useIntl();
  const [checked, setChecked] = useState(isAuthenticated);
  const firebase = useContext(FirebaseContext);
  const user: User = useStoreState((state) => state.user.item);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (!isChecked) {
      firebase.doSignOut();
      preventSubscribe(false);
      history.push("/");
    } else {
      history.push("/login");
    }
  };

  const displayMenuAdmin = () => {
    let isAdmin = isUserAdmin(user);
    if (isAdmin) {
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
      user &&
      user.company &&
      ` : ${user.company.socialReason} (${user.userName})`
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
          <div className={classes.sectionDesktop}>
            <Button color="inherit" onClick={() => history.push("/companies")}>
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

            {displayMenuAdmin()}

            <Switch
              id="checked"
              checked={checked || isAuthenticated}
              onChange={handleChange}
              name="checked"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppHeader;
