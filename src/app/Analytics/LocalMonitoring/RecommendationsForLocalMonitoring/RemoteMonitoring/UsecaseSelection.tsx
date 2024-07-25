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
  Alert,
  Tooltip,
  FlexItem
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import {
  generateRecommendationsURL,
  getListExperimentsURL,
  getListExperimentsURLWithParams,
  getRecommendationsURLWithParams
} from '@app/CentralConfig';
import { SyncAltIcon } from '@patternfly/react-icons';

const UsecaseSelection = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata; switchTab }) => {
  const list_recommendations_url: string = getRecommendationsURLWithParams(props.SREdata.experiment_name, 'false');
  const list_experiment_url: string = getListExperimentsURL();

  const [value, setValue] = useState('');
  const [expName, setExpName] = useState<any | null>('');
  const [expUsecaseType, setExpUsecaseType] = useState<string | undefined>('');
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

  const onChangeExpName = async (value: string) => {
    setValue(value);
    setExpName(value);

    props.setSREdata({ ...{ ...props.SREdata }, experiment_name: value });
    sessionStorage.setItem('Experiment Name', value);
    const response = await fetch(getListExperimentsURLWithParams(value));
    const data = await response.json();
    const experimentUsecase = data[0].experiment_usecase_type;
    if (experimentUsecase) {
      const usecase = Object.keys(experimentUsecase).filter((key) => experimentUsecase[key] === true) + " ";
      console.log(usecase);
      setExpUsecaseType(usecase);
    }
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
      // var experiment_type = data[0].kubernetes_objects[0];

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
        container_name: container_name,
        experiment_type: expUsecaseType
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
      // ToDo : add notification check
      // console.log(response)
      const data = await response.json();
      // console.log(data);
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
            <Flex>
              <FlexItem>
              
            <FormSelect
              // value={expName}
              value="Exp name"
              onChange={(_event, value: string) => onChangeExpName(value)}
              aria-label="FormSelect Input"
            >
              {expData != null &&
                expData.map((option, index) => <FormSelectOption key={index} value={option} label={option} />)}
            </FormSelect>
            </FlexItem>
            <FlexItem>

            </FlexItem>
                <FlexItem>
                   <Button variant="primary" onClick={handleClick}>
              Recommendations
            </Button>
                </FlexItem>
            </Flex>
          </GridItem>
          <GridItem span={10}></GridItem>

          <GridItem span={3} component="li">
            {/* <Button variant="primary" onClick={handleClick}>
              Recommendations
            </Button> */}

            <div style={{ marginLeft: '18px', display: 'inline-block' }}>
              <Tooltip id="tooltip-ref1" content={<div>Calls Generate Reccomendations</div>}>
                <SyncAltIcon onClick={() => handleGenerateRecommendationClick(expName)} />
              </Tooltip>
            </div>
            {/* <SyncAltIcon onClick={() => handleGenerateRecommendationClick(expName)} /> */}
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

export { UsecaseSelection };
