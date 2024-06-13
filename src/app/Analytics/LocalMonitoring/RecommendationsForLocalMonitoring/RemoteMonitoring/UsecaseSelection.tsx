import {
  Flex,
  TextContent,
  TextVariants,
  FormSelect,
  FormSelectOption,
  Button,
  Text,
  Grid,
  GridItem,
  Alert
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import { generateRecommendationsURL, getListExperimentsURL, getRecommendationsURLWithParams } from '@app/CentralConfig';

const UsecaseSelection = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata; switchTab }) => {
  const list_recommendations_url: string = getRecommendationsURLWithParams(props.SREdata.experiment_name, 'false');
  const list_experiment_url: string = getListExperimentsURL();

  const [value, setValue] = useState('');
  const [expName, setExpName] = useState<any | null>('');
  const [expData, setExpData] = useState([]);
  const [showFailureAlert, setShowFailureAlert] = useState(false);

  const fetchData = async () => {
    const response = await fetch(list_experiment_url);
    const data = await response.json();
    const arr: any = ['Select Experiment Name'];

    data.map((element, index) => {
      arr.push(element.experiment_name);
    });
    setExpData(arr.sort());
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onChangeExpName = (value: string) => {
    setValue(value);
    setExpName(value);

    props.setSREdata({ ...{ ...props.SREdata }, experiment_name: value });
    sessionStorage.setItem('Experiment Name', value);
  };

  const handleClick = async () => {
    try {
      props.switchTab(1);
      const data = await (await fetch(list_recommendations_url)).json();
      var namespace = data[0].kubernetes_objects[0].namespace;
      var name = data[0].kubernetes_objects[0].name;
      var type = data[0].kubernetes_objects[0].type;
      var cluster_name = data[0].cluster_name;
      var container_name = data[0].kubernetes_objects[0].containers[0].container_name;

      var endtime: any[] = [];
      endtime = [...Object.keys(data[0].kubernetes_objects[0].containers[0].recommendations.data).sort().reverse()];

      props.setEndTimeArray(endtime);

      var containerArray: any[] = [];
      for (var i = 0; i < data[0].kubernetes_objects[0].containers.length; i++) {
        containerArray.push(data[0].kubernetes_objects[0].containers[i].container_name);
      }

      props.setSREdata({
        ...{ ...props.SREdata },
        containerArray: containerArray,
        namespace: namespace,
        name: name,
        type: type,
        cluster_name: cluster_name,
        container_name: container_name
      });
    } catch (err) {
      console.log('processing');
    }
  };

  const handleGenerateRecommendationClick = async (expName) => {
    try {
      const response = await fetch(generateRecommendationsURL(expName), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
        // body: JSON.stringify(parsedPayload)
      });

      // console.log(response)
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setShowFailureAlert(false);
        setTimeout(() => setShowFailureAlert(false), 3000);
        handleClick();
      }
    } catch (error) {
      console.error('Error during data import:', error);
      setShowFailureAlert(true);
    }
  };
  return (
    <>
      <br />
      {showFailureAlert && <Alert variant="warning" title="Unable to Generate Recommendations" ouiaId="FailureAlert" />}

      <Flex direction={{ default: 'column' }}>
        <Grid hasGutter component="ul">
          <TextContent>
            <Text component={TextVariants.h3}>Experiment Name</Text>
          </TextContent>
          <GridItem span={4} component="li">
            <FormSelect
              value={expName}
              onChange={(_event, value: string) => onChangeExpName(value)}
              aria-label="FormSelect Input"
            >
              {expData != null &&
                expData.map((option, index) => <FormSelectOption key={index} value={option} label={option} />)}
            </FormSelect>
          </GridItem>
          <GridItem span={10}></GridItem>
          <GridItem span={3} component="li">
            <Button variant="primary" onClick={() => handleGenerateRecommendationClick(expName)}>
              Generate Recommendations
            </Button>
          </GridItem>
          {/* <GridItem span={3} component="li">
            <Button variant="primary" onClick={handleClick}>
              Get Recommendations
            </Button>
          </GridItem> */}
        </Grid>
      </Flex>
    </>
  );
};

export { UsecaseSelection };
