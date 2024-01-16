import {
  Flex,
  TextContent,
  TextVariants,
  FormSelect,
  FormSelectOption,
  Button,
  Text,
  Grid,
  GridItem
} from '@patternfly/react-core';
import React, { useState } from 'react';
import { getListExperimentsURL, getRecommendationsURL, getRecommendationsURLWithParams } from '@app/CentralConfig';

const UsecaseSelection = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata; switchTab }) => {
  const list_recommendations_url: string = getRecommendationsURLWithParams(props.SREdata.experiment_name, 'false');
  const list_experiment_url: string = getListExperimentsURL();

  const [usecase, setUsecase] = useState('Select one');
  const [nestedUsecase, setNestedUsecase] = useState('Select nested');
  const [value, setValue] = useState('');
  const [expName, setExpName] = useState<any | null>('');
  const [expData, setExpData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(list_experiment_url);
    const data = await response.json();
    const arr: any = ['Select Experiment Name'];

    data.map((element, index) => {
      arr.push(element.experiment_name);
    });
    setExpData(arr.sort());
  };

  const options = [
    { id: '1', value: 'please choose', label: 'Select one', disabled: false },
    { id: '2', value: 'Monitoring', label: 'Monitoring', disabled: false }
    // { id: "3", value: 'Autotune', label: 'Autotune', disabled: false },
  ];

  const options2 = [
    { id: '1', value: 'please choose', label: 'Select one' },
    { id: '2', optionsid: '2', value: 'Remote', label: 'Remote' }
    //{ id: '3', optionsid: '2', value: 'Local', label: 'Local' }
  ];
  const onChange = (value: string) => {
    setUsecase(value);
  };

  const onNestedChange = (value: string) => {
    setNestedUsecase(value);
    fetchData();
  };

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

  return (
    <>
      <br />
      <Flex direction={{ default: 'column' }}>
        <TextContent>
          <Text component={TextVariants.h3}>UseCase Selection</Text>
        </TextContent>
        <Grid hasGutter component="ul">
          <GridItem span={3} component="li">
            <FormSelect
              id="usecase-selection"
              value={usecase}
              onChange={(_event, value: string) => onChange(value)}
              aria-label="FormSelect Input"
            >
              {options.map((option, index) => (
                <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
              ))}
            </FormSelect>
          </GridItem>
          <GridItem span={3}></GridItem>
          <GridItem span={3} component="li">
            {usecase === 'Monitoring' && (
              <FormSelect
                id="local-or-remote"
                value={nestedUsecase}
                onChange={(_event, value: string) => onNestedChange(value)}
                aria-label="FormSelect Input"
              >
                {options2.map((option, index) => (
                  <FormSelectOption key={index} value={option.value} label={option.label} />
                ))}
              </FormSelect>
            )}
          </GridItem>
          {usecase === 'Monitoring' && nestedUsecase === 'Remote' && (
            <>
              <TextContent>
                <Text component={TextVariants.h3}>Experiment Name</Text>
              </TextContent>
              <GridItem span={4} component="li">
                <FormSelect
                  id="exp-name-select"
                  value={expName}
                  onChange={(_event, value: string) => onChangeExpName(value)}
                  aria-label="FormSelect Input"
                >
                  {expData != null &&
                    expData.map((option, index) => (
                      <FormSelectOption id="exp_name_option" key={index} value={option} label={option} />
                    ))}
                </FormSelect>
              </GridItem>
              {expName && (
                <>
                  <GridItem span={10}></GridItem>
                  <GridItem span={3} component="li">
                    <Button id="get-recommendations" variant="primary" onClick={handleClick}>
                      Get Recommendations
                    </Button>
                  </GridItem>
                </>
              )}
            </>
          )}
        </Grid>
      </Flex>
    </>
  );
};

export { UsecaseSelection };
