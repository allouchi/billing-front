import React, { FC, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    height: "6vh",
    width: "100%",
    position: "absolute",
    top: 65,
    left: 0,
    backgroundColor: "#e3f2fd",
    flexGrow: 1,
    padding: theme.spacing(1, 5),
    margin: 0,
    borderColor: "#bbdefb"
  },
  content: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
}));

interface PageLayoutProps {
  title: string;
  content: ReactElement;
}

const PageLayout: FC<PageLayoutProps> = (
  props: PageLayoutProps
): ReactElement => {
  const classes = useStyles();
  const { title, content } = props;

  return (
    <>
      <Box className={classes.title} borderBottom={1}>
        <Typography variant="h6" color='primary'>{title}</Typography>
      </Box>
      <div className={classes.content}>{content}</div>
    </>
  );
};

export default PageLayout;
