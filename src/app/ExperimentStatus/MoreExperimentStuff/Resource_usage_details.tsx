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
import { Expression, Equation, toTex } from 'algebra.js';
import { Link } from "react-router-dom";
import PencilAltIcon from '@patternfly/react-icons/dist/esm/icons/pencil-alt-icon';
import SaveIcon from "@patternfly/react-icons/dist/esm/icons/save-icon";
import MathJax from 'react-mathjax';
function Formula(props) {
  return (
    <MathJax.Context input="tex">
      <MathJax.Node inline>{props.tex}</MathJax.Node>
    </MathJax.Context>
  );
}
const Resource_usage_details = (props: { data; setData }) => {
  const [valueContinuous1, setValueContinious1] = useState(props.data["RUweightage"]);
  const [inputValueContinuous1, setInputValueContinuous1] = useState(props.data["RUweightage"]);
  const [query, setQuery] = React.useState(props.data["RUquery"]);
  const [valueType, setValueType] = React.useState(props.data["RUvaluetype"]);
  const [option, setOption] = React.useState(props.data["RUdatasource"]);
  const [operatorOption, setOperatorOption] = React.useState(props.data["RUoperator"]);
  const [editing, setEditing] = useState(false);
  const [direction, setDirection] = useState(true)
  // var power_part = new Expression("resource usage").pow(operatorOption) 
  const equation = "Equation : " + valueContinuous1 + " * [ " + operatorOption + " of (resource usage) ]"
  //   const tex =  'U = 1/(R_(si) + sum_(i=1)^n(s_n/lambda_n) + R_(se))';
  // const eq= <Formula tex={`${valueContinuous1} x ${toTex(tex)}`} />;
  //   const equationn =valueContinuous1+" * "+convert
  // //  const tex=`${toTex(equationn)}`;
  const eq = () => {
    return direction ?
      "Equation : " + valueContinuous1 / 100 + " * [ " + operatorOption + "(resource usage) ]" :
      "Equation : " + valueContinuous1 / 100 + " / [ " + operatorOption + "(resource usage) ]"
  }
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
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RUquery: query })
  }, [query])
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RUvaluetype: valueType })

  }, [valueType])
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RUdatasource: option })

  }, [option])
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RUoperator: operatorOption })

  }, [operatorOption])
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
          Function Variable :  Resource Usage
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
      <TextInput value={eq()} type="text" isDisabled aria-label="readonly input example" />
      {/* {eq} */}
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
          isDisabled={!editing}
        />
      </FormGroup>
      <FormGroup
        label="Operator"
        isRequired
        fieldId="horizontal-form-name"
      //helperText="Include your middle name if you have one."
      >
        <FormSelect
          aria-label="operator resource"
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
          aria-label="query"
          value={query}
          isRequired
          name="horizontal-form-query"
          onChange={handleQueryChange}
          isDisabled={!editing}
        />
      </FormGroup>

      <FormGroup label="Data source" fieldId="horizontal-form-title">
        <FormSelect
          aria-label="data source resource"
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
          aria-label="value type resource"
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
        <Radio name="horizontal-inline-radio" label="Maximize" id="horizontal-inline-radio-01" isChecked={direction} isDisabled={!editing} />
        <Radio name="horizontal-inline-radio" label="Minimize" id="horizontal-inline-radio-02" isChecked={!direction} isDisabled={!editing} />
      </FormGroup>

    </Form>
  )
};
export { Resource_usage_details };
