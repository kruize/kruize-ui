import React, { useState } from 'react';
import {
  PageSection,
  TextContent,
  Text,
  TextVariants,
  Toolbar,
  PageSectionVariants,
  ToolbarContent,
  Button,
  AlertActionLink
} from '@patternfly/react-core';
import expyaml from './createBulkExperimentYAML';
import { importCreateBulkExperimentJsonURL } from '@app/CentralConfig';
import ReusableCodeBlock from '../RecommendationsForLocalMonitoring/RemoteMonitoring/RecommendationComponents/ReusableCodeBlock';
import { Alert } from '@patternfly/react-core';
import { Link } from 'react-router-dom';

export const CodeEditorWithActions = (props: { data; setData }) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  var obj = {
    subsitute_datasource_name: props.data.datasourceName
  };
  const data = expyaml.toString();
  const data2 = data.replace(
    /\b(subsitute_datasource_name)\b/gi,
    function (matched) {
      return obj[matched];
    }
  );

  const codeEditorData= data2;

  /// BULK POST API CALL

  const handlePostExperimentJson = async (codeEditorData) => {
    let parsedPayload = JSON.parse(codeEditorData);
    try {
      const response = await fetch(importCreateBulkExperimentJsonURL(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedPayload)
      });

      const data = await response.json();
      const jobid = data.job_id;
      // console.log("bulk response", data);
      
      if (response.ok) {
        setShowSuccessAlert(true);
        // get job id and switch to experiment screen
      }
    } catch (error) {
      console.error('Error during data import:', error);
      setShowSuccessAlert(false);
    }
  };

  return (
      <PageSection variant={PageSectionVariants.light}>
        {showSuccessAlert && 
        <Alert 
        variant="success" 
        title="Bulk Experiments Successfully Created" 
        ouiaId="SuccessAlert" 
        actionLinks={
          <AlertActionLink ><Link to={'/experiments'}>Check out Experiments</Link></AlertActionLink>
        }
        />}
        <Toolbar>
          <ToolbarContent style={{ paddingLeft: 0 }}>
            <TextContent>
              <Text component={TextVariants.h1}>Create Bulk Experiment JSON</Text>
              <Text component={TextVariants.p}>
                This is the standard json for creating a bulk experiment for your desired datasource, you can make
                changes to it or proceed further.
                <br />
              </Text>
            </TextContent>
          </ToolbarContent>
        </Toolbar>
        <ReusableCodeBlock code={data2} includeActions={true} />
        <br />

        <Button variant="primary" onClick={() => handlePostExperimentJson(codeEditorData)}>
          Create Bulk Experiment
        </Button>
      </PageSection>
  );
};
