import React, { FC, ReactElement, useState } from "react";
import Prestation from "../../../domains/Prestation";
import { useStoreActions } from "../../../store/hooks";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import useSiret from "../../../hooks/siret.hook";
import FacturePrestation from "../../../store/facture/factures.model";
import { useSnackbar } from "notistack";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";

interface FactureEditProps {
  item: Prestation;
  clickOn: boolean;
}
const FactureEdit: FC<FactureEditProps> = ({ item, clickOn }): ReactElement => {
  const history = useHistory();
  const siret: string = useSiret();
  const intl = useIntl();
  const createOrUpdate = useStoreActions((actions) => actions.factures.createOrUpdate);
  
  const [open, setOpen] = useState(clickOn);
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    prestationId: item.id,      
    facture: {
      id: 0,
      numeroFacture: "",
      dateFacturation: "",
      dateEcheance: "",
      dateEncaissement: "",
      delaiPaiement: 0,
      tva: 0,
      prixTotalHT: 0,
      prixTotalTTC: 0,
      nbJourRetard: 0,
      fraisRetard: 0,
      factureStatus: "KO",
      quantite: 0,
      numeroCommande: "",
      designation: "La Prestation est réalisée pour le compte de",
      clientPrestation : `${item.client.socialReason}`,
      filePath: '',
      fileContent: item.facture.fileContent,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = e.target.id;
    const value: string = e.target.value;   
    setState({
      ...state,
      facture: { ...state.facture, [id]: value },
    });
  };

  const handleAnnuler = () => {
    setOpen(false);
  };

  const handleValider = () => {
    setOpen(false);
    const facturePrestation: FacturePrestation = {
      prestationId: state.prestationId,         
      facture:state.facture,      
      siret: siret,
      factureId: state.facture.id,
    };

    if (
      facturePrestation.facture.numeroCommande === "" ||
      facturePrestation.facture.quantite === 0 ||
      facturePrestation.facture.designation === "" ||
      facturePrestation.facture.clientPrestation === ""
    ) {
      enqueueSnackbar("La saisie de tous les champs est obligatoire", { variant: "error" });
      setOpen(true);
      return;
    }
    const message = intl.formatMessage(
      { id: "messages.create.success" },
      { cle: "La facture" }
    );

    createOrUpdate(facturePrestation)
      .then(() => history.push("/factures"))
      .then(() =>
        enqueueSnackbar(message, {
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
            autoFocus
            margin="dense"
            id="numeroCommande"
            label="Numéro de commande"
            value={state.facture.numeroCommande}
            type="text"
            required
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="quantite"
            label="Quantité"
            value={state.facture.quantite}
            type="number"
            required
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="designation"
            label="Désignation"
            value={state.facture.designation}
            type="text"
            required
            fullWidth
            onChange={handleChange}
          />
           <TextField
            margin="dense"
            id="clientPrestation"
            label="Client prestation"
            value={state.facture.clientPrestation}
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
