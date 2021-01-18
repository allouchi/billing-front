import React, { FC, ReactElement, useState } from "react";
import Prestation from "../../../domains/Prestation";
import { useStoreActions } from "../../../store/hooks";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import useSiret from "../../../hooks/siret.hook";
import { useSnackbar } from "notistack";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import PrestationSiret from "../../../store/prestation/prestations.model";

interface FactureEditProps {
  item: Prestation;
  clickOn: boolean;
}
const FactureEdit: FC<FactureEditProps> = ({ item, clickOn }): ReactElement => {
  
  const history = useHistory();
  const siret: string = useSiret();
  const intl = useIntl();
  const createOrUpdate = useStoreActions(
    (actions) => actions.prestations.createOrUpdate
  );
  const [open, setOpen] = useState(clickOn);
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    prestation : {
      id: item.id,
      tarifHT: item.tarifHT,
      delaiPaiement: item.delaiPaiement,
      consultant: item.consultant,
      client: item.client,
      designation: 'Prestation',
      numeroCommande: `${item.numeroCommande}`,
      clientPrestation: `${item.client.socialReason}`,     
      quantite: 0,
    },
  });

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
  };

  const handleValider = () => {
    const requiredMsg = intl.formatMessage({ id: "messages.required" });
    setOpen(true);

    const prestationSiret: PrestationSiret = {
      prestation: state.prestation,
      siret: siret,
    };
    if (
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

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleAnnuler}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Veuillez saisir le numéro de commande client
          </DialogContentText>
          <TextField
           id="numeroCommande"
            autoFocus
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
           id="designation"
            margin="dense"            
            label="Désignation"            
            value={state.prestation.designation}
            type="text"
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
