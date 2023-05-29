import nodeContext from '@app/ContextStore/nodeContext';
import { Flex, TextContent, TextVariants, FormSelect, FormSelectOption, TextInput, Button, Text } from '@patternfly/react-core';
import React, { useContext, useState } from 'react'

const UsecaseSelection = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata }) => {

  const Context = useContext(nodeContext);
  const ip = Context['cluster'];
  const port = Context['autotune'];
  const list_recommendations_url = 'http://' + ip + ':' + port + '/listRecommendations?experiment_name=' + props.SREdata.experiment_name + '&latest=false';
  const list_experiment_url = 'http://' + ip + ':' + port + '/listExperiments';
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
        const data = await (await fetch(list_recommendations_url)).json()


        var namespace = data[0].kubernetes_objects[0].namespace
        var name = data[0].kubernetes_objects[0].name
        var type = data[0].kubernetes_objects[0].type
    
        var endtime: any[] = [];
        endtime = ['Select End Time' , ...Object.keys(data[0].kubernetes_objects[0].containers[0].recommendations.data).sort()];

        props.setEndTimeArray(endtime)

        var containerArray: any[] = [];
        for (var i = 0; i < data[0].kubernetes_objects[0].containers.length; i++) {
          containerArray.push(data[0].kubernetes_objects[0].containers[i].container_name)
        }

        props.setSREdata({ ...{ ...props.SREdata }, containerArray: containerArray,  namespace: namespace, name: name, type: type  })
   
      }
    }
    catch (err) {
      console.log('processing')
    }
  }

  return (
    <>
      <br />
      <Flex direction={{ default: 'column' }}>
        <TextContent>
          <Text component={TextVariants.h3}>UseCase Selection</Text>
        </TextContent>

        <FormSelect value={usecase} onChange={onChange} aria-label="FormSelect Input">
          {options.map((option, index) => (
            <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
          ))}
        </FormSelect>
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
              <FormSelect value={expName} onChange={onChangeExpName} aria-label="FormSelect Input">
            {expData != null ? expData.map((option, index) => (
              <FormSelectOption key={index} value={option} label={option} />
            ))

              :
              <></>}

          </FormSelect>
              <Button variant="primary" onClick={handleClick} >Get Recommendations</Button>

            </> : <></>
        }
      </Flex>
    </>
  );
};


export { UsecaseSelection }