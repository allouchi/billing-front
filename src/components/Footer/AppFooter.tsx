import React, { FC, ReactElement } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="primary" href="#">
        All rights reserved.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(1),
    paddingLeft:'21%',
    marginTop: "auto",
    backgroundColor:"#e3f2fd",
  },
}));

const AppFooter: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">Billing company.</Typography>
        <Copyright />
      </Container>
    </footer>
  );
};

export default AppFooter;
