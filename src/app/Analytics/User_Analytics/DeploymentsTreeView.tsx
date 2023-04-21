import React from 'react'
import { Button, FormFieldGroupExpandable, FormFieldGroupHeader, TreeView, TreeViewDataItem } from '@patternfly/react-core';
import { TableIcon } from '@patternfly/react-icons';
import { AnalyticsDeployment } from './AnalyticsDeployment';

const DeploymentsTreeView = () => {

    return (
        <FormFieldGroupExpandable
            isExpanded
            toggleAriaLabel="Details"
            header={
                <FormFieldGroupHeader
                    titleText={{ text: 'Deployment', id: 'bha' }}
                />
            }
        >
            <AnalyticsDeployment />
        </FormFieldGroupExpandable>
    )
}

export { DeploymentsTreeView }

