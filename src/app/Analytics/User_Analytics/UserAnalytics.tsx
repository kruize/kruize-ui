import React from 'react'
import { Text, PageSection, PageSectionVariants, TextContent, TextVariants, FormGroup, Form, FormSection, Divider, Grid, GridItem, Checkbox } from '@patternfly/react-core';
import NameSpaceDropDown from '@app/RunExperiment/NameSpaceDropDown';
import { AnalyticsNamespace } from './AnalyticsNamespace';
import { AnalyticsDeployment } from './AnalyticsDeployment';
import { AnalyticsContainers } from './ContainerInfo/AnalyticsContainers';

const UserAnalytics = () => {
    return (
        <PageSection variant={PageSectionVariants.light}>
            <TextContent>
                <Text component={TextVariants.h1}>Analytics - User View</Text>
            </TextContent>
            <br />
            <Divider />
            <br />
            <br />
            <Form isHorizontal>
                <FormSection>
                    <Grid hasGutter>
                        <GridItem span={3}>
                            <FormGroup label="Namespace" isRequired fieldId="simple-form-section-2-input">
                                <AnalyticsNamespace />
                            </FormGroup>
                        </GridItem>
                        <GridItem span={2} />
                        <GridItem span={3}>
                            <FormGroup label="Deployment" isRequired fieldId="simple-form-section-2-input">
                                <AnalyticsDeployment />
                            </FormGroup>
                        </GridItem>
                        <GridItem span={4} />
                        <GridItem span={4}>
                            <FormGroup role="group" helperText="Select all that apply" isHelperTextBeforeField isStack fieldId="basic-form-checkbox-group" label="Optimise for:">
                                <Checkbox label="Cost" aria-label="Cost" id="inlinecheck01" />
                                <Checkbox label="Balance" aria-label="Balance" id="inlinecheck02" />
                                <Checkbox label="Performance" aria-label="Performance" id="inlinecheck03" />
                            </FormGroup>
                        </GridItem>
                        <FormGroup label="Containers" isRequired fieldId="simple-form-section-2-input">
                            <AnalyticsContainers />

                        </FormGroup>
                    </Grid>
                </FormSection>
            </Form>
        </PageSection>
    )
};

export { UserAnalytics }
