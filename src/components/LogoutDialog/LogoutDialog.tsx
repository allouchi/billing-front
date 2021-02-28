import React, { ReactElement, FC, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface LogoutProps {
  logoutAction(): void;
  handleLogoutCancel(): void;
}

const LogoutDialog: FC<LogoutProps> = (props: LogoutProps): ReactElement => {
  const [open, setOpen] = useState(true);

  const handleCancel = () => {
    setOpen(false);
    props.handleLogoutCancel();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Demande de confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Vous êtes sur le point de quitter votre espace
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            Etes-vous sur de vouloir continuer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Annuler
          </Button>
          <Button onClick={() => props.logoutAction()} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogoutDialog;
