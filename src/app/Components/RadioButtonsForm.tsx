import React from 'react';
import { Form, FormGroup, Radio } from '@patternfly/react-core';

const RadioButtonsForm = ({ options, name, isDisabled }) => {
  const [selectedOption, setSelectedOption] = React.useState(options[0]);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <Form>
      <FormGroup isInline label={name.charAt(0).toUpperCase() + name.slice(1) + ':'}>
        {options.map((option) => (
          <Radio
            key={option}
            isChecked={selectedOption === option}
            value={option}
            onChange={() => handleOptionChange(option)}
            label={option}
            id={`radio_${name}_${option}`}
            name={name}
            isDisabled={isDisabled}
          />
        ))}
      </FormGroup>
    </Form>
  );
};

export default RadioButtonsForm;
