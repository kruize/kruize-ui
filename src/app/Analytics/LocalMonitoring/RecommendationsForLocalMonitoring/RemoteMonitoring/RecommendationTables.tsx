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
import { TabSection } from './RecommendationComponents/TabSection';
import { WorkloadDetails } from './RecommendationComponents/WorkloadDetails';

const RecommendationTables = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata }) => {
  // @ts-ignore
  const list_recommendations_url: string = getRecommendationsURLWithParams(
    sessionStorage.getItem('Experiment Name') || '',
    'false'
  );

  const [endtime, setEndtime] = useState<any | null>('');
  const [currentData, setCurrentData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [chartDetailsData, setChartDetailsData] = useState([]);
  const [day, setDay] = useState('short_term');
  const [displayChart, setDisplayChart] = useState(true);
  const [boxPlotTranslatedData, setBoxPlotTranslatedData] = useState([]);
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
        const boxPlot_arr: any = [];
        const recommended_arr: any = [];
        const current_arr: any = [];
        const chartDetailsObject = [];

        // current data
        result[0].kubernetes_objects[0].containers.map((container, index) => {
          const currentDat = container.recommendations?.data[endtime]?.current;
          if (currentDat) {
            current_arr.push(currentDat);
          }
        });
        // recommended data
        result[0].kubernetes_objects[0].containers.map((container, index) => {
          const recommendationDataNewAPI = container.recommendations.data[endtime]?.recommendation_terms[day];
          if (recommendationDataNewAPI) {
            recommended_arr.push(recommendationDataNewAPI);
          }
        });
         //box plot data
         const boxPlotData =
         result[0].kubernetes_objects[0].containers[0].recommendations.data[endtime]?.recommendation_terms[day]?.plots
           ?.plots_data;
       if (boxPlotData) {
         boxPlot_arr.push(boxPlotData);
       }

        // all data before a particular time stamp
        result[0].kubernetes_objects[0].containers.map((container, index) => {
          const allRecommData = container.recommendations.data;
          const endTimeSortedKeys = Object.keys(allRecommData).sort();

          for (const key of endTimeSortedKeys) {
            chartDetailsObject[key] = allRecommData[key];
            if (key === endtime) {
              break;
            }
          }
          JSON.stringify(chartDetailsObject);
          for (const key in chartDetailsObject) {
            const value = chartDetailsObject[key];
            // console.log(`${key}`, value);

            if (key === endtime) {
              break;
            }
          }
        });
        if (recommended_arr[0]?.recommendation_engines) {
          // console.log('render ', recommended_arr);
          setDisplayChart(true);
        } else {
          setDisplayChart(false);
        }
        setCurrentData(current_arr);
        setRecommendedData(recommended_arr);
        setChartDetailsData(chartDetailsObject);
          // setBoxPlotData(boxPlot_arr);

          const chartData = Object.keys(boxPlot_arr).map((key) => {
            if (boxPlot_arr && boxPlot_arr[0]) {
              const timestamps = Object.keys(boxPlot_arr[0]);
              const cpuDetails = Object.values(boxPlot_arr[0]).map((key) => key.cpuUsage);
  
              return {
                name: 'cpu',
                x: timestamps,
                y: cpuDetails
              };
            } else return 0;
          });
  
          // console.log(chartData);
          const transformedData =
            chartData &&
            chartData.map((containerData) => {
              const timestamps = containerData.x;
              const yData = containerData.y.map((data) => [data.min, data.q1, data.median, data.q3, data.max]);
  
              return {
                name: 'cpu',
                x: timestamps,
                y: yData
              };
            });
  
            // for box plots data points
          if (transformedData && transformedData.length > 0) {
            const { name, x, y } = transformedData[0];
  
            const translatedData = x.map((time, index) => ({
              name: name,
              x: time,
              y: y[index]
            }));
            setBoxPlotTranslatedData(translatedData);
          } else {
            console.log('currentData is empty or not structured as expected.');
          }
  
          // for the limits & request line data points
          if (transformedData && transformedData.length > 0) {
            const { name, x, y } = transformedData[0];
  
            const translatedData = x.map((time, index) => ({
              name: name,
              x: time,
              y: recommended_arr[0]?.recommendation_engines?.cost?.config?.limits?.cpu.amount
            }));
            console.log(translatedData)
          } else {
            console.log('currentData is empty or not structured as expected.');
          }
      }
    }
      fetchData();
    }, [endtime, day]);

  const onChange = async (value: string) => {
    setEndtime(value);
  };

  const onDayChange = (value: string) => {
    setDay(value);
  };

  return (
    <Stack hasGutter>
      <StackItem>
        <br />
        <WorkloadDetails
          experimentData={{
            experiment_name: props.SREdata.experiment_name,
            namespace: props.SREdata.namespace,
            name: props.SREdata.name,
            type: props.SREdata.type,
            cluster_name: props.SREdata.cluster_name,
            container_name: props.SREdata.container_name,
            experiment_type: props.SREdata.experiment_type
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
                    <FormSelect
                      value={endtime}
                      onChange={(_event, value: string) => onChange(value)}
                      aria-label="FormSelect Input"
                      style={{ width: '300px' }}
                    >
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
                  <FormSelect
                    value={day}
                    onChange={(_event, value: string) => onDayChange(value)}
                    aria-label="days dropdown"
                    style={{ width: '150px' }}
                  >
                    {days.map((selection, index) => (
                      <FormSelectOption key={index} value={selection.value} label={selection.label} />
                    ))}
                  </FormSelect>
                </SplitItem>
              </Split>
            </FlexItem>
          </Flex>
          <StackItem>
            <TabSection
              recommendedData={recommendedData}
              currentData={currentData}
              chartData={chartDetailsData}
              day={day}
              endtime={endtime}
              displayChart={displayChart}
              boxPlotData={boxPlotTranslatedData}
            />
          </StackItem>
        </Stack>
      </StackItem>
    </Stack>
  );
};

export { RecommendationTables };
