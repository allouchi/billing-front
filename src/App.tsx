import React, { Suspense, lazy, useEffect, useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Providers from "./providers";
import ErrorBoundary from "./components/ErrorBoundary";
import AppLayout from "./components/AppLayout";
import AppHeader from "./components/Header/AppHeader";
import AppFooter from "./components/Footer/AppFooter";
import PdfViewer from "./pages/Pdf/PdfViewer";
import { FirebaseContext } from "./auth";
import PrivateRoute from "./pages/User/PrivateRoute";

const SignIn = React.lazy(() => import("./pages/User/SignIn"));
const SignUp = React.lazy(() => import("./pages/User/SignUp"));
const Home = React.lazy(() => import("./pages/Home"));
const Factures = React.lazy(() => import("./pages/Facture/Read"));
const Facture = React.lazy(() => import("./pages/Facture/Update"));
const Clients = React.lazy(() => import("./pages/Client/Read/Clients"));
const Client = React.lazy(() => import("./pages/Client/Create"));
const Consultants = React.lazy(
  () => import("./pages/Consultant/Read/Consultants")
);
const Consultant = React.lazy(() => import("./pages/Consultant/Create"));
const Prestations = React.lazy(
  () => import("./pages/Prestation/Read/Prestations")
);
const Prestation = React.lazy(() => import("./pages/Prestation/Create"));
const Companies = React.lazy(() => import("./pages/Company/Read/Companies"));
const Company = React.lazy(() => import("./pages/Company/Create"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App: React.FunctionComponent<{}> = (props) => {
  const firebase: any = useContext(FirebaseContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  /*
  const subscribe = firebase.subscribe();
  let listener = subscribe.onAuthStateChanged((user) => {
    if (user) {
      setIsAuthenticated(true);
      setUser(user);
    }
    listener();
  });
  */

  useEffect(() => {
    const subscribe = firebase.subscribe();
    let cleanUp = subscribe.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      }
    });
    return () => subscribe();
  }, []);

  return (
    <Providers>
      <AppLayout
        header={<AppHeader isAuthenticated={isAuthenticated} />}
        content={
          <ErrorBoundary>
            <Suspense fallback={<>Loading</>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={SignIn} />

                <PrivateRoute
                  exact
                  path="/companies"
                  component={Companies}
                  authenticated={isAuthenticated}
                />
                <PrivateRoute
                  exact
                  path="/company"
                  component={Company}
                  authenticated={isAuthenticated}
                />
                <PrivateRoute
                  exact
                  path="/factures"
                  component={Factures}
                  authenticated={isAuthenticated}
                />
                <PrivateRoute
                  exact
                  path="/factures"
                  component={Factures}
                  authenticated={isAuthenticated}
                />
                <PrivateRoute
                  exact
                  path="/facture"
                  component={Facture}
                  authenticated={isAuthenticated}
                />
                <PrivateRoute
                  exact
                  path="/clients"
                  component={Clients}
                  authenticated={isAuthenticated}
                />
                <PrivateRoute
                  exact
                  path="/client"
                  component={Client}
                  authenticated={isAuthenticated}
                />

                <PrivateRoute
                  exact
                  path="/prestations"
                  component={Prestations}
                  authenticated={isAuthenticated}
                />
                <PrivateRoute
                  exact
                  path="/prestation"
                  component={Prestation}
                  authenticated={isAuthenticated}
                />
                <PrivateRoute
                  exact
                  path="/consultants"
                  component={Consultants}
                  authenticated={isAuthenticated}
                />
                <PrivateRoute
                  exact
                  path="/consultant"
                  component={Consultant}
                  authenticated={Consultant}
                />
                <Route exact path="/pdf" component={PdfViewer} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
        }
        footer={<AppFooter />}
      />
    </Providers>
  );
};

export default App;
