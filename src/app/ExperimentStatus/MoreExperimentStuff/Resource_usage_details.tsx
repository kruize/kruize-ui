import React, { useState, useEffect } from 'react';
import {
  Slider,
  Text,
  Button,
  Form,
  FormGroup,
  TextInput,
  FormSelect,
  FormSelectOption,
  Radio,
  TextVariants,
  TextContent,
  FormSection,
  PageSection,
  PageSectionVariants,
  Grid,
  GridItem
} from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import PencilAltIcon from '@patternfly/react-icons/dist/esm/icons/pencil-alt-icon';
import SaveIcon from '@patternfly/react-icons/dist/esm/icons/save-icon';
import { MathComponent } from 'mathjax-react';

const Resource_usage_details = (props: { data; setData }) => {
  const [valueContinuous1, setValueContinious1] = useState(props.data['RUweightage']);
  const [inputValueContinuous1, setInputValueContinuous1] = useState(props.data['RUweightage']);
  const [query, setQuery] = useState(props.data['RUquery']);
  const [valueType, setValueType] = useState(props.data['RUvaluetype']);
  const [option, setOption] = useState(props.data['RUdatasource']);
  const [operatorOption, setOperatorOption] = useState(props.data['RUoperator']);
  const [editing, setEditing] = useState(false);
  const [direction, setDirection] = useState<'min' | 'max'>(props.data['RUdirection']);
  const [equation, setEquation] = useState(props.data['RUequation']);

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
    sessionStorage.setItem('Resource Usage Slider Value', newValue);
  };

  const handleQueryChange = (query: string) => {
    setQuery(query);
  };
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RUdirection: direction });
  }, [direction]);
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RUquery: query });
  }, [query]);
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RUvaluetype: valueType });
  }, [valueType]);
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RUdatasource: option });
  }, [option]);
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RUoperator: operatorOption });
  }, [operatorOption]);
  useEffect(() => {
    props.setData({ ...{ ...props.data }, RUequation: equation });
  }, [equation]);

  useEffect(() => {
    var a;
    if (operatorOption === 'log' && direction === 'min') {
      a = String.raw`\frac{1}{ ${valueContinuous1 / 100} log(resource_usage)}`;
    } else if (operatorOption === 'log' && direction === 'max') {
      a = valueContinuous1 / 100 + String.raw`log(resource_usage)`;
    } else if (operatorOption === '0.5' && direction === 'min') {
      a = String.raw`\frac{1}{ ${valueContinuous1 / 100} \sqrt{resource_usage}}`;
    } else if (operatorOption === '0.5' && direction === 'max') {
      a = valueContinuous1 / 100 + String.raw`\sqrt{resource_usage}`;
    } else if (operatorOption === '1' && direction === 'min') {
      a = String.raw`\frac{1}{ ${valueContinuous1 / 100} resourceusage}`;
    } else if (operatorOption === '1' && direction === 'max') {
      a = valueContinuous1 / 100 + 'resourceusage';
    } else if (direction === 'min') {
      a = String.raw`\frac{1}{ ${valueContinuous1 / 100} resourceusage^${operatorOption}}`;
    } else if (direction === 'max') {
      a = valueContinuous1 / 100 + String.raw`resourceusage^${operatorOption}`;
    } else {
      a = valueContinuous1 / 100 + 'resourceusage';
    }
    setEquation(a);
  }, [direction, valueContinuous1, operatorOption]);

  const handleOperatorChange = (operatorOption: string) => {
    console.log('opo' + operatorOption);
    setOperatorOption(operatorOption);
  };
  const handelValueTypeChange = (valueType: string) => {
    setValueType(valueType);
  };
  const handleOptionChange = (value: string) => {
    setOption(value);
  };
  const handelRadioChange = (x) => {
    console.log('hrc' + x);
    if (direction === 'min') {
      setDirection('max');
    } else if (direction === 'max') {
      setDirection('min');
    }
  };

  const valueOptions = [
    { value: 'double', label: 'double', disabled: false },
    { value: 'float', label: 'float' }
  ];
  const options = [
    { value: 'prometheus', label: 'prometheus', disabled: false },
    { value: 'B', label: 'B', disabled: false },
    { value: 'C', label: 'C', disabled: false }
  ];
  const operatorOptions = [
    { value: '1', label: 'none', disabled: false },
    { value: 'log', label: 'log', disabled: false },
    { value: '2', label: 'square', disabled: false },
    { value: '0.5', label: 'square root', disabled: false }
  ];
  const config = {
    loader: { load: ['input/asciimath'] }
  };

  const formEquation = () => {
    return (
      <TextContent>
        <Text component={TextVariants.h5}>
          <MathComponent tex={equation} />
        </Text>
      </TextContent>
    );
  };
  const formMode = () => {
    return (
      <FormGroup>
        <Grid>
          <GridItem span={1} rowSpan={1}>
            {editing ? (
              <Button variant="secondary" onClick={() => setEditing(false)}>
                <SaveIcon color="blue" /> &nbsp; Save
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => setEditing(true)}>
                <PencilAltIcon color="blue" /> &nbsp; Edit
              </Button>
            )}
          </GridItem>
          <GridItem></GridItem>
        </Grid>
      </FormGroup>
    );
  };

  const formWeightage = () => {
    return (
      <FormGroup label="Weightage" isRequired fieldId="horizontal-form-name">
        <Slider
          value={valueContinuous1}
          isInputVisible
          inputValue={inputValueContinuous1}
          inputLabel="%"
          onChange={(_event, value, inputValue, setLocalInputValue) =>
            onChangeContinuous1(value, inputValue, setLocalInputValue)
          }
          isDisabled={!editing}
        />
      </FormGroup>
    );
  };
  const formOperator = () => {
    return (
      <FormGroup label="Operator" isRequired fieldId="horizontal-form-name">
        <FormSelect
          value={operatorOption}
          onChange={(_event, operatorOption: string) => handleOperatorChange(operatorOption)}
          isDisabled={!editing}
          aria-label="operator options"
        >
          {operatorOptions.map((option, index) => (
            <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
          ))}
        </FormSelect>
      </FormGroup>
    );
  };
  const formQuery = () => {
    return (
      <FormGroup label="Query" isRequired fieldId="horizontal-form-email">
        <TextInput
          value={query}
          isRequired
          name="horizontal-form-query"
          onChange={(_event, query: string) => handleQueryChange(query)}
          isDisabled={!editing}
          aria-label="query resource_usage"
        />
      </FormGroup>
    );
  };
  const formDatasource = () => {
    return (
      <FormGroup label="Data source" fieldId="horizontal-form-title">
        <FormSelect
          value={option}
          onChange={(_event, value: string) => handleOptionChange(value)}
          isDisabled={!editing}
          aria-label="options"
        >
          {options.map((option, index) => (
            <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
          ))}
        </FormSelect>
      </FormGroup>
    );
  };

  const formValuetype = () => {
    return (
      <FormGroup label="Value Type" fieldId="horizontal-form-title">
        <FormSelect
          value={valueType}
          onChange={(_event, valueType: string) => handelValueTypeChange(valueType)}
          isDisabled={!editing}
          aria-label="value type"
        >
          {valueOptions.map((option, index) => (
            <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
          ))}
        </FormSelect>
      </FormGroup>
    );
  };

  const formDirection = () => {
    return (
      <FormGroup role="radiogroup" isStack fieldId="horizontal-form-radio-group" hasNoPaddingTop label="Direction">
        <Radio
          name="horizontal-inline-radio"
          label="Maximize"
          id="horizontal-inline-radio-01"
          onChange={(_event, x) => handelRadioChange(x)}
          isChecked={direction === 'max'}
          isDisabled={!editing}
        />
        <Radio
          name="horizontal-inline-radio"
          label="Minimize"
          id="horizontal-inline-radio-02"
          onChange={(_event, x) => handelRadioChange(x)}
          isChecked={direction === 'min'}
          isDisabled={!editing}
        />
      </FormGroup>
    );
  };
  return (
    <PageSection variant={PageSectionVariants.light}>
      <Form
        isWidthLimited
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormSection>
          <Grid hasGutter span={2}>
            <GridItem span={10}>
              {
                <TextContent>
                  <Text component={TextVariants.h3}>Function Variable : Resource Usage</Text>
                </TextContent>
              }
            </GridItem>
            <GridItem span={1}>{formMode()}</GridItem>
          </Grid>
          {formEquation()}
          {formWeightage()}
          {formOperator()}
          {formQuery()}
          {formDatasource()}
          {formValuetype()}
          {formDirection()}
        </FormSection>
      </Form>
    </PageSection>
  );
};

export { Resource_usage_details };
