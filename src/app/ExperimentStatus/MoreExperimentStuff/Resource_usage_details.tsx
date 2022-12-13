import React, { useState, useEffect } from "react";
import {
  Slider,
  Text,
  Form,
  FormGroup,
  TextInput,
  FormSelect,
  PageSection,
  PageSectionVariants,
  FormSelectOption,
  Radio,
  TextVariants,
  TextContent,
  Grid
} from "@patternfly/react-core";
import { Link } from "react-router-dom";
import PencilAltIcon from '@patternfly/react-icons/dist/esm/icons/pencil-alt-icon';
import SaveIcon from "@patternfly/react-icons/dist/esm/icons/save-icon";
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { MathComponent } from "mathjax-react";

const Resource_usage_details = (props: { data; setData }) => {

  const [valueContinuous1, setValueContinious1] = useState(props.data["RUweightage"]);
  const [inputValueContinuous1, setInputValueContinuous1] = useState(props.data["RUweightage"]);
  const [query, setQuery] = useState(props.data["RUquery"]);
  const [valueType, setValueType] = useState(props.data["RUvaluetype"]);
  const [option, setOption] = useState(props.data["RUdatasource"]);
  const [operatorOption, setOperatorOption] = useState(props.data["RUoperator"]);
  const [editing, setEditing] = useState(false);
  const [direction, setDirection] = useState<'min' | 'max'>(props.data["RUdirection"]);
  const [equation, setEquation] = useState(props.data["RUequation"]);

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
      }
      else {
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
    props.setData({ ...{ ...props.data }, RUdirection: direction })
  }, [direction])
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
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RUequation: equation })
  }, [equation])

  useEffect(() => {
    var a;
    if (operatorOption === 'log' && direction === 'min') {
      a = String.raw`\frac{1}{ ${valueContinuous1 / 100} log(resourceusage)}`
    }
    else if (operatorOption === 'log' && direction === 'max') {
      a = valueContinuous1 / 100 + String.raw`log(resourceusage)`
    }
    else if (operatorOption === '0.5' && direction === 'min') {
      a =  String.raw`\frac{1}{ ${valueContinuous1 / 100} \sqrt{resourceusage}}`
    }
    else if (operatorOption === '0.5' && direction === 'max') {
      a = valueContinuous1 / 100 + String.raw`\sqrt{resourceusage}`
    }
    else if (direction === 'min') {
      a = String.raw`\frac{1}{ ${valueContinuous1/100} resourceusage^${operatorOption}}`
    }
    else if (direction === 'max') {
      a = valueContinuous1 / 100 + String.raw`resourceusage^${operatorOption}`
    }
    else {
      a = valueContinuous1 / 100 + "resourceusage"
    }
    setEquation(a)
  }, [direction, valueContinuous1, operatorOption])


  const handleOperatorChange = (operatorOption: string) => {
    console.log("opo" + operatorOption)
    setOperatorOption(operatorOption)
  }
  const handelValueTypeChange = (valueType: string) => {
    setValueType(valueType);
  }
  const handleOptionChange = (value: string, _event: React.FormEvent<HTMLSelectElement>) => {
    setOption(value);
  };
  const handelRadioChange = (value, x) => {
    console.log("hrc" + x)
    if (direction === "min") {
      setDirection("max")
    }
    else if (direction === "max") {
      setDirection("min")
    }
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
    { value: '1', label: 'none', disabled: false },
    { value: 'log', label: 'log', disabled: false },
    { value: '2', label: 'square', disabled: false },
    { value: '0.5', label: 'square root', disabled: false },

  ]
  const config = {
    loader: { load: ["input/asciimath"] }
  };

  return (
    
    <PageSection variant={PageSectionVariants.light}>
      <>
      <Form isWidthLimited id="form_resource usage" onSubmit={(e) => {
        e.preventDefault();
      }}>
        <Grid>
          <TextContent>
            <Text component={TextVariants.h3}>
              Function Variable :  Resource Usage
              <br />

            </Text>
          </TextContent>
          <FormGroup>
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

          </FormGroup>
          <FormGroup>
            <div className="pf-u-disabled-color-100">
              {/* <MathJaxContext config={config}>
             <Text>Equation : <MathJax dynamic > {equation}</MathJax>
              </Text>
            </MathJaxContext> */}

              <MathComponent tex={equation} />
            </div>
          </FormGroup>

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
              value={operatorOption}
              onChange={handleOperatorChange}
              isDisabled={!editing}
              aria-label="operator options"

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
              name="horizontal-form-query"
              onChange={handleQueryChange}
              isDisabled={!editing}
              aria-label="query resource usage"
            />
          </FormGroup>

          <FormGroup label="Data source" fieldId="horizontal-form-title">
            <FormSelect
              value={option}
              onChange={handleOptionChange}
              isDisabled={!editing}
              aria-label="options"
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
              isDisabled={!editing}
              aria-label="value type"
            >
              {valueOptions.map((option, index) => (
                <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
              ))}
            </FormSelect>
          </FormGroup>


          <FormGroup role="radiogroup" isStack fieldId="horizontal-form-radio-group" hasNoPaddingTop label="Direction"  >
            <Radio name="horizontal-inline-radio" label="Maximize" id="horizontal-inline-radio-01" onChange={handelRadioChange} isChecked={direction === 'max'} isDisabled={!editing} />
            <Radio name="horizontal-inline-radio" label="Minimize" id="horizontal-inline-radio-02" onChange={handelRadioChange} isChecked={direction === 'min'} isDisabled={!editing} />
          </FormGroup>
        </Grid>
      </Form>
      {console.log("what is" + props.data.RUequation)}
      </>
      </PageSection>
    
  )
};
export { Resource_usage_details };
