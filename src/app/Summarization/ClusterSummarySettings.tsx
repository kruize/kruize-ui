import { Form, FormGroup, TextInput, Checkbox, Popover, ActionGroup, Button, Radio, PageSection, PageSectionVariants } from '@patternfly/react-core';
import RadioButtonsForm from '@app/Components/RadioButtonsForm';
import React from 'react';

const ClusterSummarySettings = () => {

    return (
        <PageSection variant={PageSectionVariants.light}>
          
          <RadioButtonsForm
            options={['Cluster level summary', 'Namespace level summary']}
            name="summary"
            isDisabled={true} // Disable radio buttons for this group

          />
    
          <RadioButtonsForm
            options={['Duration Based', 'Profile based']}
            name="kind"
            isDisabled={true} // Disable radio buttons for this group

          />
    
       
          <RadioButtonsForm
            options={['Long Term', 'Short Term', 'Medium Term']}
            name="duration"
            isDisabled={true} // Disable radio buttons for this group

          />
    
  
          <RadioButtonsForm
            options={['Requests', 'Limits']}
            name="detail"
            isDisabled={true} // Disable radio buttons for this group

          />
    

          <RadioButtonsForm
            options={['CPU Sorted', 'Memory Sorted']}
            name="sorting"
            isDisabled={true} // Disable radio buttons for this group

          />
        </PageSection>
      );
};

export { ClusterSummarySettings };