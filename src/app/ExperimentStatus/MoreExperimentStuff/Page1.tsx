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
  Form,
  FormSection,
  FormGroup,
} from "@patternfly/react-core"
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";
import { Link } from "react-router-dom";

const Page1: React.FunctionComponent = () => {

  const [valueContinuous1, setValueContinious1] = useState(0);
  const [inputValueContinuous1, setInputValueContinuous1] = useState(0);
  const [valueContinuous2, setValueContinious2] = useState(0);
  const [inputValueContinuous2, setInputValueContinuous2] = useState(0);
  const [valueContinuous3, setValueContinious3] = useState(0);
  const [inputValueContinuous3, setInputValueContinuous3] = useState(0);

  const onChangeContinuous1 = (value, inputValue, setLocalInputValue) => {
    let newValue;
    if (inputValue === undefined) {
      newValue = Math.floor(value);
    } else {
      if (inputValue > 100) {
        newValue = 100;
        setLocalInputValue(100);
      } else if (inputValue < 0) {
        newValue = 0;
        setLocalInputValue(0);
      } else {
        newValue = Math.floor(inputValue);
      }
    }
    setInputValueContinuous1(newValue);
    setValueContinious1(newValue);
    sessionStorage.setItem("Throughput Slider Value", newValue);
  };
  
  const onChangeContinuous2 = (value, inputValue, setLocalInputValue) => {
    let newValue;
    if (inputValue === undefined) {
      newValue = Math.floor(value);
    } else {
      if (inputValue > 100) {
        newValue = 100;
        setLocalInputValue(100);
      } else if (inputValue < 0) {
        newValue = 0;
        setLocalInputValue(0);
      } else {
        newValue = Math.floor(inputValue);
      }
    }
    setInputValueContinuous2(newValue);
    setValueContinious2(newValue);
    sessionStorage.setItem("Response Time Slider Value", newValue);
  };
  
  const onChangeContinuous3 = (value, inputValue, setLocalInputValue) => {
    let newValue ;
    if (inputValue === undefined) {
      newValue = Math.floor(value);
    } else {
      if (inputValue > 100) {
        newValue = 100;
        setLocalInputValue(100);
      } else if (inputValue < 0) {
        newValue = 0;
        setLocalInputValue(0);
      } else {
        newValue = Math.floor(inputValue);
      }
    }
    setInputValueContinuous3(newValue);
    setValueContinious3(newValue);
    sessionStorage.setItem("Resource Usage Slider Value", newValue);  
  };
  useEffect(() => {
    setInputValueContinuous1(JSON.parse(sessionStorage.getItem("Throughput Slider Value")  || '0'));
    setValueContinious1(JSON.parse(sessionStorage.getItem("Throughput Slider Value")  || '0'));
    setInputValueContinuous2(JSON.parse(sessionStorage.getItem("Response Time Slider Value") || '0'));
    setValueContinious2(JSON.parse(sessionStorage.getItem("Response Time Slider Value") || '0'));
    setInputValueContinuous3(JSON.parse(sessionStorage.getItem("Resource Usage Slider Value") || '0'));
    setValueContinious3(JSON.parse(sessionStorage.getItem("Resource Usage Slider Value") || '0'));
  },[])

// useEffect(() => {
//   const Throughput = JSON.parse(sessionStorage.getItem("Throughput Slider Value") || '{}');
//   const ResponseTime = JSON.parse(sessionStorage.getItem("Response Time Slider Value") || '{}');
//   const ResourceUsage = JSON.parse(sessionStorage.getItem("Resource Usage Slider Value") || '{}');
//   if(Throughput){
//     console.debug("inorder to work fine")
//   }
//   else if(Throughput)
//   {
//     setInputValueContinuous1(Throughput);
//     setValueContinious1(Throughput);
//   } 
//   else if (ResponseTime)
//   {
//     setInputValueContinuous2(ResponseTime);
//     setValueContinious2(ResponseTime);
//   }
//   else if (ResourceUsage)
//   {
//     setInputValueContinuous3(ResourceUsage);
//     setValueContinious3(ResourceUsage);
//   }
// }, [])
    
    
  
  return (
          <Form  isWidthLimited onSubmit={(e) => {
            e.preventDefault();
          }}>
<FormGroup label="Throughput" labelIcon={
              <Link
                to={{
                  pathname:
                    "https://www.solarwinds.com/resources/it-glossary/network-metrics#:~:text=Throughput%3A%20Throughput%20is,via%20the%20network.",
                }}
                target="_blank"
              >
                {<ExternalLinkAltIcon />}
              </Link>}>

              <Slider
                value={valueContinuous1}
                isInputVisible
                inputValue={inputValueContinuous1}
                inputLabel="%"
                onChange={onChangeContinuous1}
              />
</FormGroup>

         
             
            <FormGroup>

            Response Time
              <Link
                to={{
                  pathname:
                    "https://raygun.com/blog/server-performance-metrics/#:~:text=Metric%203%3A%20Average,on%20the%20list.",
                }}
                target="_blank"
              >
                {<ExternalLinkAltIcon />}
              </Link>

              <Slider
                value={valueContinuous2}
                isInputVisible
                inputValue={inputValueContinuous2}
                inputLabel="%"
                onChange={onChangeContinuous2}
              />
            </FormGroup>
    
           <FormGroup>
           Resource Usage
              <Link
                to={{
                  pathname:
                    "https://thedigitalprojectmanager.com/resource-utilization-metrics/#:~:text=This%20is%20a,member%20utilization%20rate",
                }}
                target="_blank"
              >
                {<ExternalLinkAltIcon />}
              </Link>
              <Slider
                value={valueContinuous3}
                isInputVisible
                inputValue={inputValueContinuous3}
                inputLabel="%"
                onChange={onChangeContinuous3}
              />
           </FormGroup>
              
            
{/*             
              <Link to="/generate_yaml">
              <Button variant="secondary"> Let's get going! </Button>
              </Link>
            </GridItem>
            <GridItem span={3}>
              <Button variant="secondary"> Reset fields </Button> */}
              </Form>

  );
};

export { Page1 };
