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
  
  ToolbarContent,
} from "@patternfly/react-core";
import { Page1 } from "./Page1";
import { Page2 } from "./Page2";
import { Link } from "react-router-dom";

const ExperimentDetails: React.FunctionComponent = () => {
    const steps = [
      { name: 'First step', component: <Page1/> },
      { name: 'Second step', component: <Page2/> },
      { name: 'Third step', component: <p>Step 3 content</p> },
      { name: 'Fourth step', component: <p>Step 4 content</p> },
      { name: 'Review', component: <p>Review step content</p>, nextButtonText: 'Finish' }
    ];
    const title = 'Basic wizard';
    
    return ( 
      <>
<PageSection variant={PageSectionVariants.light}>
        {/* <DataContainerBreadcrumb currentPage="Create a cache" /> */}
        <Toolbar id="create-cache-header">
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