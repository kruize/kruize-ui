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
  TextContent,
  PageSection,
  PageSectionVariants,
  Grid,
  FormSection
} from "@patternfly/react-core";
import PencilAltIcon from '@patternfly/react-icons/dist/esm/icons/pencil-alt-icon';
import SaveIcon from "@patternfly/react-icons/dist/esm/icons/save-icon";
import { MathComponent } from "mathjax-react";

const Response_time_details = (props: { data; setData }) => {

  const [valueContinuous1, setValueContinious1] = useState(props.data["RTweightage"]);
  const [inputValueContinuous1, setInputValueContinuous1] = useState(props.data["RTweightage"]);
  const [query, setQuery] = useState(props.data["RTquery"]);
  const [valueType, setValueType] = useState(props.data["RTvaluetype"]);
  const [option, setOption] = useState(props.data["RTdatasource"]);
  const [operatorOption, setOperatorOption] = useState(props.data["RToperator"]);
  const [editing, setEditing] = useState(false);
  const [direction, setDirection] = useState<'min' | 'max'>(props.data["RTdirection"]);
  const [equation, setEquation] = useState(props.data["RTequation"]);

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
    sessionStorage.setItem("Response Time Slider Value", newValue);
  };

  const handleQueryChange = (query: string) => {
    setQuery(query);
  };
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RTdirection: direction })
  }, [direction])
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

  useEffect(() => {
    var a;
    if (operatorOption === 'log' && direction === 'min') {
      a = String.raw`\frac{1}{ ${valueContinuous1 / 100} log(responsetime)}`
    }
    else if (operatorOption === 'log' && direction === 'max') {
      a = valueContinuous1 / 100 + String.raw`log(responsetime)`
    }
    else if (operatorOption === '0.5' && direction === 'min') {
      a =  String.raw`\frac{1}{ ${valueContinuous1 / 100} \sqrt{responsetime}}`
    }
    else if (operatorOption === '0.5' && direction === 'max') {
      a = valueContinuous1 / 100 + String.raw`\sqrt{responsetime}`
    }
    else if (direction === 'min') {
      a = String.raw`\frac{1}{ ${valueContinuous1/100} responsetime^${operatorOption}}`
    }
    else if (direction === 'max') {
      a = valueContinuous1 / 100 + String.raw`responsetime^${operatorOption}`
    }
    else {
      a = valueContinuous1 / 100 + "responsetime"
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
      <Form isWidthLimited id="form_response time" onSubmit={(e) => {
        e.preventDefault();
      }}>
        <Grid>
          <TextContent>
            <Text component={TextVariants.h3}>
              Function Variable :  Response Time
              <br />

            </Text>
          </TextContent>
          <FormSection>
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
              aria-label="query response time"
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
          </FormSection>
        </Grid>
        
      </Form>
      </>
      </PageSection>
  )
};

export { Response_time_details };
