import React, {useState} from 'react';
import {
    Card,
    CardBody, DropdownItem, DropdownSeparator,
    Grid,
    GridItem,
} from '@patternfly/react-core';
import NameSpaceDropDown from "./NameSpaceDropDown";
import DeploymentsDropdown from "./DeploymentsDropdown";
import ThroughputSlider from "./ThroughputSlider";
import ResponseTimeSlider from "./ResponseTimeSlider";
import ResourceUsageSlider from "./ResourceUsageSlider";

class KruizeConfig extends React.Component {
    render() {
        return (
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
                            <br/>
                            <Grid hasGutter>
                                <GridItem span={2}></GridItem>
                                <GridItem span={8}>
                                    <ThroughputSlider />
                                    <br/>
                                    <ResponseTimeSlider />
                                    <br />
                                    <ResourceUsageSlider />
                                </GridItem>
                                <GridItem span={2}></GridItem>
                            </Grid>
                        </GridItem>
                        <GridItem span={2}></GridItem>
                    </Grid>
                </CardBody>
            </Card>
        );
    }
}

export default KruizeConfig