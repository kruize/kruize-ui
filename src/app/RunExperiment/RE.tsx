import React, { useState } from "react";
import { Button, Card, CardBody, Grid, GridItem } from "@patternfly/react-core";

import NameSpaceDropDown from "./NameSpaceDropDown";
import DeploymentsDropdown from "./DeploymentsDropdown";

const RE: React.FunctionComponent = () => {
  const initState = { namespace: null };
  const [namespace, setNamespace] = useState();
  const [value, setValue] = useState(initState);

  function handelSubmit(value) {
    setValue(value);
  }
  function handleReset() {
    setValue(initState);
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
                  <NameSpaceDropDown ns={namespace} nsModifier={setNamespace} />
                </GridItem>
                <GridItem span={6}>
                  <DeploymentsDropdown />
                </GridItem>
              </Grid>
              <br />

              <Grid hasGutter>
                <GridItem span={5}>
                  <Button variant="secondary">Submit</Button>
                </GridItem>
                <GridItem span={2}> </GridItem>
                <GridItem span={3}>
                  <Button variant="secondary" onClick={handleReset}>
                    Reset{" "}
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
