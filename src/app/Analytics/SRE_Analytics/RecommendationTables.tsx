import {
  TextContent,
  TextVariants,
  Flex,
  FlexItem,
  FormSelect,
  FormSelectOption,
  Text,
  Split,
  SplitItem,
  Stack,
  StackItem
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import { getRecommendationsURL, getRecommendationsURLWithParams } from '@app/CentralConfig';
import { WorkloadDetails } from './ReccomendationComponents/WorkloadDetails';
import { TabSection } from './ReccomendationComponents/TabSection';

const RecommendationTables = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata }) => {
  // @ts-ignore
  const list_recommendations_url: string = getRecommendationsURLWithParams(
    sessionStorage.getItem('Experiment Name') || '',
    'false'
  );

  const [endtime, setEndtime] = useState<any | null>('');
  const [currentData, setCurrentData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [day, setDay] = useState('short_term');

  const days = [
    { id: '1', value: 'short_term', label: 'Last 1 day', disabled: false },
    { id: '2', value: 'medium_term', label: 'Last 7 days', disabled: false },
    { id: '3', value: 'long_term', label: 'Last 15 days', disabled: false }
  ];

  useEffect(() => {
    if (props.endTimeArray) {
      setEndtime(props.endTimeArray[0]);
    }
  }, [props.endTimeArray]);

  useEffect(() => {
    const fetchData = async () => {
      if (endtime && day) {
        const response = await fetch(list_recommendations_url);
        const result = await response.json();
        const recommended_arr: any = [];
        const current_arr: any = [];

        // const currentDat = result[0].kubernetes_objects[0].containers[0].recommendations?.data[endtime]?.current;
        // current_arr.push(currentDat);
        // console.log()
        result[0].kubernetes_objects[0].containers.map((container, index) => {
          const currentDat = container.recommendations?.data[endtime]?.current;

          if (currentDat) {
            current_arr.push(currentDat);
          }
        });

        result[0].kubernetes_objects[0].containers.map((container, index) => {
          const recommendationDataNewAPI = container.recommendations.data[endtime]?.recommendation_terms[day];
          if (recommendationDataNewAPI) {
            recommended_arr.push(recommendationDataNewAPI);
          }
        });

        setCurrentData(current_arr);
        setRecommendedData(recommended_arr);
      }
    };

    fetchData();
  }, [endtime, day, props.SREdata.experiment_name]);

  const onChange = async (value: string) => {
    setEndtime(value);
  };

  const onDayChange = (value: string) => {
    setDay(value);
  };

  return (
    <Stack hasGutter>
      <StackItem>
        <WorkloadDetails
          experimentData={{
            experiment_name: props.SREdata.experiment_name,
            namespace: props.SREdata.namespace,
            name: props.SREdata.name,
            type: props.SREdata.type,
            cluster_name: props.SREdata.cluster_name,
            container_name: props.SREdata.container_name
          }}
        />
      </StackItem>
      <StackItem>
        <Stack hasGutter>
          <Flex className="example-border">
            <Flex>
              <FlexItem>
                <Split hasGutter>
                  <SplitItem>
                    <TextContent>
                      <Text component={TextVariants.p}>Monitoring End Time</Text>
                    </TextContent>
                  </SplitItem>

                  <SplitItem>
                    <FormSelect value={endtime} onChange={onChange} aria-label="FormSelect Input">
                      {props.endTimeArray &&
                        props.endTimeArray.map((option, index) => (
                          <FormSelectOption key={index} value={option} label={option} />
                        ))}
                    </FormSelect>
                  </SplitItem>
                </Split>
              </FlexItem>
            </Flex>
            <FlexItem>
              <Split hasGutter>
                <SplitItem>
                  <TextContent>
                    <Text component={TextVariants.p}>View optimization based on </Text>
                  </TextContent>
                </SplitItem>

                <SplitItem>
                  <FormSelect value={day} onChange={onDayChange} aria-label="days dropdown">
                    {days.map((selection, index) => (
                      <FormSelectOption key={index} value={selection.value} label={selection.label} />
                    ))}
                  </FormSelect>
                </SplitItem>
              </Split>
            </FlexItem>
          </Flex>
          <StackItem>
            <TabSection recommendedData={recommendedData} currentData={currentData} />
          </StackItem>
        </Stack>
      </StackItem>
    </Stack>

  );
};

export { RecommendationTables };
