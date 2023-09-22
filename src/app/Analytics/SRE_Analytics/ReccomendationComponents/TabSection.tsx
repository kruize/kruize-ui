import * as React from 'react';
import { Tabs, Tab, TabTitleText } from '@patternfly/react-core';
import { CostDetails } from './CostDetails';

const TabSection = (props: { recommendedData: any; currentData }) => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);

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
    <Tabs activeKey={activeTabKey} onSelect={handleTabClick} aria-label="Tabs in the filled example" role="region">
      <Tab
        eventKey={0}
        title={<TabTitleText>Cost optimizations</TabTitleText>}
        aria-label="Tabs filled example content users"
      >
        <CostDetails recommendedData={props.recommendedData} currentData={props.currentData} />
      </Tab>

      <Tab eventKey={1} title={<TabTitleText>Performance optimizations</TabTitleText>}></Tab>
    </Tabs>
  );
};

export { TabSection };
