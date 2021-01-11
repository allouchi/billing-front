export default {
  // Application title
  "application-name": "Application de facturation",
  // NavBar menu items
  menu: {
    title: "Menu",
    home: "Accueil",
    companies: "Sociétés",
    factures: "Factures",
    consultants: "Consultants",
    clients: "Clients",
    prestations: "Prestations"
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
  messages:{
    create: {
      success: "{cle} a été créee avec succès",
    },
    edit: {
      success: "{cle} a été éditée avec succès",
    },
    update: {
      success: "{cle} a été éditée avec succès",
      echec: "{cle} n'a pas été mise à jour",
    },
    delete:{
      success: "{cle} a été supprimée avec succès",
    },
    download:{
      success: "{cle} a été téléchargée avec succès",
      echec: "{cle} n'a pas été téléchargée"
    },
    
  }, 
  // Home page
  home: {
    "edit-source-code":
      "Modifier {codeContent} et enregistrer pour raffraichir la page.",
    "learn-react": "Apprendre React",
  },
  factures: {
    title: "Liste des factures",
  },
  companies: {
    title: "Liste des sociétés",
    buttonAdd: "Nouveau",
    buttonSubmit : "Valider",
    companyAdress : "Adresse société",
    create: {
      title: 'Création d\'un nouvelle société'
    }
  },
  billErrors: {
    billsNotFound: "Erreur lors de la recherche des factures",
  },
  clients: {
    title: "Liste des Clients",
    buttonAdd : "Nouveau",
    buttonSubmit : "Valider",
    clientAdress : "Adresse client",
    create: {
      title: 'Création d\'un nouveau client',
      info: 'Infos client'
    }
  },
  consultants: {
    title: "Liste des Consultants",
    buttonAdd: "Nouveau",
    buttonSubmit : "Valider",
    create: {
      title: 'Création d\'un nouveau consultant'
    }
  },
  prestations: {
    title: "Liste des Prestations",
    buttonAdd: "Nouveau",
    buttonSubmit : "Valider",
    create: {
      title: 'Création d\'une nouvelle prestation'
    }
  },
  buttons: {    
    addButton: "Nouveau",
    submitButton : "Valider",
    cancelButton: "Annuler",
    deleteButton : "Supprimer", 
    editButton : "Editer facture",   
  },
  tooltip: {
    download: 'Télécharger {cle}',
    edit: 'Editer {cle}',
    update: 'Modifier {cle}',
    delete: 'Supprimer {cle}',
    prestation: 'prestation',
    facture: 'facture',
    client: 'client',
    consultant: 'consultant',
    company: 'société',
  },
  deleteItem: {
    company: 'la société',
    consultant: 'le consultant',
    client: 'le client',
    facture: 'la facture',
    prestation: 'la prestation',
    confirmation : "Etes-vous sûr de bien vouloir supprimer",
  }
};
