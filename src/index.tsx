import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@app/index';
import '@patternfly/react-core/dist/styles/base.css';
import { setDiagnosticsOptions } from 'monaco-yaml';
import * as monaco from 'monaco-editor';

setDiagnosticsOptions({
  enableSchemaRequest: true,
  hover: true,
  completion: true,
  validate: true,
  format: true,
  schemas: []
});

if (process.env.NODE_ENV !== 'production') {
  const config = {
    rules: [
      {
        id: 'color-contrast',
        enabled: false
      }
    ]
  };

  const axe = require('react-axe');
  axe(React, ReactDOM, 1000, config);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
