import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Providers from './providers';
import ErrorBoundary from './components/ErrorBoundary';
import AppLayout from './components/AppLayout';
import AppHeader from './components/Header/AppHeader';
import AppFooter from './components/Footer/AppFooter';
import PdfViewer from './pages/Pdf/PdfViewer';

const SignIn = React.lazy(() => import('./pages/User/SignIn'));
const Home = React.lazy(() => import('./pages/Home'));
const Factures = React.lazy(() => import('./pages/Facture/Read'));
const Facture = React.lazy(() => import('./pages/Facture/Update'));
const Clients = React.lazy(() => import('./pages/Client/Read/Clients'));
const Client = React.lazy(() => import('./pages/Client/Create'));
const Consultants = React.lazy(() => import('./pages/Consultant/Read/Consultants'));
const Consultant = React.lazy(() => import('./pages/Consultant/Create'));
const Prestations = React.lazy(() => import('./pages/Prestation/Read/Prestations'));
const Prestation = React.lazy(() => import('./pages/Prestation/Create'));
const Companies = React.lazy(() => import('./pages/Company/Read/Companies'));
const Company = React.lazy(() => import('./pages/Company/Create'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App: React.FunctionComponent<{}> = () => {
  return (
    <Providers>
      <AppLayout
        header={<AppHeader />}
        content={
            <ErrorBoundary>
              <Suspense
                fallback={<>Loading</>}
              >
                <Switch>
                  <Route exact path="/signin" component={SignIn} />
                  <Route exact path="/" component={Home} />
                  <Route exact  path="/companies" component={Companies} />
                  <Route exact  path="/company" component={Company} />
                  <Route exact  path="/factures" component={Factures} />
                  <Route exact  path="/clients" component={Clients} />
                  <Route exact  path="/client" component={Client} />
                  <Route exact  path="/prestations" component={Prestations} />
                  <Route exact  path="/prestation" component={Prestation} />
                  <Route exact  path="/consultants" component={Consultants} />
                  <Route exact  path="/consultant" component={Consultant} />
                  <Route exact  path="/facture" component={Facture} />
                  <Route exact  path="/pdf" component={PdfViewer} />
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
