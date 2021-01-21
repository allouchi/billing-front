import React, { FC, ReactElement } from "react";
import { Button, IconButton, Slide, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useIntl } from "react-intl";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CancelIcon from "@material-ui/icons/Cancel";
import { TransitionProps } from "@material-ui/core/transitions/transition";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DeleteItemProps {
  id: number;
  cle: string;
  value: string;
  deleteAction(): void;
}
const DeleteItem: FC<DeleteItemProps> = (
  props: DeleteItemProps
): ReactElement => {
  const { id, cle, value, deleteAction } = props;
  const intl = useIntl();
  const [open, setOpen] = React.useState(false);
  let messageId = intl.formatMessage({ id: `tooltip.${cle}` });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handleClose();
    deleteAction();
  };

  return (
    <>
      <Tooltip
        title={intl.formatMessage({ id: "tooltip.delete" }, { cle: messageId })}
      >
        <IconButton
          aria-label="delete"
          size="small"
          color="secondary"
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Attention ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {intl.formatMessage({ id: "deleteItem.confirmation" })}{" "}
            {intl.formatMessage({ id: `deleteItem.${cle}` })} ({value}) ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            <CancelIcon style={{ marginRight: 5 }} />
            {intl.formatMessage({ id: "buttons.cancelButton" })}
          </Button>
          <Button onClick={handleDelete} color="secondary" variant="contained">
            <DeleteForeverIcon style={{ marginRight: 5 }} />
            {intl.formatMessage({ id: "buttons.deleteButton" })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeleteItem;
