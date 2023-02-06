
import { FormFieldGroupExpandable, FormFieldGroupHeader, TextInput, Form, FormSection, FormGroup, Radio, FlexProps, Flex, OptionsMenu, FormSelect, FormSelectOption, FlexItem } from '@patternfly/react-core';
import React, { useState } from 'react'
import { NumberValueComponent } from './PerfComponents/NumberValueComponent';
import { UnitsOfTime } from './PerfComponents/UnitsOfTime';
import { Accordions } from './PerfComponents/Accordions';
import NameSpaceDropDown from '../NameSpaceDropDown';
const AdvancedSection = () => {

    const RecommendationSettings = () => {
        return (
            <FormSection title="Recommendation Settings" titleElement="h3">
                <FormGroup label="threshold" isRequired fieldId="simple-form-section-2-input">

                    <TextInput
                        isRequired
                        type="text"
                        id="simple-form-section-2-input"
                        name="simple-form-section-2-input"
                        value={0.1}
                    />

                </FormGroup>
            </FormSection>
        )
    }

    const TrialSettings = () => {
        return (
            <FormSection title="Trial Settings" titleElement="h3">
                <FormGroup label="measurement duration (in minutes)" isRequired fieldId="simple-form-section-2-input">

                    <TextInput
                        isRequired
                        type="text"
                        id="simple-form-section-2-input"
                        name="simple-form-section-2-input"
                        value={15}
                    />

                </FormGroup>
            </FormSection>

        )
    }
    const Sensitivity = () => {
        return (
            <FormGroup role="radiogroup" isStack fieldId="horizontal-form-radio-group" isRequired hasNoPaddingTop label="Performance Sensitive Application?">
                <Radio name="horizontal-inline-radio" label="Yes" id="horizontal-inline-radio-01" />
                <Radio name="horizontal-inline-radio" label="No" id="horizontal-inline-radio-02" />
            </FormGroup>
        );
    };

    const RecommendationWindowSize = () => {

        return (
            <FormSection title="Recommendation Window Size" titleElement="h3">
                With a minimum value of 0 and maximum value of 15
                <br />
                <FormGroup label="Short Term" isRequired fieldId="horizontal-form-email">
                    <Flex>
                        <FlexItem>
                            <NumberValueComponent />
                        </FlexItem>
                        <FlexItem>
                            <UnitsOfTime />
                        </FlexItem>

                    </Flex>
                </FormGroup>
                <FormGroup label="Medium Term" isRequired fieldId="horizontal-form-email">
                    <Flex>
                        <FlexItem>
                            <NumberValueComponent />
                        </FlexItem>
                        <FlexItem>
                            <UnitsOfTime />
                        </FlexItem>

                    </Flex>
                </FormGroup>
                <FormGroup label="Long Term" isRequired fieldId="horizontal-form-email">
                    <Flex>
                        <FlexItem>
                            <NumberValueComponent />
                        </FlexItem>
                        <FlexItem>
                            <UnitsOfTime />
                        </FlexItem>

                    </Flex>
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
                {RecommendationSettings()}
                {Sensitivity()}
                {RecommendationWindowSize()}
            </>
        </Form>
    )
}

export { AdvancedSection }
