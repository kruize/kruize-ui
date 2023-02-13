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
    const nestedTabs = () => {
        return (
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
                                <TabTitleText><TextContent>
                                    <Text component={TextVariants.h2}>tfb-server-1</Text>
                                </TextContent></TabTitleText>{' '}
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
                                <TabTitleText>
                                    <TextContent>
                                        <Text component={TextVariants.h2}>tfb-server-0</Text>
                                    </TextContent>
                                </TabTitleText>{' '}
                            </GridItem>
                        </>
                    }
                >
                    <>tfb-server-0</>
                </Tab>
            </Tabs>
        )
    }
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
                                <TabTitleText><TextContent>
                                    <Text component={TextVariants.h2}>Duration Based Recommendations</Text>
                                </TextContent></TabTitleText>{' '}
                            </GridItem>
                        </>
                    }
                    aria-label="filled tabs with icons content users"
                >
                    {nestedTabs()}
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
                                <TabTitleText>
                                    <TextContent>
                                        <Text component={TextVariants.h2}>Profile Based Recommendations</Text>
                                    </TextContent>
                                </TabTitleText>{' '}
                            </GridItem>
                        </>
                    }
                >
                    <> "Profile"</>
                </Tab>
            </Tabs>

        </Grid>
    );
}

export { AnalyticsContainers }