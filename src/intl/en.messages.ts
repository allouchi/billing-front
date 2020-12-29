export default {
  // Application title
  "application-name": "Billing App",
  // NavBar menu items
  menu: {
    title: "Menu",
    home: "Home",
    companies : "Company",
    factures: "Bills",
    consultants: "Consultant",
    cliente: "Customer",
    prestations: "Prestation"
  },
  // Internal/unknown error
  internalError: "Something's wrong.",
  internalErrorMessage: "We're unable to complete your request at the moment.",
  internalErrorContact: "Contact us",
  internalErrorTryAgain: "Try Again",
  // Common Messages
  loadingMessage: "Loading...Please wait",
  // Page not found
  notFound: "Page not found.",
  notFoundMessage: "Sorry, we couldn't find this page",
  notFoundContact: "Contact us",
  notFoundGoBack: "Go back",
  // Home page
  home: {
    "edit-source-code": " Edit {codeContent} and save to reload.",
    "learn-react": "Learn React",
  },
  factures: {
    title: "Bills List",
  },
  companies: {
    title: "Companies List",
    buttonAdd: "New",
    buttonSubmit : "Submit",
    companyAdress : "Company adress",
    create: {
      title: 'Création d\'un nouvelle société'
    } 
  },
  clients: {
    title: "Liste des Clients",
    buttonAdd: "Nouveau",
    buttonSubmit : "Valider",
    clientAdress : "Adresse client",
    create: {
      title: 'Création d\'un nouveau client',
      info: 'Infos client',
    }
  },
  consultants: {
    title: "Consultants List",
    buttonAdd: "New",
    buttonSubmit : "Submit",
    create: {
      title: 'Création d\'un nouveau consultant',
      info: 'Infos consultant',
    } 
  },
  prestations: {
    title: "Prestations List",
    buttonAdd: "New",
    buttonSubmit : "Submit",
    create: {
      title: 'Création d\'une nouvelle prestation'
    }  
  },

  buttons: {    
    addButton: "New",
    submitButton : "Validate",
    cancelButton: "Cancel",
    deleteButton : "Delete bill", 
    editButton : "Edit bill",   
  },
  deleteItem: {
    company: 'la société',
    consultant: 'le consultant',
    client: 'le client',
    facture: 'la facture',
    prestation: 'la prestation',
    confirmation : "Etes-vous sûr de bien vouloir supprimer"
  },
  tooltip: {
    edit: 'Edit {cle}',
    delete: 'Delete {cle}',
    prestation: 'prestation',
    facture: 'bill',
    client: 'client',
    consultant: 'consultant',
    company: 'campany',
  },
   
  billErrors: {
    billsNotFound: "Error during getting bills",
  },
};
