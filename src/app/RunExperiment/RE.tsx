import React, { useState } from 'react';
import {
    Button,
    Card,
    CardBody,
    Grid,
    GridItem,
    PageSection,
    TextContent,
    Text,
    TextVariants,
    Spinner,
} from '@patternfly/react-core';
import NameSpaceDropDown from "./NameSpaceDropDown";
import DeploymentsDropdown from "./DeploymentsDropdown";

const RE: React.FunctionComponent = () => {
    const dropd = (
        <PageSection>
            <section className="pf-c-page__main-section pf-m-limit-width pf-m-light">
                <div className='pf-c-page__main-body pf-m-align-center'>
                    <TextContent>
                        <Text component={TextVariants.h1}>Run Experiment</Text>
                    </TextContent>
                </div>
            </section>
            <Card>
                <CardBody>
                    <Grid hasGutter>
                        <GridItem span={2}></GridItem>
                        <GridItem span={8}>
                            <Grid hasGutter>
                                <GridItem span={6}>
                                    <NameSpaceDropDown />
                                </GridItem>
                                <GridItem span={6}>
                                    <DeploymentsDropdown />
                                </GridItem>
                            </Grid>
                            <br />
                            <br />
                            <Grid hasGutter>
                                <GridItem span={4}>
                                    <Text> Provide Experiment Name : </Text>
                                </GridItem>
                                <GridItem span={6}>
                                    <Text>TechEmpower Experiment YAML - 002 </Text>
                                </GridItem>
                            </Grid>
                            <br />
                            <br />
                            <Grid hasGutter>
                                <GridItem span={5} >
                                    <Button variant="secondary" >
                                        Let's Take a Deep Dive
                                    </Button>
                                </GridItem>
                                <GridItem span={2}> </GridItem>
                                <GridItem span={3}>
                                    <Button variant="secondary">Reset the Fields</Button>
                                </GridItem>
                            </Grid>
                            <br />
                        </GridItem>
                        <GridItem span={2}></GridItem>
                    </Grid>
                    <Grid>
                    </Grid>
                </CardBody>
            </Card>
        </PageSection>
    )
    return (
        <div>{dropd} </div>
    )
};

export default RE;
