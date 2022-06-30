import React, { useState } from "react";
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
  const [valueContinuous, setValueContinious] = useState(50);
  const [inputValueContinuous, setInputValueContinuous] = useState(50);

  const onChangeContinuous = (value, inputValue, setLocalInputValue) => {
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
    setInputValueContinuous(newValue);
    setValueContinious(newValue);
  };
  const [valueContinuous2, setValueContinious2] = useState(50);
  const [inputValueContinuous2, setInputValueContinuous2] = useState(50);
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
  };
  const [valueContinuous3, setValueContinious3] = useState(50);
  const [inputValueContinuous3, setInputValueContinuous3] = useState(50);
  const onChangeContinuous3 = (value, inputValue, setLocalInputValue) => {
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
    setInputValueContinuous3(newValue);
    setValueContinious3(newValue);
  };

  return (
    <PageSection className="pf-u-font-family-redhatVF-sans-serif">
      <Card>
        <Grid>
          <GridItem span={4}></GridItem>
          <GridItem span={4} rowSpan={2}>
            <Title headingLevel="h1" size="lg">
              Let's defne peformance objectives
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
              Advaced Settings
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
                value={valueContinuous}
                isInputVisible
                inputValue={inputValueContinuous}
                inputLabel="%"
                onChange={onChangeContinuous}
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
              <Button variant="secondary"> Let's get going! </Button>
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
