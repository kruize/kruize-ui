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
import RE from "./RE";
import { ExperimentStatus } from "@app/ExperimentStatus/ExperimentStatus";
import { ExperimentDetails } from "@app/ExperimentStatus/MoreExperimentStuff/ExperimentDetails";
import { CodeEditorWithActions } from "@app/GenerateYaml/CodeEditorWithActions";

const RunExperiment: React.FunctionComponent = () => {
    const steps = [
      { name: 'Experiment', component: <RE/> },
      { name: 'Experiment Status', component: <ExperimentStatus/> },
      { name: 'Adding Details', component: <ExperimentDetails/> },
      { name: 'YAML Generation', component: <CodeEditorWithActions/> ,nextButtonText: 'Finish' },
      // { name: 'Review', component: <p>Review step content</p>,  }
    ];
    const title = 'Basic wizard';
    
    return (   <Wizard navAriaLabel={`${title} steps`} mainAriaLabel={`${title} content`} steps={steps}  />
   
   )
};

export {RunExperiment};