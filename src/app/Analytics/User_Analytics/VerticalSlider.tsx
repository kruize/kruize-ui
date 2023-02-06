import React from 'react';
import { Slider, Text, TextVariants } from '@patternfly/react-core';

const VerticalSlider = () => {

    const initialValues = {
        value1: 50,
        value2: 50,
        value3: 25,
        value4: 50,
        value5: 50,
        value6: 3,
        value7: 25
    };

    const [numValue, setNumValue] = React.useState(initialValues);

    const handleChange = (value: number, name: string) => {
        setNumValue({ ...numValue, [name]: value });
    };

    const steps = [
        { value: 0, label: '0' },
        { value: 12.5, label: '1', isLabelHidden: true },
        { value: 25, label: '2' },
        { value: 37.5, label: '3', isLabelHidden: true },
        { value: 50, label: '4' },
        { value: 62.5, label: '5', isLabelHidden: true },
        { value: 75, label: '6' },
        { value: 87.5, label: '7', isLabelHidden: true },
        { value: 100, label: '8' }
    ];

    return (
        <Slider
            value={initialValues.value1}
            onChange={(value: number) => handleChange(value, 'value1')}
            customSteps={steps}
        />
    );
};

export { VerticalSlider }
