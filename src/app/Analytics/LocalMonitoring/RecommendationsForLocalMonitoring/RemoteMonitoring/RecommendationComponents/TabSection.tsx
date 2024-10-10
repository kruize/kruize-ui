import * as React from 'react';
import { Tabs, Tab, TabTitleText, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { CostDetails } from './CostDetails';
import { PerfDetails } from './PerfDetails';

const TabSection = (props: { recommendedData: any; currentData; chartData; day; endtime; displayChart  ; boxPlotData}) => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);

  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  return (
    <Tabs activeKey={activeTabKey} onSelect={handleTabClick} aria-label="Tabs in the filled example" role="region">
      <Tab
        eventKey={0}
        title={<TabTitleText>Cost optimizations</TabTitleText>}
        aria-label="Tabs filled example content users"
      >
        <CostDetails
          recommendedData={props.recommendedData}
          currentData={props.currentData}
          chartData={props.chartData}
          day={props.day}
          endtime={props.endtime}
          displayChart={props.displayChart}
          boxPlotData={props.boxPlotData}
        />
      </Tab>
      <Tab eventKey={1} title={<TabTitleText>Performance optimizations</TabTitleText>}>
        <PerfDetails
          recommendedData={props.recommendedData}
          currentData={props.currentData}
          chartData={props.chartData}
          day={props.day}
          endtime={props.endtime}
          displayChart={props.displayChart}
          tab={activeTabKey}
          boxPlotData={props.boxPlotData}
        />
      </Tab>
    </Tabs>
  );
};

export { TabSection };
