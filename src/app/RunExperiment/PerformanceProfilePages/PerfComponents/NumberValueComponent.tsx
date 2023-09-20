import React, { useState } from 'react';
import { NumberInput } from '@patternfly/react-core';
import { number } from 'prop-types';
import { UnitsOfTime } from './UnitsOfTime';

const NumberValueComponent = () => {
  const [value, setValue] = useState<number | ''>(0);
  const minValue = 0;
  const maxValue = 15;

  const normalizeBetween = (value, min, max) => {
    if (min !== undefined && max !== undefined) {
      return Math.max(Math.min(value, max), min);
    } else if (value <= min) {
      return min;
    } else if (value >= max) {
      return max;
    }
    return value;
  };

  const onMinus = () => {
    const newValue = normalizeBetween((value as number) - 1, minValue, maxValue);
    setValue(newValue);
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setValue(value === '' ? value : +value);
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const blurVal = +event.target.value;

    if (blurVal < minValue) {
      setValue(minValue);
    } else if (blurVal > maxValue) {
      setValue(maxValue);
    }
  };

  const onPlus = () => {
    const newValue = normalizeBetween((value as number) + 1, minValue, maxValue);
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <NumberInput
        value={value}
        min={minValue}
        max={maxValue}
        onMinus={onMinus}
        onChange={onChange}
        onBlur={onBlur}
        onPlus={onPlus}
        inputName="input"
        inputAriaLabel="number input"
        minusBtnAriaLabel="minus"
        plusBtnAriaLabel="plus"
        // unit={UnitsOfTime()}
      />
    </React.Fragment>
  );
};

export { NumberValueComponent };
