import React, { FC, ReactElement } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useIntl } from "react-intl";
import ConsultantList from "./ConsultantList";
import { useHistory } from "react-router-dom";
import { Button, Toolbar, Typography } from "@material-ui/core";
import PageLayout from "../../../components/PageLayout/PageLayout";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flex: "1 1 100%",
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

const Consultants: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();

  const handleCreate = () => {
    history.push("/consultant");
  };

  return (
    <PageLayout
      title={intl.formatMessage({ id: "consultants.title" })}
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
              color="primary"
              className={classes.button}
              onClick={handleCreate}
            >
              <PersonAddIcon style={{marginRight: 5}} />
              {intl.formatMessage({ id: "buttons.addButton" })}
            </Button>
          </Toolbar>
          <ConsultantList />
        </>
      }
    />
  );
};

export default Consultants;
