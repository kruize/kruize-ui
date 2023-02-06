import React, { useState } from 'react'
import { Grid, GridItem, PageSection, PageSectionVariants, Tabs, Tab, TabTitleText, TabTitleIcon, Checkbox, TextContent, Text, TextVariants } from '@patternfly/react-core';
import { CubesIcon } from '@patternfly/react-icons/dist/esm/icons/cubes-icon';
import { CubeIcon } from '@patternfly/react-icons';
import { Container1Details } from './Container1Details';

const AnalyticsContainers = () => {

    const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);

    const handleTabClick = (
        event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
        tabIndex: string | number
    ) => {
        setActiveTabKey(tabIndex);
    };

    return (
        <Grid hasGutter span={10}>
            <Tabs
                isFilled
                activeKey={activeTabKey}
                onSelect={handleTabClick}
                isBox={true}
                aria-label="Tabs in the filled with icons example"
                role="region"
            >
                <Tab
                    eventKey={0}
                    title={
                        <>
                            <GridItem span={5}>
                                <TabTitleIcon>
                                    <CubeIcon />
                                </TabTitleIcon>{' '}
                                <TabTitleText>tfb-server-1</TabTitleText>{' '}
                            </GridItem>
                        </>
                    }
                    aria-label="filled tabs with icons content users"
                >
                    <Container1Details />
                </Tab>
                <br />
                <br />
                <Tab
                    eventKey={1}
                    title={
                        <>
                            <GridItem span={5}>
                                <TabTitleIcon>
                                    <CubesIcon />
                                </TabTitleIcon>{' '}
                                <TabTitleText>tfb-server-0</TabTitleText>{' '}
                            </GridItem>
                        </>
                    }
                >
                </Tab>
            </Tabs>
        </Grid>
    );
}

export { AnalyticsContainers }