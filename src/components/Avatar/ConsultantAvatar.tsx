import React, { FC, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Consultant from "../../domains/Consultant";
import { consultantIdentity, initial } from "../../shared/Utils";
import { Tooltip, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
interface ConsultantAvatarProps {
  consultant: Consultant;
}
const ConsultantAvatar: FC<ConsultantAvatarProps> = ({
  consultant,
}): ReactElement => {
  const classes = useStyles();
  const initials: string = `${initial(consultant.firstName)}${initial(
    consultant.lastName
  )}`;
  return (
    <Tooltip
      title={
        <Typography variant="h6" gutterBottom>
          {consultantIdentity(consultant)}
        </Typography>
      }
    >
      <Avatar
        className={classes.purple}
        style={{ width: 30, height: 30, fontSize: 12 }}
      >
        {initials}
      </Avatar>
    </Tooltip>
  );
};
export default ConsultantAvatar;
