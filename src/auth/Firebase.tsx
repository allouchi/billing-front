import app from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCQA-6kwUdFc6AMxptLOWDtVADkkXe9upE",
  authDomain: "bill-api-27fc7.firebaseapp.com",
  projectId: "bill-api-27fc7",
  storageBucket: "bill-api-27fc7.appspot.com",
  messagingSenderId: "128125027130",
  appId: "1:128125027130:web:62d3ab25bed86de032c603",
};

class Firebase {
  auth: {};
  constructor() {
    if (app.initializeApp.length === 0) {
      app.initializeApp(config);
      this.auth = app.auth();
    }
  }

  loginUser = (email: string, password: string): Promise<any> => {
    let reponse;
    reponse = app.auth().signInWithEmailAndPassword(email, password);
    return reponse;
  };

  createLoginUser = (email: string, password: string): Promise<any> => {
    let reponse = app.auth().createUserWithEmailAndPassword(email, password);
    return reponse;
  };

  subscribe = (): any => {
    return app.auth();
  };

  loginOutUser = (): Promise<any> => {
    let reponse;
    reponse = app.auth().signOut();
    return reponse;
  };
}

export default Firebase;
