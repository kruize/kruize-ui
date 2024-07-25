import * as React from 'react';
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  TextVariants,
  Tabs,
  Tab,
  TabTitleText
} from '@patternfly/react-core';
import { useState } from 'react';
import { RecommendationTables } from './RecommendationTables';
import { UsecaseSelection } from './UsecaseSelection';

const SREdataa = {
  experiment_name: '',
  container_name: '',
  cluster_name: '',
  namespace: '',
  name: '',
  type: '',
  containerArray: [],
  experiment_type: ''
};

const Monitoring = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [SREdata, setSREdata] = useState(SREdataa);
  const [endTimeArray, setEndTimeArray] = useState<any | null>(null);

  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  const switchTab = (tabIndex) => {
    setActiveTabKey(tabIndex);
  };

  return (
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component={TextVariants.h1}>Monitoring</Text>
      </TextContent>
      <br />
      {/* <Tabs
        isFilled
        activeKey={activeTabKey}
        onSelect={handleTabClick}
        isBox={true}
        aria-label="Tabs in the filled example"
        role="region"
      >
        <Tab
          eventKey={0}
          title={<TabTitleText>Experiment Selection</TabTitleText>}
          aria-label="Tabs filled example content users"
        > */}
          <UsecaseSelection
            setEndTimeArray={setEndTimeArray}
            endTimeArray={endTimeArray}
            setSREdata={setSREdata}
            SREdata={SREdata}
            switchTab={switchTab}
          />
        {/* </Tab> */}

        {/* <Tab eventKey={1} title={<TabTitleText>Recommendations</TabTitleText>}> */}
          <RecommendationTables
            setEndTimeArray={setEndTimeArray}
            endTimeArray={endTimeArray}
            setSREdata={setSREdata}
            SREdata={SREdata}
          />
        {/* </Tab> */}
      {/* </Tabs> */}
    </PageSection>
  );
};

export { Monitoring };
