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
import expyaml from './createExperimentYAML'
import { importCreateExperimentJsonURL } from '@app/CentralConfig';

export const CodeEditorWithActions = (props: { data; setData }) => {
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
    subsitute_container_image: props.data.containerImageName
   
  };
  const data = expyaml.toString();
  const data2 = data.replace(
    /\b(subsitute_experiment_name|subsitute_container_image|subsitute_namespace|subsitute_cluster_name|subsitute_workload_name|subsitute_workload_type|subsitute_container_name)\b/gi,
    function (matched) {
      return obj[matched];
    }
  );

  const [codeEditorData, setCodeEditorData] = useState([data2]);

  const onChange = (value) => {
    setCodeEditorData(value);
    console.log(value);
    console.log(typeof(value));
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

    } catch (error) {
      console.error('Error during data import:', error);
      
    }
  };

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <Toolbar>
          <ToolbarContent style={{ paddingLeft: 0 }}>
            <TextContent>
              <Text component={TextVariants.h1}>Create Experiment JSON</Text>
              <Text component={TextVariants.p}>
                This is the standard json for creating an experiment for your desired container name, 
                you can make changes to it or proceed further
                <br />
              </Text>
            </TextContent>
          </ToolbarContent>
        </Toolbar>
      </PageSection>
      <CodeEditor
        isLanguageLabelVisible
        isDarkTheme={true}
        code={data2}
        onChange={onChange}
        // language={Language.yaml}
        onEditorDidMount={onEditorDidMount}
        height="sizeToFit"
        isReadOnly={false}
      />
      <br/>
        <Button
          variant="primary"
          onClick={() => handlePostExperimentJson(codeEditorData)}
        >
          Create Experiment
        </Button>
    </>
  );
};
