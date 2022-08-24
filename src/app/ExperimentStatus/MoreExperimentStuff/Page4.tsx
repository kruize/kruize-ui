import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  PageSection,
  Slider,
  Title,
  Text,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  TextInput,
  TextArea,
  FormSelect,
  FormSelectOption,
  Checkbox,
  ActionGroup,
  Radio,
  TextVariants,
  TextContent
} from "@patternfly/react-core";
import { Link } from "react-router-dom";
const ResourceUsage = {
  weightage : 67,
  operator : 'square',
  query : "---",
  datasource : 'Prometheus',
  valuetype : "double",
  direction : "maximize"
};
const Page4: React.FunctionComponent = () => {
  
  const [valueContinuous1, setValueContinious1] = useState(ResourceUsage.weightage);
  const [inputValueContinuous1, setInputValueContinuous1] = useState(ResourceUsage.weightage);
  const [query, setQuery] = React.useState(ResourceUsage.query);
  const [valueType, setValueType] = React.useState(ResourceUsage.valuetype);
  const [option, setOption] = React.useState('');
  const onChangeContinuous1 = (value, inputValue, setLocalInputValue) => {
    let newValue;
    if (inputValue === undefined) {
      newValue = Math.floor(value);
    } else {
      if (inputValue > 100) {
        newValue = 100;
        setLocalInputValue(100);
      } else if (inputValue < 0) {
        newValue = 0;
        setLocalInputValue(0);
      } else {
        newValue = Math.floor(inputValue);
      }
    }
    setInputValueContinuous1(newValue);
    setValueContinious1(newValue);
    sessionStorage.setItem("Resource Usage Slider Value", newValue);
  };
  const handleQueryChange = (query: string) => {
    setQuery(query);
  };

  // const handleExperienceChange = (experience: string) => {
  //   setExperience(experience);
  // };
const handelValueTypeChange = (valueType : string )=> {
  setValueType(valueType);
}
  const handleOptionChange = (value: string, _event: React.FormEvent<HTMLSelectElement>) => {
    setOption(value);
  };
const valueOptions = [
  { value : ResourceUsage.valuetype, label : ResourceUsage.valuetype, disabled: false },
  { value : 'float', label : 'float'}
]
  const options = [
    // { value: 'select one', label: 'Select one', disabled: false },
    { value: ResourceUsage.datasource, label: ResourceUsage.datasource, disabled: false },
    { value: 'B', label: 'B', disabled: false },
    { value: 'C', label: 'C', disabled: false },
  ];
  const [value, setValue] = React.useState('None');
  const ref = React.useRef(null);
  
  return (
    
        <Form  isWidthLimited onSubmit={(e) => {
          e.preventDefault();
        }}>
         <TextContent>
           <Text component={TextVariants.h3}>
           Function Variable :  Resource Usage
           </Text>
         </TextContent>  
          <TextInput value="Equation : Weightage * [ Operator * Resource Usage ]" type="text" isReadOnly aria-label="readonly input example" />
              <FormGroup
                label="Weightage"
                isRequired
                fieldId="horizontal-form-name"
              //helperText="Include your middle name if you have one."
              >
              <Slider
                value={valueContinuous1}
                isInputVisible
                inputValue={inputValueContinuous1}
                inputLabel="%"
                onChange={onChangeContinuous1}
              />
         </FormGroup>
              <FormGroup
                label="Operator"
                isRequired
                fieldId="horizontal-form-name"
              //helperText="Include your middle name if you have one."
              >
                <TextInput
                 ref={ref}
                 value={value}
                 onChange={value => setValue(ResourceUsage.operator)}
                  aria-label="None"
                />
              </FormGroup>
           
              <FormGroup label="Query" isRequired fieldId="horizontal-form-email">
                <TextInput
                  value={query}
                  isRequired
                  name="horizontal-form-query"
                  onChange={handleQueryChange}
                />
              </FormGroup>
            
              <FormGroup label="Data source" fieldId="horizontal-form-title">
                <FormSelect
                  value={option}
                  onChange={handleOptionChange}
                >
                  {options.map((option, index) => (
                    <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
                  ))}
                </FormSelect>
              </FormGroup>
           
              <FormGroup label="Value Type" fieldId="horizontal-form-title">
                <FormSelect
                  value={valueType}
                  onChange={handelValueTypeChange}
               >
                  {valueOptions.map((option, index) => (
                    <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
                  ))}
                </FormSelect>
              </FormGroup>
           

          <FormGroup role="radiogroup" isStack fieldId="horizontal-form-radio-group" hasNoPaddingTop label="Direction">
            <Radio name="horizontal-inline-radio" label="Maximize" id="horizontal-inline-radio-01"  />
            <Radio name="horizontal-inline-radio" label="Minimize" id="horizontal-inline-radio-02" isChecked/>
          </FormGroup>
          
        </Form>
  )
};
export { Page4 };
