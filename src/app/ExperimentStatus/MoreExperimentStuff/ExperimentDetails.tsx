import React, { useState, useEffect } from "react";
import {
  PageSection,
  Text,
  Wizard,
  Toolbar,
  PageSectionVariants,
  TextContent,
  TextVariants,
  Tile,
  ToolbarContent,
} from "@patternfly/react-core";
import { Final_equation } from "./Final_equation";
import { Throughput_details } from "./Throughput_details";
import { Link } from "react-router-dom";
import { Response_time_details } from "./Response_time_details";
import { Resource_usage_details } from "./Resource_usage_details";

const ExperimentDetails = (props: { setData; data }) => {
  const [finish, setFinish] = useState();
  const steps = [
    { name: 'Throughput', component: <Throughput_details data={props.data} setData={props.setData} /> },
    { name: 'Response Time', component: <Response_time_details data={props.data} setData={props.setData} /> },
    { name: 'Resource Usage', component: <Resource_usage_details data={props.data} setData={props.setData} /> },
    { name: 'Final Equation', component: <Final_equation data={props.data} setData={props.setData} />, hideClose: true }
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
                all 3 parameters combined!<br />
                Try to fiddle around with the function variables, each of them have a weight from 0 - 100 which can be modified.
              </Text>
            </TextContent>
          </ToolbarContent>
        </Toolbar>
      </PageSection>
      <Wizard navAriaLabel={`${title} steps`} mainAriaLabel={`${title} content`} steps={steps} />
    </>
  )
}

export { ExperimentDetails };
