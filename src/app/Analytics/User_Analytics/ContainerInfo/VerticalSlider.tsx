import React, { useState } from 'react';
import { Slider, Typography } from '@material-ui/core';
import { Text, TextContent, Divider, TextVariants } from '@patternfly/react-core';

const VerticalSlider = () => {
    const [value, setValue] = useState(30);

    const changeValue = (event, value) => {
        setValue(value);
    };
    const getText = (valu) => `${value}`;

    const customMarks = [
        {
            value: 10,
            label: '10',
        },
        {
            value: 20,
            label: '20',
        },
        {
            value: 30,
            label: '30',
        },
        {
            value: 40,
            label: '40',
        },
        {
            value: 50,
            label: '50',
        },
        {
            value: 100,
            label: '100',
        },
    ];

    return (
        <>

            <Slider
                style={{ height: 300, marginTop: 30 }}
                min={10}
                max={100}
                step={null}
                value={value}
                marks={customMarks}
                onChange={changeValue}
                valueLabelDisplay="auto"
                getAriaValueText={getText}
                orientation="vertical" />

            <Divider />
            <TextContent>
                <Text component={TextVariants.h1}> No. of Recommen dations
                </Text>
            </TextContent>
        </>
    );
};

export { VerticalSlider }
