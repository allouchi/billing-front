import React, { FC, ReactElement, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { Button, Toolbar, Typography } from "@material-ui/core";
import PageLayout from "../../../components/PageLayout/PageLayout";
import { useSnackbar } from "notistack";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import Company from "../../../domains/Company";
import PrestationList from "./PrestationList";

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

const Prestations: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const items: Company[] = useStoreState((state) => state.companies.items);
  const findAll = useStoreActions(
    (actions) => actions.companies.findAll
  );

  const handleCreate = () => {
    history.push("/prestation");
  };

  useEffect(() => {    
    findAll()
      .catch((e: Error) => enqueueSnackbar(e.message, { variant: "error" }))
      .finally(() => {});
  }, [findAll, enqueueSnackbar]);

  const isValidForm = (): boolean => {
    let isValid = false;
    if (items !== null && items !== undefined) {
      items.forEach((company) => {
        if (
          company &&
          company.clients !== undefined &&
          company.consultants !== undefined
        ) {
          if (company.clients.length > 0 && company.consultants.length > 0) {            
            isValid = true;
          }
        }
      });
    }    
    return isValid;
  };

  return (
    <PageLayout
      title={intl.formatMessage({ id: "prestations.title" })}
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
              disabled={!isValidForm()}
            >
              {intl.formatMessage({ id: "buttons.addButton" })}
            </Button>
          </Toolbar>
          <PrestationList />
        </>
      }
    />
  );
};

export default Prestations;
