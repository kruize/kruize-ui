import React, { useState } from 'react';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import {
  PageSection,
  TextContent,
  Text,
  TextVariants,
  Toolbar,
  PageSectionVariants,
  ToolbarContent,
  Button
} from '@patternfly/react-core';
import expyaml from './createExperimentYAML';
import { importCreateExperimentJsonURL } from '@app/CentralConfig';
import ReusableCodeBlock from '../RecommendationsForLocalMonitoring/RemoteMonitoring/RecommendationComponents/ReusableCodeBlock';
import { Alert } from '@patternfly/react-core';

export const CodeEditorWithActions = (props: { data; setData }) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const onEditorDidMount = (editor, monaco) => {
    editor.layout();
    editor.focus();
    monaco.editor.getModels()[0].updateOptions({ tabSize: 5 });
  };
  var obj = {
    subsitute_namespace: props.data.projectName,
    subsitute_experiment_name: props.data.exp_name,
    subsitute_cluster_name: props.data.clusterName,
    subsitute_workload_type: props.data.workloadType,
    subsitute_workload_name: props.data.workloadName,
    subsitute_container_name: props.data.containerName,
    subsitute_container_image: props.data.containerImageName,
    subsitute_datasource_name: props.data.datasourceName
  };
  const data = expyaml.toString();
  const data2 = data.replace(
    /\b(subsitute_experiment_name|subsitute_container_image|subsitute_namespace|subsitute_cluster_name|subsitute_workload_name|subsitute_workload_type|subsitute_container_name|subsitute_datasource_name)\b/gi,
    function (matched) {
      return obj[matched];
    }
  );

  const [codeEditorData, setCodeEditorData] = useState([data2]);

  const onChange = (value) => {
    setCodeEditorData(value);
    console.log(value);
    console.log(typeof value);
  };

  /// POST API call

  const handlePostExperimentJson = async (codeEditorData) => {
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
        setTimeout(() => setShowSuccessAlert(false), 3000);
      }
    } catch (error) {
      console.error('Error during data import:', error);
      setShowSuccessAlert(false);
    }
  };

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        {showSuccessAlert && <Alert variant="success" title="Experiment Successfully Created" ouiaId="SuccessAlert" />}
        <Toolbar>
          <ToolbarContent style={{ paddingLeft: 0 }}>
            <TextContent>
              <Text component={TextVariants.h1}>Create Experiment JSON</Text>
              <Text component={TextVariants.p}>
                This is the standard json for creating an experiment for your desired container name, you can make
                changes to it or proceed further
                <br />
              </Text>
            </TextContent>
          </ToolbarContent>
        </Toolbar>

        {/* <CodeEditor
        isLanguageLabelVisible
        isDarkTheme={true}
        code={data2}
        onChange={onChange}
        // language={Language.yaml}
        onEditorDidMount={onEditorDidMount}
        height="sizeToFit"
        isReadOnly={false}
      /> */}
        <ReusableCodeBlock code={data2} includeActions={true} />
        <br />
        <Button variant="primary" onClick={() => handlePostExperimentJson(codeEditorData)}>
          Create Experiment
        </Button>
      </PageSection>
    </>
  );
};
