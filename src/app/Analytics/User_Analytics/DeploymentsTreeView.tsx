import React from 'react';
import {
  FormFieldGroupExpandable,
  FormFieldGroupHeader,
  
} from '@patternfly/react-core';

import { AnalyticsDeployment } from './AnalyticsDeployment';

const DeploymentsTreeView = () => {
  return (
    <FormFieldGroupExpandable
      isExpanded
      toggleAriaLabel="Details"
      header={<FormFieldGroupHeader titleText={{ text: 'Deployment', id: 'bha' }} />}
    >
      <AnalyticsDeployment />
    </FormFieldGroupExpandable>
  );
};

export { DeploymentsTreeView };
