import React, { FC, ReactElement, useState } from "react";
import Prestation from "../../../domains/Prestation";
import { useStoreActions } from "../../../store/hooks";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import useSiret from "../../../hooks/siret.hook";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, Select } from "@material-ui/core";

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  TextField,
  MenuItem,
} from "@material-ui/core";
import PrestationSiret from "../../../store/prestation/prestations.model";
import JoursOuvres from "../../../shared/JoursOuvres";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
interface FactureEditProps {
  item: Prestation;
  handleCancel(): void;
}
const FactureEdit: FC<FactureEditProps> = ({
  item,
  ...props
}): ReactElement => {
  const history = useHistory();
  const siret: string = useSiret();
  const classes = useStyles();
  const intl = useIntl();
  const createOrUpdate = useStoreActions(
    (actions) => actions.prestations.createOrUpdate
  );
  const [open, setOpen] = useState(true);
  const [check, setCheck] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [joursOuvres, setJoursOuvres] = useState(0);

  const [state, setState] = useState({
    moisFactureId: 0,
    prestation: {
      id: item.id,
      tarifHT: item.tarifHT,
      delaiPaiement: item.delaiPaiement,
      dateDebut: item.dateDebut,
      dateFin: item.dateFin,
      consultant: item.consultant,
      client: item.client,
      designation: "La Prestation est réalisée pour le compte de",
      numeroCommande: `${item.numeroCommande}`,
      clientPrestation: `${item.client.socialReason}`,
      quantite: joursOuvres,
    },
  });
  const moisAnnee = [
    { id: 0, mois: "" },
    { id: 1, mois: "Janvier" },
    { id: 2, mois: "Février" },
    { id: 3, mois: "Mars" },
    { id: 4, mois: "Avril" },
    { id: 5, mois: "Mai" },
    { id: 6, mois: "Juin" },
    { id: 7, mois: "Juillet" },
    { id: 8, mois: "Août" },
    { id: 9, mois: "Septembre" },
    { id: 10, mois: "Octobre" },
    { id: 11, mois: "Novembre" },
    { id: 12, mois: "Décembre" },
  ];

  const handleMoisPresta = (event: React.ChangeEvent<{ value: string }>) => {
    const value = event.target.value;
    let nbJoursOuvres = JoursOuvres(Number(value));
    setJoursOuvres(nbJoursOuvres);

    setState({
      ...state,
      moisFactureId: Number(value),
      prestation: { ...state.prestation, quantite: nbJoursOuvres },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = e.target.id;
    const value: string = e.target.value;
    setState({
      ...state,
      prestation: { ...state.prestation, [id]: value },
    });
  };

  const handleAnnuler = () => {
    setOpen(false);
    props.handleCancel();
  };

  const handleValider = () => {
    const requiredMsg = intl.formatMessage({ id: "messages.required" });
    setOpen(true);
    const prestationSiret: PrestationSiret = {
      prestation: state.prestation,
      siret: siret,
      templateChoice: check,
      moisFactureId: state.moisFactureId,
    };

    if (
      prestationSiret.moisFactureId === 0 ||
      prestationSiret.prestation.numeroCommande === "" ||
      prestationSiret.prestation.designation === "" ||
      prestationSiret.prestation.quantite === 0 ||
      prestationSiret.prestation.clientPrestation === ""
    ) {
      enqueueSnackbar(requiredMsg, { variant: "error" });
      setOpen(true);
      return;
    }
    const successMsg = intl.formatMessage(
      { id: "messages.create.success" },
      { cle: "La facture" }
    );

    createOrUpdate(prestationSiret)
      .then(() => history.push("/factures"))
      .then(() =>
        enqueueSnackbar(successMsg, {
          variant: "success",
        })
      )
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const handleChangeCheckBox = () => {
    setCheck(!check);
  };

  const moisDisplay = () => {
    return moisAnnee.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.mois}
        </MenuItem>
      );
    });
  };

  const displayDesignation = check ? (
    <TextField
      id="designation"
      label="Désignation"
      multiline
      rowsMax={3}
      value={state.prestation.designation}
      onChange={handleChange}
      variant="outlined"
    />
  ) : (
    ""
  );

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleAnnuler}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Veuillez saisir les informations de facture du mois de :
          </DialogContentText>

          <FormControl variant="outlined" className={classes.form}>
            <InputLabel id="moisLabelId">Mois</InputLabel>
            <Select
              labelId="mois"
              id="mois"
              value={state.moisFactureId}
              onChange={handleMoisPresta}
              label="Mois"
              autoFocus
            >
              {moisDisplay()}
            </Select>
          </FormControl>
          <TextField
            id="numeroCommande"
            margin="dense"
            label="Numéro de commande"
            value={state.prestation.numeroCommande}
            type="text"
            required
            fullWidth
            onChange={handleChange}
          />
          <TextField
            id="quantite"
            margin="dense"
            label="Quantité"
            value={state.prestation.quantite}
            type="number"
            required
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="clientPrestation"
            label="Client prestation"
            value={state.prestation.clientPrestation}
            type="text"
            required
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={check}
                onChange={handleChangeCheckBox}
                name="checked"
                id="checked"
              />
            }
            label="Désignation libre"
          />
          {displayDesignation}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAnnuler} color="primary">
            {intl.formatMessage({ id: "buttons.cancelButton" })}
          </Button>
          <Button onClick={handleValider} color="primary">
            {intl.formatMessage({ id: "buttons.submitButton" })}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FactureEdit;
