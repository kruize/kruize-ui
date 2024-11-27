import {
  TextContent,
  TextVariants,
  Flex,
  Alert,
  AlertGroup,
  FlexItem,
  FormSelect,
  FormSelectOption,
  Text,
  Split,
  SplitItem,
  Stack,
  StackItem,
  CardHeader,
  CardBody,
  Card,
  PageSection,
  PageSectionVariants
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import { getRecommendationsURL, getRecommendationsURLWithParams } from '@app/CentralConfig';
import { TabSection } from './RecommendationComponents/TabSection';
import { WorkloadDetails } from './RecommendationComponents/WorkloadDetails';
import { InfoCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from '@patternfly/react-icons';

export const alertIconMap = {
  info: <InfoCircleIcon style={{ color: '#2B9AF3' }} />,
  warning: <ExclamationTriangleIcon style={{ color: '#F0AB00' }} />,
  error: <ExclamationCircleIcon style={{ color: '#C9190B' }} />,
  critical: <ExclamationCircleIcon style={{ color: '#C9190B' }} />
};
interface Notification {
  type: string;
  message: string;
}
const RecommendationTables = (props: {
  endTimeArray;
  setEndTimeArray;
  SREdata;
  setSREdata;
  notification;
  setNotification;
}) => {
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
  const [boxPlotTranslatedData, setBoxPlotTranslatedData] = useState<{ cpu: any[]; mmr: any[] }>({
    cpu: [],
    mmr: []
  });
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


  const processBoxPlotData = (boxPlotArr: any[]) => {
    if (!boxPlotArr || boxPlotArr.length === 0) {
      return [];
    }

    const timestamps = Object.keys(boxPlotArr[0]);
    const cpuDetails = Object.values(boxPlotArr[0]).map((item: any) => item.cpuUsage);
    const mmrDetails = Object.values(boxPlotArr[0]).map((item: any) => item.memoryUsage);

    return [
      {
        name: 'cpu',
        x: timestamps,
        y: cpuDetails
      },
      {
        name: 'mmr',
        x: timestamps,
        y: mmrDetails
      }
    ];
  };

  const transformData = (containerData: any, dataKey: 'y', name: string): any[] => {
    if (!containerData || !Array.isArray(containerData[dataKey])) {
      console.error(`Data for key '${dataKey}' is undefined or not an array.`);
      return [];
    }

    const timestamps = containerData.x;
    // const dataPoints = containerData[dataKey].map((data: any) => [data.min, data.q1, data.median, data.q3, data.max]);
    const dataPoints = containerData[dataKey].map((data: any) => {
      if (
        data &&
        typeof data.min !== 'undefined' &&
        typeof data.q1 !== 'undefined' &&
        typeof data.median !== 'undefined' &&
        typeof data.q3 !== 'undefined' &&
        typeof data.max !== 'undefined'
      ) {
        return [data.min, data.q1, data.median, data.q3, data.max];
      } else {
        console.warn('Data is missing required properties:', data);
        return [null, null, null, null, null];
      }
    });

    return timestamps.map((time: any, index: number) => ({
      name: name,
      x: time,
      y: dataPoints[index]
    }));
  };
  console.log('boxp lot dat', boxPlotTranslatedData);

  useEffect(() => {
    const fetchData = async () => {
      if (endtime && day) {
        const response = await fetch(list_recommendations_url);
        const result = await response.json();
        const boxPlot_arr: any = [];
        const recommended_arr: any = [];
        const current_arr: any = [];
        const chartDetailsObject = [];

        // Notifications
        var endTimeNotifications: any = [];
        // we can ignore displying this notification for now
        var termNotifications: any = [];

        if (props.SREdata.experiment_type == "container") {
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
          result[0].kubernetes_objects[0].containers[0].recommendations.data[endtime]?.recommendation_terms[day]?.plots?.plots_data;
          if (boxPlotData) {
            boxPlot_arr.push(boxPlotData);
          }
          console.log(boxPlotData);

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

              if (key === endtime) {
                break;
              }
            }
          });

          // notifications 
          endTimeNotifications = result[0].kubernetes_objects[0].containers[0].recommendations.data[endtime].notifications || [];
          termNotifications = result[0].kubernetes_objects[0].containers[0].recommendations.data[endtime].recommendation_terms[day].notifications || [];

        } else if (props.SREdata.experiment_type == "namespace") {
            // current data 
            const currentDat = result[0].kubernetes_objects[0].namespaces.recommendations?.data[endtime]?.current;
            if (currentDat) {
              current_arr.push(currentDat);
            }

            // recommendation data
            const recommendationDataNewAPI = result[0].kubernetes_objects[0].namespaces.recommendations.data[endtime]?.recommendation_terms[day];
            if (recommendationDataNewAPI) {
              recommended_arr.push(recommendationDataNewAPI);
            }

            // all data before a particular time stamp
            const allRecommData = result[0].kubernetes_objects[0].namespaces.recommendations.data;
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

              if (key === endtime) {
                break;
              }
            }

            // notifications 
            endTimeNotifications = result[0].kubernetes_objects[0].namespaces.recommendations.data[endtime].notifications || [];
            termNotifications = result[0].kubernetes_objects[0].namespaces.recommendations.data[endtime].recommendation_terms[day].notifications || [];
        }
      
        
        if (recommended_arr[0]?.recommendation_engines && props.SREdata.experiment_type == "container") {
          setDisplayChart(true);
        } else {
          setDisplayChart(false);
        }
        setCurrentData(current_arr);
        setRecommendedData(recommended_arr);
        setChartDetailsData(chartDetailsObject);

        // Processing box plot data

        const chartData = processBoxPlotData(boxPlot_arr);
        const [cpuData, mmrData] = chartData;

        const cpuTranslatedData = transformData(cpuData, 'y', 'cpu');
        const mmrTranslatedData = transformData(mmrData, 'y', 'mmr');

        setBoxPlotTranslatedData({
          cpu: cpuTranslatedData,
          mmr: mmrTranslatedData
        });



        const mergedNotifications = { ...props.notification.level1, ...endTimeNotifications };
        const entries = Object.entries(mergedNotifications) as [string, Notification][];

        const infoNotifications = entries.filter(([key, notification]) => notification?.type === 'info');
        const otherNotifications = entries.filter(([key, notification]) => notification?.type !== 'info');
        const infNotifications = Object.fromEntries(infoNotifications);
        const othNotifications = Object.fromEntries(otherNotifications);

        console.log(infNotifications);

        props.setNotification({
          level2: { info: infNotifications, others: othNotifications },
          level3: termNotifications
        });
      }
    };
    fetchData();
  }, [endtime, day]);

  const [filteredDays, setFilteredDays] = useState(days);
  useEffect(() => {
    const { notification } = props;

    if (notification && typeof notification === 'object') {
        const level2 = notification.level2;
        if (level2 && level2.info) {
            const notificationKeys = Object.keys(level2.info);
            const updatedDays = days.filter(day => {
                if (day.value === 'short_term') return notificationKeys.some(key => level2.info[key].message.includes('Short Term'));
                if (day.value === 'medium_term') return notificationKeys.some(key => level2.info[key].message.includes('Medium Term'));
                if (day.value === 'long_term') return notificationKeys.some(key => level2.info[key].message.includes('Long Term'));
                return false;
            });
            setFilteredDays(updatedDays);
        }
    }
  }, [props.notification]);

  const onChange = async (value: string) => {
    setEndtime(value);
  };

  const onDayChange = (value: string) => {
    setDay(value);
  };

  const isDataPresent = !props.notification.level1?.hasOwnProperty('120001');

  const renderNotifications = (notifications: any) => (
    <AlertGroup>
      {Object.keys(notifications || {}).map((key) => {
        const notification = notifications[key];
        const alertType = notification.type || 'info';
        const Icon = alertIconMap[alertType];

        return (
          <div key={notification.code} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {Icon}
            <span style={{ marginLeft: '8px', color: 'black', fontWeight: 'normal' }}>
              {notification.message}
            </span>
          </div>
        );
      })}
    </AlertGroup>
  );


  return (
    <>
    <PageSection variant={PageSectionVariants.light}>
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
        {isDataPresent && ( 
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
                    {filteredDays.map((selection, index) => (
                      <FormSelectOption key={index} value={selection.value} label={selection.label} />
                    ))}
                  </FormSelect>
                </SplitItem>
              </Split>
            </FlexItem>
          </Flex>
          )}
          <Card style={{ width: '800px' }}>
            {!isDataPresent && (
              <Flex>
                <FlexItem spacer={{ default: 'spacer3xl' }}>
                {props.notification.level1 && renderNotifications(props.notification.level1)}
                </FlexItem>
              </Flex>
            )} 
            <Flex>
              <FlexItem spacer={{ default: 'spacer3xl' }}>
              {props.notification.level2 && renderNotifications(props.notification.level2.info)}
              </FlexItem>
              <FlexItem>
              {props.notification.level2 && renderNotifications(props.notification.level2.others)}
              </FlexItem>
            </Flex>
          </Card>
          </Stack>
          </StackItem>
          </Stack>

          </PageSection>
          <StackItem>
            {isDataPresent && (
              <TabSection
                recommendedData={recommendedData}
                currentData={currentData}
                chartData={chartDetailsData}
                day={day}
                endtime={endtime}
                displayChart={displayChart}
                boxPlotData={boxPlotTranslatedData}
              />
            )}        
          </StackItem>
    </>
  );
};

export { RecommendationTables };
