
import { ExpandableSection, Form, FormSection, FormGroup, Radio, NumberInput, OptionsMenu, FormSelect, FormSelectOption } from '@patternfly/react-core';
import React, { useState } from 'react'

const AdvancedSection = () => {

    const TrialSettings = () => {
        <FormSection title="Trial Settings" titleElement="h2">
            <FormGroup label="Measurement Duration" isRequired fieldId="simple-form-section-2-input">

            </FormGroup>
        </FormSection>
    }
    const Sensitivity = () => {
        return (
            <FormGroup role="radiogroup" isStack fieldId="horizontal-form-radio-group" isRequired hasNoPaddingTop label="Performance Sensitive Application?"  >
                <Radio name="horizontal-inline-radio" label="Yes" id="horizontal-inline-radio-01" />
                <Radio name="horizontal-inline-radio" label="No" id="horizontal-inline-radio-02" />
            </FormGroup>
        );
    };
    const unitsOfTime = () => {
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
    const RecommendationSettings = () => {

        return (
            <FormSection title="Recommendation Window Size">
                <FormGroup label="Short Term" isRequired fieldId="horizontal-form-email">
                    <NumberInput />
                    {unitsOfTime()}

                </FormGroup>
                <FormGroup label="Medium Term" isRequired fieldId="horizontal-form-email">
                    <NumberInput />
                    {unitsOfTime()}
                </FormGroup>
                <FormGroup label="Long Term" isRequired fieldId="horizontal-form-email">
                    <NumberInput />
                    {unitsOfTime()}
                </FormGroup>
            </FormSection>
        );
    }
    return (

        <Form
            isWidthLimited
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <>
                {TrialSettings()}
                {Sensitivity()}
                {RecommendationSettings()}
            </>

        </Form>

    )
}

export { AdvancedSection }
