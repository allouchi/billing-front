export default {
  // Application title
  "application-name": "Application de facturation",
  // NavBar menu items
  menu: {
    role: "Facturation",
    title: "Menu",
    home: "Accueil",
    companies: "Sociétés",
    factures: "Factures",
    consultants: "Consultants",
    clients: "Clients",
    prestations: "Prestations",
    admin: "Admin.",
  },
  pages: {
    company: "Société",
    adresse: "Adresse",
  },
  // Internal/unknown error
  internalError: "Une erreur est survenue",
  internalErrorMessage:
    "Nous ne pouvons pas compléter votre demande pour le moment.",
  internalErrorContact: "Contactez nous",
  internalErrorTryAgain: "Réessayer",
  // Common Messages
  loadingMessage: "Chargement en cours...Veuillez patienter",
  // Page not found
  notFound: "Page non trouvée.",
  notFoundMessage: "Désolé, nous n'avons pas trouvé cette page",
  notFoundContact: "Contactez nous",
  notFoundGoBack: "Retour",
  messages: {
    authentif: {
      success: "Bienvenue, vous êtes désormais connecté",
      echec: "Les identiants sont incorrects, vous devez vous reconnecter",
    },
    logout: {
      success: "Vous venez de vous déconnecter",
    },
    create: {
      success: "{cle} a été créee avec succès",
    },
    edit: {
      success: "{cle} a été éditée avec succès",
    },
    modify: {
      success: "{cle} a été modifiée avec succès",
    },
    update: {
      success: "{cle} a été mise à jour avec succès",
      echec: "{cle} n'a pas été mise à jour",
    },
    delete: {
      success: "{cle} a été supprimée avec succès",
    },
    download: {
      success: "{cle} a été téléchargée avec succès",
      echec: "{cle} n'a pas été téléchargée",
    },
    required: "La saisie de tous les champs est obligatoire",
  },

  // Home page
  home: {
    "edit-source-code":
      "Modifier {codeContent} et enregistrer pour raffraichir la page.",
    "learn-react": "Apprendre React",
  },
  factures: {
    title: "Liste des factures",
    update: {
      title: "Mise à jour de la facture N° : {cle}",
    },
  },
  companies: {
    title: "Liste des sociétés",
    buttonAdd: "Nouveau",
    buttonSubmit: "Valider",
    companyAdress: "Adresse société",
    create: {
      title: "Création d'un nouvelle société",
    },
    update: {
      title: "Mise à jour de la société : {cle}",
    },
  },
  billErrors: {
    billsNotFound: "Erreur lors de la recherche des factures",
  },
  clients: {
    title: "Liste des Clients",
    buttonAdd: "Nouveau",
    buttonSubmit: "Valider",
    clientAdress: "Adresse client",
    create: {
      title: "Création d'un nouveau client",
      info: "Infos client",
    },
    update: {
      title: "Mise à jour du client : {cle}",
    },
  },
  consultants: {
    title: "Liste des Consultants",
    buttonAdd: "Nouveau",
    buttonSubmit: "Valider",
    create: {
      title: "Création d'un nouveau consultant",
    },
    update: {
      title: "Mise à jour du consulant : {cle}",
    },
  },
  prestations: {
    title: "Liste des Prestations",
    buttonAdd: "Nouveau",
    buttonSubmit: "Valider",
    create: {
      title: "Création d'une nouvelle prestation",
    },
    update: {
      title: "Mise à jour de la prestation : {cle}",
    },
  },
  buttons: {
    addButton: "Nouveau",
    submitButton: "Valider",
    cancelButton: "Annuler",
    deleteButton: "Supprimer",
    editButton: "Editer facture",
  },
  tooltip: {
    download: "Télécharger {cle}",
    edit: "Editer {cle}",
    update: "Modifier {cle}",
    delete: "Supprimer {cle}",
    modify: "Prolonger {cle}",
    prestation: "prestation",
    facture: "facture",
    client: "client",
    consultant: "consultant",
    company: "société",
  },
  deleteItem: {
    company: "la société",
    consultant: "le consultant",
    client: "le client",
    facture: "la facture",
    prestation: "la prestation",
    confirmation: "Etes-vous sûr de bien vouloir supprimer",
  },
};
