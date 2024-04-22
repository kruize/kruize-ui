import { Button, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDatasourceMetadataURL } from '@app/CentralConfig';
import { Link } from 'react-router-dom';
import { getListExperimentsURL } from '@app/CentralConfig';
import { CodeEditorWithActions } from '@app/Analytics/LocalMonitoring/GenerateJSON/CodeEditorWithActions';

interface LocationState {
  //   datasources: string; // Adjust the type according to the actual data you expect
  containerName: string;
  projectName: string;
  workloadName: string;
  workloadType: string;
  clusterName: string;
  containerImageName: string;
}

const CreateExperiment = (props: { clusterGroupData }) => {
  const [experimentsFound, setExperimentsFound] = useState(false);
  const location = useLocation<LocationState>();

  const create_experiment_json_data = {
    exp_name: location.state?.clusterName + '|' + location.state?.projectName + '|' + location.state?.workloadName,
    projectName: location.state?.projectName,
    workloadName: location.state?.workloadName,
    workloadType: location.state?.workloadType,
    containerName: location.state?.containerName,
    clusterName: location.state?.clusterName,
    containerImageName: location.state?.containerImageName,
  };
  const [data, setData] = useState(create_experiment_json_data);
   /// POST API call

   const handlelistExperimentJson = async (codeEditorData) => {
    console.log(codeEditorData)
    const payload =codeEditorData;
    console.log("Sending data to API:", payload);
    let parsedPayload = JSON.parse(codeEditorData);
    console.log(parsedPayload);
    try {
      const response = await fetch(getListExperimentsURL(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedPayload)
      });

      const data = await response.json();
     console.log(data);
     if (data.length == 0) {
      console.log('Empty , No Experiments Found');
      setExperimentsFound(false);
    } else {
      setExperimentsFound(true);
    }

    } catch (error) {
      console.error('Error during data import:', error);
      setExperimentsFound(false);
      
    }
  };

  useEffect(() => {
    try {
     handlelistExperimentJson();
    } catch {
      console.log('Clusters get URL not working');
    }
  }, []);


  return (
    <PageSection variant={PageSectionVariants.light}>
      <React.Fragment>
        <CodeEditorWithActions setData={setData} data={data} />
      </React.Fragment>
    </PageSection>
  );
};

export { CreateExperiment };
