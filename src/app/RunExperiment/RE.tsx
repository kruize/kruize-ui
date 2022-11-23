import React, { useState, useContext, useEffect } from "react";
import { Button, PageSection, PageSectionVariants, Toolbar, ToolbarContent, FormGroup, TextInput, Grid, GridItem, TextContent, Text, TextVariants, WizardContext } from "@patternfly/react-core";
import NameSpaceDropDown from "./NameSpaceDropDown";
import DeploymentsDropdown from "./DeploymentsDropdown";
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import nodeContext from "@app/Context_store/nodeContext";

const RE = (props: { setData; data }) => {
  const [exp_name, setExp_name] = useState('')
  const Context = useContext(nodeContext);
  const ip = Context["dep"];

  useEffect(() => {
    props.setData({ ...{ ...props.data }, exp_name: exp_name })
  }, [exp_name])

  const onSubmitHandle = () => {
    return <Switch>
      <Route path="/experiment_status" />
    </Switch>
  }

  useEffect(() => {
    setExp_name(sessionStorage.getItem("Exp name Value")!);

  }, [])

  const onTextInputHandler = (exp_name) => {
    sessionStorage.setItem("Exp name Value", exp_name);
    setExp_name(exp_name)
  }

  const dropd = () => {

    return (
      <>
        <PageSection variant={PageSectionVariants.light}>
          <Toolbar>
            <ToolbarContent style={{ paddingLeft: 0 }}>
              <TextContent>
                <Text component={TextVariants.h1}>
                  New Experiment
                </Text>
                <Text component={TextVariants.p}>
                  Select your specific Namespace and Deployment to start with Experiment.
                </Text>
              </TextContent>
            </ToolbarContent>
          </Toolbar>
          <Grid hasGutter>
            <GridItem span={8}>
              <Grid hasGutter>
                <GridItem span={6}>
                  <FormGroup isRequired
                    label="Experiment Name" fieldId="horizontal-form-email" >
                    <TextInput
                      value={exp_name}
                      name="experiment_name_textbox"
                      onChange={onTextInputHandler}
                      aria-label="Text inp 101"
                    />
                    <br />
                  </FormGroup>
                </GridItem>
                <GridItem span={6}>
                  <FormGroup isRequired
                    label="Namespace" fieldId="horizontal-form-email" >
                  </FormGroup>
                  <NameSpaceDropDown data={props.data} setData={props.setData} />
                </GridItem>
                <GridItem span={6}>
                  <FormGroup isRequired
                    label="Deployment" fieldId="horizontal-form-email" >
                  </FormGroup>
                  <DeploymentsDropdown data={props.data} setData={props.setData} />
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </PageSection>
      </>
    );
  };
  return <div>{dropd()}</div>;
};

export default RE;
