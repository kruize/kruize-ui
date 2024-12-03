import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CodeEditorWithActions } from '@app/Analytics/LocalMonitoring/CreateBulkExperiment/CodeEditorWithActions';

interface LocationState {
  datasourceName: string;
}

/*  

  Whatever data this page gets from link it creates the create_bulk_experiment_json_data structure for future use.
  This page is called on clicking the action item + icon and firstly it checks the status of the experiment name
  via calling list exp and  if it gets experiment already created for that exp name it redirects to the Monitoring View 
  else if the exp does not exists then it takes user to the create exp page by setting the experimentsNotFound state to true or false
  depending on this experimentsNotFound state the components are called

*/

const CreateBulkExperiment = () => {
  const location = useLocation<LocationState>();
  const create_bulk_experiment_json_data = {
    datasourceName: location.state?.datasourceName
  };
  const [data, setData] = useState(create_bulk_experiment_json_data);

  return (
    <PageSection variant={PageSectionVariants.light}> 
        <CodeEditorWithActions setData={setData} data={data} /> 
    </PageSection>
  );
};

export { CreateBulkExperiment };
