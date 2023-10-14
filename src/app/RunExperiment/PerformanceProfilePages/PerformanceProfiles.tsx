import React, { useState } from 'react';
import {
  Grid,
  GridItem,
  PageSection,
  PageSectionVariants,
  Tabs,
  Tab,
  TabTitleText,
  TabTitleIcon,
  TextContent,
  Text,
  TextVariants
} from '@patternfly/react-core';
import { RegularSection } from './RegularSection';
import { AdvancedSection } from './AdvancedSection';
import { CubesIcon } from '@patternfly/react-icons/dist/esm/icons/cubes-icon';
import { CubeIcon } from '@patternfly/react-icons';

const PerformanceProfiles = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);

  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  return (
    <div>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component={TextVariants.h1}>Autotune Supported Performance Profiles</Text>
        </TextContent>
        <br />
        <Grid hasGutter span={8}>
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
                <TabTitleText>
                  <GridItem span={5}>
                    <TabTitleIcon>
                      <CubeIcon />
                    </TabTitleIcon>{' '}
                    <TabTitleText>Regular Settings</TabTitleText>{' '}
                  </GridItem>
                </TabTitleText>
              }
            >
              <RegularSection />
            </Tab>
            <br />
            <br />
            <Tab
              eventKey={1}
              title={
                <TabTitleText>
                  <GridItem span={5}>
                    <TabTitleIcon>
                      <CubesIcon />
                    </TabTitleIcon>{' '}
                    <TabTitleText>Advanced Settings</TabTitleText>{' '}
                  </GridItem>
                </TabTitleText>
              }
            >
              <AdvancedSection />
            </Tab>
          </Tabs>
        </Grid>
      </PageSection>
    </div>
  );
};
export { PerformanceProfiles };
