import React, { FC, ReactElement, useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import { useSnackbar } from "notistack";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useIntl } from "react-intl";
import CompanyList from "./CompanyList";
import Company from "../../../domains/Company";
import { useHistory } from "react-router-dom";
import { Button, Toolbar, Typography } from "@material-ui/core";
import PageLayout from "../../../components/PageLayout/PageLayout";
import AddCircleIcon from '@material-ui/icons/AddCircle';

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

const Companies: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();
  const findAll = useStoreActions((actions) => actions.companies.findAll);
  const isLoaded: boolean = useStoreState((state) => state.companies.isLoaded);
  const items: Company[] = useStoreState((state) => state.companies.items);
  const { enqueueSnackbar } = useSnackbar();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleCreate = () => {
    history.push("/company");
  };

  useEffect(() => {
    setOpenBackdrop(true);
    if (!isLoaded) {
      findAll()
        .catch((e: Error) => enqueueSnackbar(e.message, { variant: "error" }))
        .finally(() => {
          setOpenBackdrop(false);
        });
    }
  }, [findAll, enqueueSnackbar, isLoaded]);

  if (!isLoaded) {
    return (
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <PageLayout
      title={intl.formatMessage({ id: "companies.title" })}
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
              <AddCircleIcon style={{marginRight: 5}} />
              {intl.formatMessage({ id: "buttons.addButton" })}
            </Button>
          </Toolbar>
          <CompanyList items={items} />
        </>
      }
    />
  );
};

export default Companies;
