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
  AlertActionLink,
  Alert
} from '@patternfly/react-core';
import MonacoEditor from 'react-monaco-editor';
import expyaml from './createExperimentYAML';
import { importCreateExperimentJsonURL } from '@app/CentralConfig';
import { Link } from 'react-router-dom';

export const CodeEditorWithActions = (props: { data; setData }) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
 
  const isNamespaceExperiment = props.data.experimentType === 'namespace';
  
  let data2;
  if (isNamespaceExperiment) {
    // Generate namespace experiment JSON
    const namespaceExperimentJSON = `[{
  "version": "v2.0",
  "experiment_name": "${props.data.datasourceName}|${props.data.clusterName}|${props.data.projectName}",
  "cluster_name": "${props.data.clusterName}",
  "performance_profile": "resource-optimization-local-monitoring",
  "metadata_profile": "cluster-metadata-local-monitoring",
  "mode": "monitor",
  "target_cluster": "local",
  "datasource": "${props.data.datasourceName}",
  "experiment_type": "namespace",
  "kubernetes_objects": [
    {
        "namespaces": {
            "namespace": "${props.data.projectName}"
      }
    }
  ],
  "trial_settings": {
    "measurement_duration": "15min"
  },
  "recommendation_settings": {
    "threshold": "0.1"
  }
}]`;
    data2 = namespaceExperimentJSON;
  } else {
    // Generate experiment name using Kruize naming convention:
    // datasource_name|cluster_name|namespace|workload_name(workload_type)|container_name
    const experimentName = `${props.data.datasourceName}|${props.data.clusterName}|${props.data.projectName}|${props.data.workloadName}(${props.data.workloadType})|${props.data.containerName}`;
    
    var obj = {
      subsitute_namespace: props.data.projectName,
      subsitute_experiment_name: experimentName,
      subsitute_cluster_name: props.data.clusterName,
      subsitute_workload_type: props.data.workloadType,
      subsitute_workload_name: props.data.workloadName,
      subsitute_container_name: props.data.containerName,
      subsitute_container_image: props.data.containerImageName,
      subsitute_datasource_name: props.data.datasourceName
    };
    const data = expyaml.toString();
    data2 = data.replace(
      /\b(subsitute_experiment_name|subsitute_container_image|subsitute_namespace|subsitute_cluster_name|subsitute_workload_name|subsitute_workload_type|subsitute_container_name|subsitute_datasource_name)\b/gi,
      function (matched) {
        return obj[matched];
      }
    );
  }

  const [codeEditorData, setCodeEditorData] = useState(data2);
  const [validationError, setValidationError] = useState('');

  // Handle editor change
  const handleEditorChange = (newValue: string) => {
    setCodeEditorData(newValue);
    setValidationError('');
  };

  /// POST API call
  const handlePostExperimentJson = async (codeEditorData) => {
    try {
      let parsedPayload = JSON.parse(codeEditorData);
    } catch (error) {
      setValidationError('Invalid JSON format. Please fix the syntax errors.');
      return;
    }
    
    let parsedPayload = JSON.parse(codeEditorData);
    try {
      const response = await fetch(importCreateExperimentJsonURL(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedPayload)
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setShowSuccessAlert(true);
      }
    } catch (error) {
      console.error('Error during data import:', error);
      setShowSuccessAlert(false);
    }
  };

  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line' as const,
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: 'on' as const,
    formatOnPaste: true,
    formatOnType: true,
  };

  return (
    <PageSection variant={PageSectionVariants.light}>
      {showSuccessAlert &&
        <Alert
          variant="success"
          title="Experiment Successfully Created"
          ouiaId="SuccessAlert"
          actionLinks={
            <AlertActionLink><Link to={'/view-recommendations'}>View Recommendations</Link></AlertActionLink>
          }
        />
      }
      {validationError &&
        <Alert
          variant="danger"
          title="Validation Error"
          ouiaId="ValidationAlert"
        >
          {validationError}
        </Alert>
      }
      <Toolbar>
        <ToolbarContent style={{ paddingLeft: 0 }}>
          <TextContent>
            <Text component={TextVariants.h1}>Create Experiment JSON</Text>
            <Text component={TextVariants.p}>
              Edit the JSON below to customize your experiment configuration. The fields are pre-filled based on the selected workload.
              <br />
            </Text>
          </TextContent>
        </ToolbarContent>
      </Toolbar>
      <div style={{
        border: '1px solid #d2d2d2',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '16px'
      }}>
        <MonacoEditor
          width="100%"
          height="500"
          language="json"
          theme="vs-light"
          value={codeEditorData}
          options={editorOptions}
          onChange={handleEditorChange}
        />
      </div>
      <Button variant="primary" onClick={() => handlePostExperimentJson(codeEditorData)}>
        Create Experiment
      </Button>
    </PageSection>
  );
};
