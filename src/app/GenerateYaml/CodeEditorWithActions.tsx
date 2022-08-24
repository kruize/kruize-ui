import React from 'react';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import {PageSection, TextContent, Text, TextVariants, Toolbar, PageSectionVariants, ToolbarContent } from '@patternfly/react-core';
import { Page2 } from '@app/ExperimentStatus/MoreExperimentStuff/Page2';
export const CodeEditorWithActions: React.FunctionComponent = () => {
  const onEditorDidMount = (editor, monaco) => {
    // eslint-disable-next-line no-console
    console.log(editor.getValue());
    editor.layout();
    editor.focus();
    monaco.editor.getModels()[0].updateOptions({ tabSize: 5 });
  };

  const onChange = value => {
    // eslint-disable-next-line no-console
    console.log(value);
  };
      return(
      <>
      <PageSection variant={PageSectionVariants.light}>
      <Toolbar>
        <ToolbarContent style={{ paddingLeft: 0 }}>
          <TextContent>
            <Text component={TextVariants.h1}>
              YAML Generated
            </Text>
            <Text component={TextVariants.p}>

              The following yaml has been generated for you...
            </Text>
          </TextContent>
        </ToolbarContent>
      </Toolbar>
      </PageSection>
      <CodeEditor
      code='apiVersion: "recommender.com/v1"
kind: Autotune
metadata:
  name: "petclinic-autotune"
  namespace: "default"
spec:
  slo:
    objective_function: "transaction_response_time"
    slo_class: "response_time"
    direction: "minimize"
    hpo_algo_impl: "optuna_tpe"
    function_variables:
    - name: "transaction_response_time"
      query: "application_org_acme_microprofile_metrics_PrimeNumberChecker_checksTimer_mean_seconds"
      datasource: "prometheus"
      value_type: "double"
  mode: "show"
  selector:
    matchLabel: "app.kubernetes.io/name"
    matchLabelValue: "petclinic-deployment"
    matchRoute: ""
    matchURI: ""
    matchService: ""
  datasource:
    name: "prometheus"
    value: "prometheus_URL"'
      onChange={onChange}
      language={Language.javascript}
      onEditorDidMount={onEditorDidMount}
      height="sizeToFit"
    />
    </>
    );
    };

