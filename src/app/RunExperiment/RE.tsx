import React, { useState } from 'react';
import {
    Button,
    Card,
    CardBody, DropdownItem, DropdownSeparator,
    Grid,
    GridItem,
    Spinner,
} from '@patternfly/react-core';

import NameSpaceDropDown from "./NameSpaceDropDown";
import DeploymentsDropdown from "./DeploymentsDropdown";
// import ThroughputSlider from "./ThroughputSlider";
// import ResponseTimeSlider from "./ResponseTimeSlider";
// import ResourceUsageSlider from "./ResourceUsageSlider";
// import LayerDropdown from './LayerDropdown';
// import TunableDropdown from './TunableDropdown';


const RE: React.FunctionComponent = () => {
    const dropd = (
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



                        <Grid hasGutter>
                            <GridItem span={5} >
                                <Button variant="secondary" >
                                    Submit
                                </Button>

                            </GridItem>
                            <GridItem span={2}> </GridItem>
                            <GridItem span={3}>
                                <Button variant="secondary">Reset </Button>
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
    )
    return (
        <div>{dropd} </div>
    )

};

export default RE;

