import nodeContext from '@app/ContextStore/nodeContext';
import { Flex, TextContent, TextVariants, FormSelect, FormSelectOption, TextInput, Button, Text, Grid, GridItem, TimePicker } from '@patternfly/react-core';
import React, { useContext, useState } from 'react'

const UsecaseSelection = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata; chartData; setChartData}) => {

  const Context = useContext(nodeContext);
  const ip = Context['cluster'];
  const port = Context['autotune'];
  let k_url: string;

  if (ip) {
    k_url = ip + ':' + port;
  } else {
    k_url = 'kruize';
  }

  const list_recommendations_url = 'http://' + k_url + '/listRecommendations?experiment_name=' + props.SREdata.experiment_name + '&latest=false';
  const list_experiment_url = 'http://' + k_url + '/listExperiments';
  const list_experiments_url_for_charts = 'http://' + k_url + '/listExperiments?results=true&recommendations=true&latest=false&experiment_name=' + sessionStorage.getItem('Experiment Name');

  const [usecase, setUsecase] = useState('Select one');
  const [nestedUsecase, setNestedUsecase] = useState('Select nested');
  const [value, setValue] = useState('');
  const [expName, setExpName] = useState<any | null>('');
  const [expData, setExpData] = useState([]);


  const fetchData = async () => {
    const response = await fetch(list_experiment_url);
    const data = await response.json();
    const arr: any = ['Select Experiment Name'];
    //  console.log(data)
    data.map((element, index) => {
      // console.log(element.experiment_name)
      arr.push(element.experiment_name)
    })
    setExpData(arr.sort())
    // console.log(111 , arr.sort());
  };

  const options = [
    { id: "1", value: 'please choose', label: 'Select one', disabled: false },
    { id: "2", value: 'Monitoring', label: 'Monitoring', disabled: false },
    // { id: "3", value: 'Autotune', label: 'Autotune', disabled: false },
  ]

  const options2 = [
    { id: "1", value: 'please choose', label: 'Select one' },
    { id: "2", optionsid: "2", value: 'Remote', label: 'Remote' },
    { id: "3", optionsid: "2", value: 'Local', label: 'Local' },

  ]
  const onChange = (value: string) => {
    setUsecase(value)
  };

  const onNestedChange = (value: string) => {
    setNestedUsecase(value)
    fetchData()
  }

  const onChangeExpName = (value: string) => {
    setValue(value)
    setExpName(value)

    props.setSREdata({ ...{ ...props.SREdata }, experiment_name: value })
    sessionStorage.setItem('Experiment Name', value);

  };

  const handleClick = async () => {

    try {
      if (ip != 'undefined' && port != 'undefined') {
        // for api 1
        const data = await (await fetch(list_recommendations_url)).json()
        var namespace = data[0].kubernetes_objects[0].namespace
        var name = data[0].kubernetes_objects[0].name
        var type = data[0].kubernetes_objects[0].type

        var endtime: any[] = [];
        endtime = ['Select End Time', ...Object.keys(data[0].kubernetes_objects[0].containers[0].recommendations.data).sort()];

        props.setEndTimeArray(endtime)

        var containerArray: any[] = [];
        for (var i = 0; i < data[0].kubernetes_objects[0].containers.length; i++) {
          containerArray.push(data[0].kubernetes_objects[0].containers[i].container_name)
        }
        props.setSREdata({ ...{ ...props.SREdata }, containerArray: containerArray, namespace: namespace, name: name, type: type });
        
        // for api 2
        const response = await fetch(list_experiments_url_for_charts);
        const data2 = await response.json();

        let timestamp: any = [];
        timestamp = Object.keys(data2[0].kubernetes_objects[0].containers['tfb-server-1'].results);
        timestamp.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

        let chartTimestamp;
        chartTimestamp = timestamp.slice(0,8)
// console.log(chartTimestamp)
        // const dataArray = Object.entries(data);

        let timeMetrics = Object.entries(data2[0].kubernetes_objects[0].containers['tfb-server-1'].results);
        // console.log(timeMetrics)
       
        timeMetrics.sort((a,b) =>  new Date(b[0]).getTime() - new Date (a[0]).getTime());

        // console.log(ab)
        // let ab = timeMetrics.sort((a, b) => new Date(b) - new Date(a));
        let chartMetrics = timeMetrics.slice(0,8)
        // const intervalEndTimes = chartMetrics.map(([_, { aggregation_info }]) => aggregation_info )
        console.log(chartMetrics)

   
  interface MetricsData {
  interval_end_time: string;
  metrics: Record<string, { avg: number | null; max: number | null }>;
}

const metricsData: MetricsData[] = [];

chartMetrics.forEach(([_, data]) => {
  const { interval_end_time, metrics } = data;
  const metricsObj: Record<string, { avg: number | null; max: number | null }> = {};

  Object.entries(metrics).forEach(([metricName, metricData]) => {
    const metric = metricData as Record<string, { avg: number | null; max: number | null }>;

    if (metric && metric.aggregation_info) {
      const aggregationInfo = metric.aggregation_info as { avg: number | null; max: number | null };

      if (aggregationInfo.avg != null && aggregationInfo.max != null) {
        const avg = aggregationInfo.avg;
        const max = aggregationInfo.max;
        metricsObj[metricName] = { avg, max };
      }
    }
  });

  metricsData.push({ interval_end_time, metrics: metricsObj });
});

console.log(metricsData);
    props.setChartData({ ...{ ...props.chartData }, chartMetrics: metricsData})
     
         }
    }
    catch (err) {
      console.log("err")
    }
  }

  return (
    <>
      <br />
      <Flex direction={{ default: 'column' }}>
        <TextContent>
          <Text component={TextVariants.h3}>UseCase Selection</Text>
        </TextContent>
        <Grid hasGutter component='ul'>
          <GridItem span={3} component='li'>
            <FormSelect value={usecase} onChange={onChange} aria-label="FormSelect Input">
              {options.map((option, index) => (
                <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
              ))}
            </FormSelect>
          </GridItem>
          <GridItem span={3}></GridItem>
          <GridItem span={3} component='li'>
            {
              usecase === "Monitoring" ?
                <FormSelect value={nestedUsecase} onChange={onNestedChange} aria-label="FormSelect Input">
                  {options2.map((option, index) => (
                    <FormSelectOption key={index} value={option.value} label={option.label} />
                  ))}
                </FormSelect>
                :
                <></>
            }
          </GridItem>
          {
            usecase === "Monitoring" && nestedUsecase === "Remote" ?
              <>
                {/* <TextContent>
                  <Text component={TextVariants.h3}>Container Selection</Text>
                </TextContent>
                <FormGroup label="Cluster Name" isRequired fieldId="simple-form-email-01">
                  <FormSelect value={clusteName} onChange={onClusterNameChange} aria-label="FormSelect Input">
                    {options3.map((option, index) => (
                      <FormSelectOption key={index} value={option.value} label={option.label} />
                    ))}
                  </FormSelect>
                </FormGroup>
                <FormGroup label="Namespace" isRequired fieldId="simple-form-email-01">
                  <AnalyticsNamespace />
  
                </FormGroup> */}
                <TextContent>
                  <Text component={TextVariants.h3} >Experiment Name</Text>
                </TextContent>
                <GridItem span={4} component='li'>
                  <FormSelect value={expName} onChange={onChangeExpName} aria-label="FormSelect Input">
                    {expData != null ? expData.map((option, index) => (
                      <FormSelectOption key={index} value={option} label={option} />
                    ))
                      :
                      <></>}
                  </FormSelect>
                </GridItem>
                <GridItem span={10}></GridItem>
                <GridItem span={3} component='li'>
                  <Button variant="primary" onClick={handleClick} >Get Recommendations</Button>
                </GridItem>
              </> : <></>
          }
        </Grid>
      </Flex>
    </>
  );
};


export { UsecaseSelection }
