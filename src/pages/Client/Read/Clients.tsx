import React, { FC, ReactElement } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useIntl } from "react-intl";
import ClientList from "./ClientList";
import { useHistory } from "react-router-dom";
import { Button, Toolbar, Typography } from "@material-ui/core";
import PageLayout from "../../../components/PageLayout/PageLayout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    title: {
      flex: "1 1 100%",
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

const Clients: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();

  const handleCreate = () => {
   
    history.push({
      pathname: "/client",
      search: "",
      state: { detail: null },
    });
  };

  return (
    <PageLayout
      title={intl.formatMessage({ id: "clients.title" })}
      content={
        <>
          <Toolbar>
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              component="div"
            ></Typography>

            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleCreate}
            >
              {intl.formatMessage({ id: "buttons.addButton" })}
            </Button>
          </Toolbar>
          <ClientList />
        </>
      }
    />
  );
};

export default Clients;
