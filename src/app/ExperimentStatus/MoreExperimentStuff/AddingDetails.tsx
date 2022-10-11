import React, { useState } from "react";
import {
  PageSection,
  Title,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  TreeView,
  PageSectionVariants,
  Text,
  Toolbar,
  TextVariants,
  ToolbarContent,
  TextContent,
  FormGroup,
  TextInput

} from "@patternfly/react-core";

const AddingDetails = (props: { setData, data }) => {

  const equation = 90
  // math.fraction(props.data.netThroughput , math.multiply(props.data.netResourceUsage, props.data.netResponseTime))
  return (

    <><h1>Adding Details </h1>
      <h2>Net Equation Formed</h2>
      <TextInput id="equation text" value={equation} type="text" isReadOnly aria-label="readonly input example" />
      <FormGroup
        label="Weightage"
        isRequired
        fieldId="horizontal-form-name"
      >
      </FormGroup>

    </>
  )
}
export { AddingDetails };