import nodeContext from '@app/ContextStore/nodeContext';
import { Flex, TextContent, TextVariants, FormSelect, FormSelectOption, TextInput, Button, Text } from '@patternfly/react-core';
import React, { useContext, useState } from 'react'

const UsecaseSelection = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata }) => {

  const Context = useContext(nodeContext);
  const ip = Context['cluster'];
  const port = Context['autotune'];
  const list_recommendations_url = 'http://' + ip + ':' + port + '/listRecommendations?experiment_name=' + props.SREdata.experiment_name + '&latest=false';
  const [usecase, setUsecase] = useState('Select one');
  const [nestedUsecase, setNestedUsecase] = useState('Select nested');
  const [clusteName, setClusterName] = useState('Select cluster');
  const [value, setValue] = useState('');


  const options = [
    { id: "1", value: 'please choose', label: 'Select one', disabled: false },
    { id: "2", value: 'Monitoring', label: 'Monitoring', disabled: false },
    { id: "3", value: 'Autotune', label: 'Autotune', disabled: false },
  ]

  const options2 = [
    { id: "1", value: 'please choose', label: 'Select one' },
    { id: "2", optionsid: "2", value: 'Remote', label: 'Remote' },
    { id: "3", optionsid: "2", value: 'Local', label: 'Local' },

  ]

  const options3 = [
    { id: "1", value: 'please choose', label: 'Select one' },
    { id: "2", value: "cluster-one-division-bell", label: "cluster-one-division-bell" }
  ]


  const onChange = (value: string) => {
    setUsecase(value)

  };

  const onNestedChange = (value: string) => {
    setNestedUsecase(value)
  }

  // const onClusterNameChange = (value: string) => {
  //   setClusterName(value)
  // }


  const onChangeExpName = (value: string) => {
    setValue(value)
    props.setSREdata({ ...{ ...props.SREdata }, experiment_name: value })
    sessionStorage.setItem('Experiment Name', value);
  };

  const handleClick = async () => {

    try {
      if (ip != 'undefined' && port != 'undefined') {
        const data = await (await fetch(list_recommendations_url)).json()
        var endtime: any[] = [];
        endtime = Object.keys(data[0].kubernetes_objects[0].containers[0].recommendations.data).sort();

        props.setEndTimeArray(endtime)

        var containerArray: any[] = [];
        for (var i = 0; i < data[0].kubernetes_objects[0].containers.length; i++) {
          containerArray.push(data[0].kubernetes_objects[0].containers[i].container_name)
        }

        props.setSREdata({ ...{ ...props.SREdata }, containerArray: containerArray })
        //console.log(1, containerArray)
        //  console.log(12, props.SREdata.containerArray)  
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
              <TextInput value={value} type="text" onChange={onChangeExpName} aria-label="text input example" />
              <Button variant="primary" onClick={handleClick} >Get Recommendations</Button>

            </> : <></>
        }
      </Flex>
    </>
  );
};


export { UsecaseSelection }