import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';
// import WizardState from './Context_store/WizardState';

const App = () => (
  // <WizardState>
  <Router>
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  </Router>
  // </WizardState>
);

export default App;
