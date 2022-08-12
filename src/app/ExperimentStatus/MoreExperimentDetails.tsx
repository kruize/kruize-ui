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
} from "@patternfly/react-core";
import InfoCircleIcon from "@patternfly/react-icons/dist/esm/icons/info-circle-icon";
import { Link } from "react-router-dom";

const MoreExperimentDetails: React.FunctionComponent = () => {
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
    <PageSection className="pf-u-font-family-redhatVF-sans-serif">
      <Card>
        <Grid>
          <GridItem span={4}></GridItem>
          <GridItem span={4} rowSpan={2}>
            <Title headingLevel="h1" size="lg">
              Let's define peformance objectives
            </Title>
          </GridItem>
          <GridItem span={4}></GridItem>

          <Text>
            <br />
            Here's what our system found for you! You bet. This is the best with
            all 3 parameters combined!
          </Text>
          <Text>
            <GridItem span={4}></GridItem>
            Want to fiddle around with the parameters? Click here for{" "}
            <Link
              to="/advanceduser/objectivefunction"
              className="btn btn-primary"
            >
              Advanced Settings
            </Link>
          </Text>
        </Grid>
      </Card>
      <Card>
        <CardBody>
          <Grid>
            <GridItem>
              Throughput
              <Link
                to={{
                  pathname:
                    "https://www.solarwinds.com/resources/it-glossary/network-metrics#:~:text=Throughput%3A%20Throughput%20is,via%20the%20network.",
                }}
                target="_blank"
              >
                {<InfoCircleIcon />}
              </Link>
            </GridItem>

            <GridItem span={2}></GridItem>
            <GridItem span={6}>
              <Slider
                value={valueContinuous1}
                isInputVisible
                inputValue={inputValueContinuous1}
                inputLabel="%"
                onChange={onChangeContinuous1}
              />
            </GridItem>
          </Grid>
        </CardBody>
        <CardBody>
          <Grid>
            <GridItem>
              Response Time
              <Link
                to={{
                  pathname:
                    "https://raygun.com/blog/server-performance-metrics/#:~:text=Metric%203%3A%20Average,on%20the%20list.",
                }}
                target="_blank"
              >
                {<InfoCircleIcon />}
              </Link>
            </GridItem>
            <GridItem span={2}></GridItem>
            <GridItem span={6}>
              <Slider
                value={valueContinuous2}
                isInputVisible
                inputValue={inputValueContinuous2}
                inputLabel="%"
                onChange={onChangeContinuous2}
              />
            </GridItem>
          </Grid>
        </CardBody>
        <CardBody>
          <Grid>
            <GridItem>
              Resource Usage
              <Link
                to={{
                  pathname:
                    "https://thedigitalprojectmanager.com/resource-utilization-metrics/#:~:text=This%20is%20a,member%20utilization%20rate",
                }}
                target="_blank"
              >
                {<InfoCircleIcon />}
              </Link>
            </GridItem>
            <GridItem span={2}></GridItem>
            <GridItem span={6}>
              <Slider
                value={valueContinuous3}
                isInputVisible
                inputValue={inputValueContinuous3}
                inputLabel="%"
                onChange={onChangeContinuous3}
              />
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Grid hasGutter>
            <GridItem span={2}></GridItem>
            <GridItem span={3}>
              <Link to="/generate_yaml">
              <Button variant="secondary"> Let's get going! </Button>
              </Link>
            </GridItem>

            <GridItem span={3}>
              <Button variant="secondary"> Reset fields </Button>
            </GridItem>
            <GridItem></GridItem>
          </Grid>
        </CardBody>
      </Card>
    </PageSection>
  );
};

export { MoreExperimentDetails };
