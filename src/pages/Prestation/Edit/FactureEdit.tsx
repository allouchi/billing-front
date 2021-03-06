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
  const create = useStoreActions((actions) => actions.factures.create);
  const [open, setOpen] = useState(clickOn);
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    prestationId: item.id,
    numeroCommande: "",
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
      designation: `La Prestation est réalisée pour le compte de ${item.client.socialReason}`,
    },
  });

  const handleNumeroCommandeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value: string = e.target.value;
    setState({
      ...state,
      numeroCommande: value,
    });
  };

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

    const param: FacturePrestation = {
      prestationId: state.prestationId,
      numeroCommande: state.numeroCommande,
      facture: state.facture,
      siret: siret,
    };

    if (
      param.numeroCommande === "" ||
      param.facture.quantite === 0 ||
      param.facture.designation === ""
    ) {
      enqueueSnackbar("La saisie de tous les champs est obligatoire", { variant: "error" });
      setOpen(true);
      return;
    }
    const message = intl.formatMessage(
      { id: "messages.create.success" },
      { cle: "facture" }
    );

    create(param)
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
            value={state.numeroCommande}
            type="text"
            required
            fullWidth
            onChange={handleNumeroCommandeChange}
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
