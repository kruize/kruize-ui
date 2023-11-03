import React, { useState } from 'react';
import {
  Grid,
  GridItem,
  Tabs,
  Tab,
  TabTitleText,
  TabTitleIcon,
  TextContent,
  Text,
  TextVariants
} from '@patternfly/react-core';
import { CubesIcon } from '@patternfly/react-icons/dist/esm/icons/cubes-icon';
import { CubeIcon, OutlinedClockIcon, ThLargeIcon } from '@patternfly/react-icons';
import { Container1Details } from './Container1Details';
import { Container2Details } from './Container2Details';
const AnalyticsContainers = () => {
  const [activeTabKey1, setActiveTabKey1] = React.useState<string | number>(0);
  const [activeTabKey2, setActiveTabKey2] = React.useState<string | number>(0);
  const [isBox, setIsBox] = React.useState<boolean>(false);

  // Toggle currently active primary tab
  const handleTabClickFirst = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey1(tabIndex);
  };

  // Toggle currently active secondary tab
  const handleTabClickSecond = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey2(tabIndex);
  };

  const toggleBox = (checked: boolean) => {
    setIsBox(checked);
  };

  return (
    <Grid hasGutter span={10}>
      <Tabs
        isFilled
        activeKey={activeTabKey1}
        onSelect={handleTabClickFirst}
        isBox={true}
        aria-label="Tabs recommendations"
        role="region"
      >
        <Tab
          eventKey={0}
          title={
            <>
              <GridItem span={8}>
                <TabTitleIcon>
                  <OutlinedClockIcon />
                </TabTitleIcon>{' '}
                <TabTitleText>
                  <TextContent>
                    <Text component={TextVariants.h2}>Duration Based Recommendations</Text>
                  </TextContent>
                </TabTitleText>{' '}
              </GridItem>
            </>
          }
          aria-label="duration based"
        >
          <TextContent>
            <Text component={TextVariants.h2}>Containers</Text>
          </TextContent>

          <Tabs
            aria-label="containers"
            role="region"
            activeKey={activeTabKey2}
            isBox={true}
            onSelect={handleTabClickSecond}
          >
            <Tab
              eventKey={20}
              title={
                <>
                  <TabTitleIcon>
                    <CubeIcon />
                  </TabTitleIcon>{' '}
                  <TabTitleText>tfb-server-1</TabTitleText>
                </>
              }
            >
              <Container1Details />
            </Tab>
            <Tab
              eventKey={21}
              title={
                <>
                  <TabTitleIcon>
                    <CubesIcon />
                  </TabTitleIcon>{' '}
                  <TabTitleText>tfb-server-0</TabTitleText>
                </>
              }
            >
              Detected Issues <br />
              Suggestions <br />
              Detailed Recommendation Table
            </Tab>
          </Tabs>
        </Tab>
        <br />
        <br />
        <Tab
          eventKey={1}
          title={
            <>
              <GridItem span={8}>
                <TabTitleIcon>
                  <ThLargeIcon />
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
          <TextContent>
            <Text component={TextVariants.h2}>Containers</Text>
          </TextContent>

          <Tabs aria-label="cont" role="region" activeKey={activeTabKey2} isBox={true} onSelect={handleTabClickSecond}>
            <Tab
              eventKey={22}
              title={
                <>
                  <TabTitleIcon>
                    <CubeIcon />
                  </TabTitleIcon>{' '}
                  <TabTitleText>tfb-server-1</TabTitleText>
                </>
              }
            >
              <Container2Details />
            </Tab>
            <Tab
              eventKey={23}
              title={
                <>
                  <TabTitleIcon>
                    <CubesIcon />
                  </TabTitleIcon>{' '}
                  <TabTitleText>tfb-server-0</TabTitleText>
                </>
              }
            >
              Detected Issues <br />
              Suggestions <br />
              Detailed Recommendation Table
            </Tab>
          </Tabs>
        </Tab>
      </Tabs>
    </Grid>
  );
};

export { AnalyticsContainers };
