import React, { useState, useEffect } from "react";
import {
  Slider,
  Text,
  Form,
  FormGroup,
  TextInput,
  FormSelect,
  FormSelectOption,
  Radio,
  TextVariants,
  TextContent
} from "@patternfly/react-core";
import { Link } from "react-router-dom";
import PencilAltIcon from '@patternfly/react-icons/dist/esm/icons/pencil-alt-icon';
import SaveIcon from "@patternfly/react-icons/dist/esm/icons/save-icon";

const Response_time_details = (props: { data; setData }) => {

  const [valueContinuous1, setValueContinious1] = useState(props.data["RTweightage"]);
  const [inputValueContinuous1, setInputValueContinuous1] = useState(props.data["RTweightage"]);
  const [query, setQuery] = useState(props.data["RTquery"]);
  const [valueType, setValueType] = useState(props.data["RTvaluetype"]);
  const [option, setOption] = useState(props.data["RTdatasource"]);
  const [operatorOption, setOperatorOption] = useState(props.data["RToperator"]);
  const [editing, setEditing] = useState(false);
  const [equation, setEquation] = useState(props.data["RTequation"])

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
    sessionStorage.setItem("Response Time Slider Value", newValue);
  };
  const handleQueryChange = (query: string) => {
    setQuery(query);
  };
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RTquery: query })
  }, [query])
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RTvaluetype: valueType })
  }, [valueType])
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RTdatasource: option })
  }, [option])
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RToperator: operatorOption })
  }, [operatorOption])
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RTequation: equation })
  }, [equation])

  const handelEquationChange = (equation: string) => {
    setEquation(equation)
  }
  const handleOperatorChange = (operatorOption: string) => {
    setOperatorOption(operatorOption)
  }
  const handelValueTypeChange = (valueType: string) => {
    setValueType(valueType);
  }
  const handleOptionChange = (value: string, _event: React.FormEvent<HTMLSelectElement>) => {
    setOption(value);
  };
  const valueOptions = [
    { value: 'double', label: 'double', disabled: false },
    { value: 'float', label: 'float' }
  ]
  const options = [
    { value: 'prometheus', label: 'prometheus', disabled: false },
    { value: 'B', label: 'B', disabled: false },
    { value: 'C', label: 'C', disabled: false },
  ];
  const operatorOptions = [
    { value: 'none', label: 'none', disabled: false },
    { value: 'log', label: 'log', disabled: false },
    { value: 'square', label: 'square', disabled: false },
    { value: 'square root', label: 'square root', disabled: false },

  ]
  return (

    <Form isWidthLimited onSubmit={(e) => {
      e.preventDefault();
    }}>
      <TextContent>
        <Text component={TextVariants.h3}>
          Function Variable :  Response Time
        </Text>
      </TextContent>
      <div className="pf-u-text-align-right" style={{ justifyContent: 'right' }}>
        {editing ? (<button
          className="pf-c-button pf-m-plain "
          type="button"

          id="inline-edit-toggle-example-edit-button"
          aria-label="Edit"
          onClick={() => setEditing(false)}
          aria-labelledby="inline-edit-toggle-example-edit-button inline-edit-toggle-example-label"
        > <SaveIcon color="blue" /> &nbsp;
          Save
        </button>)
          :
          (<button
            className="pf-c-button pf-m-plain "
            type="button"
            id="inline-edit-toggle-example-edit-button"
            aria-label="Edit"
            onClick={() => setEditing(true)}
            aria-labelledby="inline-edit-toggle-example-edit-button inline-edit-toggle-example-label"
          > <PencilAltIcon color="blue" /> &nbsp;
            Edit
          </button>)}
      </div>
      <TextInput id="equation change" value={equation} onChange={handelEquationChange} type="text" isDisabled aria-label="readonly input example" />
      <FormGroup
        label="Weightage"
        isRequired
        fieldId="horizontal-form-name"
      >
        <Slider
          value={valueContinuous1}
          isInputVisible
          inputValue={inputValueContinuous1}
          inputLabel="%"
          onChange={onChangeContinuous1}
          isDisabled={!editing}
        />
      </FormGroup>
      <FormGroup
        label="Operator"
        isRequired
        fieldId="horizontal-form-name"
      >
        <FormSelect
          aria-label="operator options"
          value={operatorOption}
          onChange={handleOperatorChange}
          isDisabled={!editing}
        >
          {operatorOptions.map((option, index) => (
            <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
          ))}
        </FormSelect>
      </FormGroup>

      <FormGroup label="Query" isRequired fieldId="horizontal-form-email">
        <TextInput
          value={query}
          isRequired
          aria-label="query response time"
          name="horizontal-form-query"
          onChange={handleQueryChange}
          isDisabled={!editing}
        />
      </FormGroup>

      <FormGroup label="Data source" fieldId="horizontal-form-title">
        <FormSelect
          aria-label="data source"
          value={option}
          onChange={handleOptionChange}
          isDisabled={!editing}
        >
          {options.map((option, index) => (
            <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
          ))}
        </FormSelect>
      </FormGroup>

      <FormGroup label="Value Type" fieldId="horizontal-form-title">
        <FormSelect
          aria-label="value type res"
          value={valueType}
          onChange={handelValueTypeChange}
          isDisabled={!editing}
        >
          {valueOptions.map((option, index) => (
            <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
          ))}
        </FormSelect>
      </FormGroup>


      <FormGroup role="radiogroup" isStack fieldId="horizontal-form-radio-group" hasNoPaddingTop label="Direction"  >
        <Radio name="horizontal-inline-radio" label="Maximize" id="horizontal-inline-radio-01" isDisabled={!editing} />
        <Radio name="horizontal-inline-radio" label="Minimize" id="horizontal-inline-radio-02" isChecked isDisabled={!editing} />
      </FormGroup>

    </Form>
  )
};
export { Response_time_details };
