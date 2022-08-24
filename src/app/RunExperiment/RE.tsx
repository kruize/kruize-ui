import React, { useState, useRef } from "react";
import { Button, PageSection, PageSectionVariants, Toolbar, ToolbarContent, Card, CardBody, Grid, GridItem, TextContent, Text, TextVariants } from "@patternfly/react-core";
import NameSpaceDropDown from "./NameSpaceDropDown";
import DeploymentsDropdown from "./DeploymentsDropdown";
import { Switch, Route, Link, Redirect } from 'react-router-dom';
const RE: React.FunctionComponent = () => {
  const initState = { namespace: null };
  const [namespace, setNamespace] = useState();
  const [value, setValue] = useState(initState);

  const onSubmitHandle = () => {
   return  <Switch>
<Route path ="/experiment_status"/>
   </Switch>
  

  }

  const dropd = () => {
    return (
<PageSection variant={PageSectionVariants.light}>
        <Toolbar>
          <ToolbarContent style={{ paddingLeft: 0 }}>
            <TextContent>
              <Text component={TextVariants.h1}>
              Run Experiment
</Text>
<Text component={TextVariants.p}>

            Select your specific Namespace and Deployment to start with Experiment.
</Text>
            </TextContent> 
          </ToolbarContent>
        </Toolbar>
       
     
          <Grid hasGutter>
            <GridItem span={2}></GridItem>
            <GridItem span={8}>
              <Grid hasGutter>
                <GridItem span={6}>
                  <TextContent>
                    <Text  component={TextVariants.h4}>
                      Namespace
                    </Text>
                  </TextContent>
                  <NameSpaceDropDown ns={namespace} nsModifier={setNamespace} />
                </GridItem>
                <GridItem span={6}>
                <TextContent>
                    <Text  component={TextVariants.h4}>
                      Deployment
                    </Text>
                  </TextContent>
                  <DeploymentsDropdown />
                </GridItem>
              </Grid>     
            </GridItem>     
            </Grid>
          </PageSection>
    );
  };
  return <div>{dropd()}</div>;
};

export default RE;
