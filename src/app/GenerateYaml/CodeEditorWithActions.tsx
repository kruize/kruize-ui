import React, { useState } from 'react';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import { PageSection, TextContent, Text, TextVariants, Toolbar, PageSectionVariants, ToolbarContent, FormGroup, Grid, GridItem, Button } from '@patternfly/react-core';
import yaml from './ab';
import { SaveIcon, PencilAltIcon } from '@patternfly/react-icons';

export const CodeEditorWithActions = (props: { data; setData }) => {
  const onEditorDidMount = (editor, monaco) => {
    console.log(editor.getValue());
    editor.layout();
    editor.focus();
    monaco.editor.getModels()[0].updateOptions({ tabSize: 5 });
  };
  const [editing, setEditing] = useState(false);
  const onChange = value => {
    console.log(value);
  };
  var parsable_net_equation = props.data.net_eq.replace(/[`]+/g, '')

  var obj = {
    namespace_name: props.data.namespace,
    deployment_value: props.data.deployment,
    experiment_name: props.data.exp_name,
    variable1_name: "throughput",
    variable1_query: props.data.THquery,
    variable1_datasource: props.data.THdatasource,
    variable1_value_type: props.data.THvaluetype,
    variable2_name: "response time",
    variable2_query: props.data.RTquery,
    variable2_datasource: props.data.RTdatasource,
    variable2_value_type: props.data.RTvaluetype,
    variable3_name: "resource usage",
    variable3_query: props.data.RUquery,
    variable3_datasource: props.data.RUdatasource,
    variable3_value_type: props.data.RUvaluetype,
    net_equation: parsable_net_equation
  }
  const data = yaml.toString();
  const data2 = data.replace(/\b(net_equation|namespace_name|deployment_value|experiment_name|variable1_name|variable1_query|variable1_datasource|variable1_value_type|variable2_name|variable2_query|variable2_datasource|variable2_value_type|variable3_name|variable3_query|variable3_datasource|variable3_value_type)\b/gi, function (matched) {
    return obj[matched];
  })

  const formMode = () => {
    return (
      <FormGroup>
        <Grid>
          <GridItem span={1} rowSpan={1}>
            {editing ? (
              <Button
                variant="secondary"
                onClick={() => setEditing(false)}
              >
                <SaveIcon color="blue" /> &nbsp;
                Save
              </Button>
            )
              :
              (<Button
                variant="secondary"
                onClick={() => setEditing(true)}>
                <PencilAltIcon color="blue" /> &nbsp;
                Edit
              </Button>)}
          </GridItem>
          <GridItem>

          </GridItem>
        </Grid>
      </FormGroup>
    );
  };


  return (
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
                <br />
              </Text>
            </TextContent>
          </ToolbarContent>
        </Toolbar>
      </PageSection>
      {formMode}
      <CodeEditor
        isLanguageLabelVisible
        isDarkTheme={true}
        code={data2}
        onChange={onChange}
        language={Language.yaml}
        onEditorDidMount={onEditorDidMount}
        height="sizeToFit"
        isReadOnly={true}
      />
    </>
  );
};
function UseState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}

