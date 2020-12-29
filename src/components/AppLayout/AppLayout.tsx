import React, { FC, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

interface AppLayoutProps {
  header: ReactElement;
  content: ReactElement;
  footer: ReactElement;
}

const AppLayoutComponent: FC<AppLayoutProps> = (
  props: AppLayoutProps
): ReactElement => {
  const classes = useStyles();
  const { content, footer, header } = props;

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          {header}
          <Container fixed component="main" className={classes.main}>
            {content}
          </Container>
        </div>
      </Container>
      {footer}
    </div>
  );
};

export default AppLayoutComponent;
