import React, { useState } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import './app.css';
import { AppRoutes } from './routes';
import { AppLayout } from '@app/components/AppLayout/AppLayout';

const App = () => {
  return (
    <Router>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
  );
};

export default App;
