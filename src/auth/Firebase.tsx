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
  auth: any;
  constructor() {
    if (app.initializeApp.length === 0) {
      app.initializeApp(config);
      this.auth = app.auth();
    }
  }

  loginUser = (email: string, password: string) => {
    this.auth.signInWithEmailAndPassword(email, password);
  };

  loginOutUser = () => {
    this.auth.signOut();
  };
}

export default Firebase;
