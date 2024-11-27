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
  FlexItem,
  AlertGroup,
  Level
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import {
  generateRecommendationsURL,
  getListExperimentsURL,
  getListExperimentsURLWithParams,
  getRecommendationsURLWithParams
} from '@app/CentralConfig';
import { SyncAltIcon } from '@patternfly/react-icons';


const ExperimentSelection = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata; setDisplayRecc; notification; setNotification }) => {

  const list_experiment_url: string = getListExperimentsURL();
  const [value, setValue] = useState('');
  const [expName, setExpName] = useState<any | null>('');
  const [expData, setExpData] = useState([]);
  const [showFailureAlert, setShowFailureAlert] = useState<boolean>();
  const [showReccSuccessAlert, setShowReccSuccessAlert] = useState<boolean>();

  const alertVariantMap = {
    info: 'info',
    warning: 'warning',
    error: 'danger',
    critical: 'danger',
  };
  
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
    setValue('');
    setExpName('');
    props.setSREdata({
      experiment_name: '',
      containerArray: [],
      namespace: '',
      name: '',
      type: '',
      cluster_name: '',
      container_name: '',
      experiment_type: ''
    });
    props.setEndTimeArray([]);
    props.setDisplayRecc(false);

    setValue(value);
    setExpName(value);

    props.setSREdata({ ...{ ...props.SREdata }, experiment_name: value });
    sessionStorage.setItem('Experiment Name', value);
    const response = await fetch(getListExperimentsURLWithParams(value));
    const data = await response.json();
    handleClick(value);
  };

  const handleClick = async (exp_name_value) => {
    try {

      const list_recommendations_url: string = getRecommendationsURLWithParams(exp_name_value, 'false');
      const data = await (await fetch(list_recommendations_url)).json();
      var namespace = data[0].kubernetes_objects[0].namespace;
      var name = data[0].kubernetes_objects[0].name;
      var type = data[0].kubernetes_objects[0].type;
      var cluster_name = data[0].cluster_name;
      var container_name = data[0].kubernetes_objects[0].containers[0].container_name;
      var experiment_type = data[0].experiment_type || 'container';
      var endtime: any[] = [];
      endtime = [...Object.keys(data[0].kubernetes_objects[0].containers[0].recommendations.data).sort().reverse()];

      props.setEndTimeArray(endtime);
    
      const initialNotifications = data[0].kubernetes_objects[0].containers[0].recommendations.notifications || [];

      props.setNotification({
        level1: initialNotifications
      });
      const has111000 = initialNotifications.hasOwnProperty('111000');
      const has120001 = initialNotifications.hasOwnProperty('120001');
      props.setDisplayRecc(has111000 || has120001);

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
        experiment_type: experiment_type
      });
    }
      catch {
        console.log("Execution incompleted.");
      }
  };

  const handleGenerateRecommendationClick = async (expName) => {
    try {
      const response = await fetch(generateRecommendationsURL(expName), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setShowReccSuccessAlert(true);
        setTimeout(() => setShowReccSuccessAlert(false), 3000);
        handleClick(expName);
      }
    } catch (error) {
      console.error('Error during data import:', error);
      setShowFailureAlert(true);
      setTimeout(() => setShowFailureAlert(false), 3000);
    }
  };
  return (
    <>
      <br />
      {showFailureAlert &&
        <Alert variant="warning" title="Unable to Generate Reccommendations" ouiaId="FailureAlert" /> }
        {
          showReccSuccessAlert &&
        <Alert variant="success" title="Generating Reccommendations" />
      }
      <Flex direction={{ default: 'column' }}>
        <Grid hasGutter component="ul">
          <TextContent>
            <Text component={TextVariants.h3}>Experiment Name</Text>
          </TextContent>
          <GridItem component="li">
            <Flex>
              <FlexItem>
                <FormSelect
                  label="Select an experiment"
                  value={expName}
                  onChange={(_event, value: string) => onChangeExpName(value)}
                  aria-label="FormSelect Input"
                >
                  {expData != null &&
                    expData.map((option, index) => <FormSelectOption key={index} value={option} label={option} />)}
                </FormSelect>
              </FlexItem>
              <FlexItem>
                <Tooltip id="tooltip-ref1" content={<div> Generate Recommendations</div>}>
                  <SyncAltIcon onClick={() => handleGenerateRecommendationClick(expName)} />
                </Tooltip>
              </FlexItem>
            </Flex>
          </GridItem>
          <GridItem span={3} component="li">
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

export { ExperimentSelection };
