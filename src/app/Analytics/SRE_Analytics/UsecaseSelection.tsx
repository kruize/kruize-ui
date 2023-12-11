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
  TextInput,
  ValidatedOptions,
  List,
  ListItem,
  HelperText,
  HelperTextItem,
  Form,
  FormGroup,
  FormHelperText,
  Pagination
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import {
  getListExperimentsURLWithParams,
  getRecommendationsURL,
  getRecommendationsURLWithParams
} from '@app/CentralConfig';

const UsecaseSelection = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata; switchTab }) => {
  // const list_recommendations_url: string = getRecommendationsURLWithParams(props.SREdata.experiment_name, 'false');


  const [usecase, setUsecase] = useState('Select one');
  const [nestedUsecase, setNestedUsecase] = useState('Select nested');
  const [expName, setExpName] = useState<any | null>('');
  const [expData, setExpData] = useState([]);
  const [validationStatus, setValidationStatus] = useState(ValidatedOptions.default);
  const [validationMessage, setValidationMessage] = useState('');
const[clickedExpName, setClickedExpName] = useState<any | null>('');

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // const list_recommendations_url: string = getRecommendationsURLWithParams(clickedExpName, 'false');

  const list_experiments_url: string = getListExperimentsURLWithParams(props.SREdata.experiment_name);

  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);
  const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
    setPage(newPage);
  };

  const onPerPageSelect = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent,
    newPerPage: number,
    newPage: number
  ) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };
  const startIndex = (page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, expData.length);

  // Get the items to display on the current page
  const visibleItems = expData.slice(startIndex, endIndex);

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
    // fetchData();
  };

  // const onChangeExpName = (value: string) => {
  //   setValue(value);
  //   setExpName(value);

  // };

  const handleInputChange = (_event, value) => {
    setExpName(value);
    props.setSREdata({ ...{ ...props.SREdata }, experiment_name: value });


    const isValid = /^[a-zA-Z0-9_*-|]+$/.test(value);

    if (value.length > 3) {
      // Validate the input length
      if (isValid) {
        setValidationStatus(ValidatedOptions.default);
        setValidationMessage('')
      } else {
        setValidationStatus(ValidatedOptions.error);
        setValidationMessage("Invalid character detected. Only letters, numbers, and '*' are allowed")
      }
    } else {
      // Special character detected
      setValidationStatus(ValidatedOptions.error);
      setValidationMessage("Input must be more than 3 characters")

    }
  };

  const fetchData = async () => {
   try{ const response = await fetch(list_experiments_url);
    const data = await response.json();
    setExpData(data.experimentNames)
    setIsButtonClicked(true);
    // const arr: any = ['Select Experiment Name'];

    // data.map((element, index) => {
    //   arr.push(element.experiment_name);
    // });
    // setExpData(arr.sort());
   }
   catch {
    console.log("exp name unavaliable")
   }
  };

  const handleClick = async (experiment_name : string) => {
    try {
      setClickedExpName(experiment_name)
  
  props.setSREdata({ ...{ ...props.SREdata }, experiment_name: experiment_name });
  sessionStorage.setItem('Experiment Name', experiment_name);
  const list_recommendations_url: string =  getRecommendationsURLWithParams(experiment_name, 'false')
       props.switchTab(1);
      const data = await (await fetch(list_recommendations_url)).json();
      console.log(data)
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
        <Form>
      <FormGroup
       label="Usecase Selection"
        isRequired
        fieldId="simple-form-name-01"

        >
          <FormSelect
              value={usecase}
              onChange={(_event, value: string) => onChange(value)}
              aria-label="FormSelect Input"
            >
              {options.map((option, index) => (
                <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
              ))}
            </FormSelect>
          </FormGroup>
          
        {/* <Grid hasGutter component="ul">
          <GridItem span={3} component="li"> */}
            {/* <FormSelect
              value={usecase}
              onChange={(_event, value: string) => onChange(value)}
              aria-label="FormSelect Input"
            >
              {options.map((option, index) => (
                <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
              ))}
            </FormSelect> */}
          {/* </GridItem> */}
          {/* <GridItem span={3}></GridItem> */}
          {/* <GridItem span={3} component="li"> */}
            {usecase === 'Monitoring' && (
              <FormSelect
                value={nestedUsecase}
                onChange={(_event, value: string) => onNestedChange(value)}
                aria-label="FormSelect Input"
              >
                {options2.map((option, index) => (
                  <FormSelectOption key={index} value={option.value} label={option.label} />
                ))}
              </FormSelect>
            )}
          {/* </GridItem> */}
          {usecase === 'Monitoring' && nestedUsecase === 'Remote' && (
            <>
              {/* <TextContent>
                <Text component={TextVariants.h3}>Experiment Name</Text>
              </TextContent> */}

              <FormGroup
       label="Experiment name"
        isRequired
        fieldId="simple-form-name-02"

        >
              {/* <GridItem span={4} component="li"> */}
                <TextInput
                  isRequired
                  value={expName}
                  validated={validationStatus}
                  type="text"
                  onChange={handleInputChange}
                  aria-label="text input example"
                /> <FormHelperText>
                <HelperText>
                  <HelperTextItem>Input must be more than 3 characters</HelperTextItem>
                </HelperText>
              </FormHelperText>
              </FormGroup>
                {/* {validationStatus === ValidatedOptions.error && (
                  <HelperText>
                  <HelperTextItem variant="error">
                  {validationMessage}
                  </HelperTextItem>
                </HelperText>  
                         
                )} */}
                {/* <FormSelect
                  value={expName}
                  onChange={(_event, value: string) => onChangeExpName(value)}
                  aria-label="FormSelect Input"
                >
                  {expData != null &&
                    expData.map((option, index) => <FormSelectOption key={index} value={option} label={option} />)}
                </FormSelect> */}
              {/* </GridItem> */}
              </>
              )}
{/* <GridItem span={10}></GridItem> */}
              {expName &&            
              // <GridItem span={3} component="li">
                <Button variant="primary" onClick={fetchData}>
                  Get Experiments
                </Button>

              // </GridItem>
              
}{console.log(props.SREdata.experiment_name)}
              {/* <GridItem> */}

                  {isButtonClicked &&   expName &&     
                  <>
                { visibleItems.map((experiment_name, index) => <Button key={index} variant="link" isInline onClick={() => handleClick(experiment_name)}>
                  {experiment_name}
                </Button> )}
                <Pagination
                    itemCount={expData.length}
                    perPage={perPage}
                    page={page}
                    onSetPage={onSetPage}
                    widgetId="top-example"
                    onPerPageSelect={onPerPageSelect}
                    ouiaId="PaginationTop"
                  />
                  </>}
              {/* </GridItem>
              <GridItem span={10}></GridItem>
              <GridItem span={3} component="li"> */}
                {/* <Button variant="primary" onClick={handleClick}>
                  Get Recommendations
                </Button> */}
              {/* </GridItem> */}
              
              </Form>
          
        {/* </Grid> */}
      </Flex>
    </>
  );
};

export { UsecaseSelection };
