import React, { Suspense, lazy, useEffect, useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Providers from "./providers";
import ErrorBoundary from "./components/ErrorBoundary";
import AppLayout from "./components/AppLayout";
import AppHeader from "./components/Header/AppHeader";
import AppFooter from "./components/Footer/AppFooter";
import { FirebaseContext } from "./auth";
import PrivateRoute from "./pages/User/PrivateRoute";

const PrestationModify = React.lazy(
  () => import("./pages/Prestation/Edit/PrestationModify")
);
const SignIn = React.lazy(() => import("./pages/User/SignIn"));
const SignUp = React.lazy(() => import("./pages/User/SignUp"));
const InitPassword = React.lazy(() => import("./pages/User/InitPassword"));
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

  let [user, setUser] = useState(null);

  useEffect(() => {
    const subscribe = firebase.doAutentification();
    return subscribe.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [firebase]);

  const preventSubscribe = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  return (
    <Providers>
      <AppLayout
        header={
          <AppHeader
            preventSubscribe={preventSubscribe}
            isAuthenticated={isAuthenticated}
          />
        }
        content={
          <ErrorBoundary>
            <Suspense fallback={<>Loading</>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/init" component={InitPassword} />
                <Route
                  exact
                  path="/signup"
                  render={(props) => (
                    <SignUp
                      {...props}
                      isAuthenticated={isAuthenticated}
                      preventSubscribe={preventSubscribe}
                    />
                  )}
                />
                <Route
                  exact
                  path="/login"
                  render={(props) => (
                    <SignIn
                      {...props}
                      isAuthenticated={isAuthenticated}
                      preventSubscribe={preventSubscribe}
                    />
                  )}
                />
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
                  path="/prestaModify"
                  component={PrestationModify}
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
                  authenticated={isAuthenticated}
                />
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
