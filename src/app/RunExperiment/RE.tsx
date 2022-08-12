import React, { useState, useRef } from "react";
import { Button, Card, CardBody, Grid, GridItem, TextContent, Text, TextVariants } from "@patternfly/react-core";
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
      <Card>
        <CardBody>
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
              <br />

              <Grid hasGutter>
                <GridItem span={5}>
                  <Link to="/experiment_status">
                  <Button variant="secondary">Submit</Button>
                  </Link>
                 
                </GridItem>
                <GridItem span={2}> </GridItem>
                <GridItem span={3}>
                  <Button variant="secondary" >
                    Reset
                  </Button>
                </GridItem>
              </Grid>
              <br />
            </GridItem>
            <GridItem span={2}></GridItem>
          </Grid>
        </CardBody>
      </Card>
    );
  };
  return <div>{dropd()}</div>;
};

export default RE;
