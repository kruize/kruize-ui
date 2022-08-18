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

const Page2: React.FunctionComponent = () => {
  const [valueContinuous1, setValueContinious1] = useState(0);
  const [inputValueContinuous1, setInputValueContinuous1] = useState(0);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [experience, setExperience] = React.useState('');
  const [option, setOption] = React.useState('please choose');
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
    sessionStorage.setItem("Throughput Slider Value", newValue);
  };
  const handleNameChange = (name: string) => {
    setName(name);
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handleExperienceChange = (experience: string) => {
    setExperience(experience);
  };

  const handleOptionChange = (value: string, _event: React.FormEvent<HTMLSelectElement>) => {
    setOption(value);
  };

  const options = [
    { value: 'select one', label: 'Select one', disabled: false },
    { value: 'A', label: 'A', disabled: false },
    { value: 'B', label: 'B', disabled: false },
    { value: 'C', label: 'C', disabled: false },
    // { value: 'ms', label: 'Ms', disabled: false },
    // { value: 'dr', label: 'Dr', disabled: false },
    // { value: 'other', label: 'Other', disabled: false }
  ];
  const [value, setValue] = React.useState('None');
  const ref = React.useRef(null);

  return (
    
        <Form  isWidthLimited onSubmit={(e) => {
          e.preventDefault();
        }}>
         <TextContent>
           <Text component={TextVariants.h3}>
           Function Variable :  Throughput
           </Text>
         </TextContent>  
          <TextInput value="Equation : Weightage * [ Operator * Throughput ]" type="text" isReadOnly aria-label="readonly input example" />
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
                 onChange={value => setValue(value)}
                  aria-label="None"
                />
              </FormGroup>
           
              <FormGroup label="Query" isRequired fieldId="horizontal-form-email">
                <TextInput
                  value={email}
                  isRequired
                  type="email"
                  id="horizontal-form-email"
                  name="horizontal-form-email"
                  onChange={handleEmailChange}
                />
              </FormGroup>
            
              <FormGroup label="Data source" fieldId="horizontal-form-title">
                <FormSelect
                  value={option}
                  onChange={handleOptionChange}
                  id="horizontal-form-title"
                  name="horizontal-form-title"
                  aria-label="Your title"
                >
                  {options.map((option, index) => (
                    <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
                  ))}
                </FormSelect>
              </FormGroup>
           
              <FormGroup label="Value Type" fieldId="horizontal-form-title">
                <FormSelect
                  value={option}
                  onChange={handleOptionChange}
                  id="horizontal-form-title"
                  name="horizontal-form-title"
                  aria-label="Your title"
                >
                  {options.map((option, index) => (
                    <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
                  ))}
                </FormSelect>
              </FormGroup>
           

          <FormGroup role="radiogroup" isStack fieldId="horizontal-form-radio-group" hasNoPaddingTop label="Direction">
            <Radio name="horizontal-inline-radio" label="Maximize" id="horizontal-inline-radio-01" />
            <Radio name="horizontal-inline-radio" label="Minimize" id="horizontal-inline-radio-02" />
          </FormGroup>
          
        </Form>
  )
};
export { Page2 };