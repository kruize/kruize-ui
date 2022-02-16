import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import "@patternfly/patternfly/patternfly.min.css"
import "@patternfly/patternfly/patternfly-addons.css"
import ReactDOM from 'react-dom';
import './index.css';
import KruizeRoot from './KruizeApp/KruizeRoot';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <KruizeRoot />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
