import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  PageSection,
  Slider,
  Title,
  Text,
  Card,
  CardBody,
  Button,
  Wizard,
  Toolbar,
  
  PageSectionVariants,
  
  TextContent,
  TextVariants,
  Tile ,
  ToolbarContent,
} from "@patternfly/react-core";
import { Page1 } from "./Page1";
import { Page2 } from "./Page2";
import { Link } from "react-router-dom";
import { Page3 } from "./Page3";
import { Page4 } from "./Page4";
 
const ExperimentDetails: React.FunctionComponent = () => {  
  const [finish, setFinish] = useState();  
  const steps = [
      { name: 'First step', component: <Page1/> },
      { name: 'Throughput', component: <Page2/> },
      { name: 'Response Time', component: <Page3/> },
      { name: 'Resource Usage', component: <Page4/> ,  nextButtonText: 'Finish'},
      // { name: 'Review', component: <p>Review step content</p>, }
    ];
    const title = 'Basic wizard';
  
    return ( 
      <>
<PageSection variant={PageSectionVariants.light}>
        <Toolbar>
          <ToolbarContent style={{ paddingLeft: 0 }}>
            <TextContent>
              <Text component={TextVariants.h1}>
              Let's define Function Variables
</Text>
<Text component={TextVariants.p}>

            Here's what our system found for you! You bet. This is the best with
            all 3 parameters combined!<br/>
            Try to fiddle around with the function variables, each of them have a weight from 0 - 100 which can be modified.
</Text>
            </TextContent> 
          </ToolbarContent>
        </Toolbar>
        </PageSection>   
    <Wizard navAriaLabel={`${title} steps`} mainAriaLabel={`${title} content`} steps={steps}  />
     </>
    )
}

export {ExperimentDetails};