import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getListExperimentsURLWithParams } from '@app/CentralConfig';
import { CodeEditorWithActions } from '@app/Analytics/LocalMonitoring/GenerateJSON/CodeEditorWithActions';
import { Monitoring } from './RecommendationsForLocalMonitoring/RemoteMonitoring/Monitoring';

interface LocationState {
  containerName: string;
  projectName: string;
  workloadName: string;
  workloadType: string;
  clusterName: string;
  containerImageName: string;
}

const CreateExperiment = (props: { clusterGroupData }) => {
  const [experimentsNotFound, setExperimentsNotFound] = useState();
  const location = useLocation<LocationState>();

  const create_experiment_json_data = {
    exp_name: location.state?.clusterName + '|' + location.state?.projectName + '|' +location.state?.workloadType+ '|' +  location.state?.workloadName , 
    projectName: location.state?.projectName,
    workloadName: location.state?.workloadName,
    workloadType: location.state?.workloadType,
    containerName: location.state?.containerName,
    clusterName: location.state?.clusterName,
    containerImageName: location.state?.containerImageName,
  };
  const [data, setData] = useState(create_experiment_json_data);

  //  const handlelistExperimentJson = async (experiment_name) => {
  //   try {
  //     const response = await fetch(getListExperimentsURLWithParams(experiment_name));
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('There was a problem with the fetch operation:', error);
  //   }
  // };
  const handleListExperimentJson = async (experiment_name) => {
    try {
        const response = await fetch(getListExperimentsURLWithParams(experiment_name));
        if (!response.ok) {
            if (response.status === 400) {
                console.error('Received a 400 Bad Request response');
                setExperimentsNotFound(true);
                const errorData = await response.json();
                console.error('Error details:', errorData);
                return; 
            }
            throw new Error('Network response was not ok: ' + response.status);
        }
        const data = await response.json();
        setExperimentsNotFound(false);
        console.log(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

  useEffect(() => {
    try {
     handleListExperimentJson(create_experiment_json_data.exp_name);
    } catch {
      console.log('List Exp Post URL not working');
    }
  }, []);


  return (
    <PageSection variant={PageSectionVariants.light}>
      <React.Fragment>
        {experimentsNotFound == true ? <CodeEditorWithActions setData={setData} data={data} /> 
        : <div>
          <Monitoring/>
          </div>}
      </React.Fragment>
    </PageSection>
  );
};

export { CreateExperiment };
