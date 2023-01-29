import React, { useState } from 'react';
import { FormSelect, FormSelectOption } from '@patternfly/react-core';

const UnitsOfTime = () => {
    const [unit, setUnit] = useState('Select Mode');
    const handleUnitChange = (value) => {
        setUnit(value)
    }

    const units = [
        { value: '1', label: 'Days', disabled: false },
        { value: '2', label: 'Hours', disabled: false },
        { value: '3', label: 'Minutes', disabled: false },

    ]
    return (
        <FormSelect
            value={unit}
            onChange={handleUnitChange}
            aria-label="mode"

        >
            {units.map((option, index) => (
                <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
            ))}
        </FormSelect>
    )
}

export { UnitsOfTime }