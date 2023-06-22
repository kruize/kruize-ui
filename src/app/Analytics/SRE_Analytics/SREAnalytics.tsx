import * as React from 'react';
import { PageSection, PageSectionVariants, TextContent, Text, TextVariants, Title, FormFieldGroupExpandable, FormFieldGroupHeader, FormGroup, TextInput, Button, Form, FormFieldGroup, Flex, Select, SelectOption, SelectVariant, FormSelectOption, FormSelect, Tabs, Tab, TabTitleText, FlexItem, DatePicker, ToggleGroupItemProps, TimePicker } from '@patternfly/react-core';
import { TableIcon } from '@patternfly/react-icons';
import { Table } from './Table';
import { MonitoringTable } from './MonitoringTable';
import { useState, useEffect } from 'react';
import { AnalyticsNamespace } from '../User_Analytics/AnalyticsNamespace';
import { ExperimentTable } from '../User_Analytics/ExperimentTable';
import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { RecommendationTables } from './RecommendationTables'
import { UsecaseSelection } from './UsecaseSelection';
import { LineChart } from './LineChart';

const SREdataa = {
   experiment_name: '',
   namespace: '',
   name: '',
   type: '',
  containerArray: []
}

const chartDataa = {
  chartMetrics: [],
  timestamp: [],
  average: [],
  max: []
}


const SREAnalytics = () => {

  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [SREdata, setSREdata] = useState(SREdataa);
  const [chartData, setChartData] = useState(chartDataa);
  const [endTimeArray, setEndTimeArray] = useState<any | null>(null);

  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  return (
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component={TextVariants.h1}>Analytics - SRE View</Text>
      </TextContent>
      <Tabs
        isFilled
        activeKey={activeTabKey}
        onSelect={handleTabClick}
        isBox={true}
        aria-label="Tabs in the filled example"
        role="region"
      >


        <Tab eventKey={0} title={<TabTitleText>UseCase Selections</TabTitleText>} aria-label="Tabs filled example content users">
          <UsecaseSelection setEndTimeArray={setEndTimeArray} endTimeArray={endTimeArray} setSREdata={setSREdata} SREdata={SREdata} setChartData={setChartData} chartData={chartData}/>
        </Tab>

        <Tab eventKey={1} title={<TabTitleText>Recommendations</TabTitleText>}>
          <RecommendationTables setEndTimeArray={setEndTimeArray} endTimeArray={endTimeArray} setSREdata={setSREdata} SREdata={SREdata} />
        </Tab>

        <Tab eventKey={2} title={<TabTitleText>Charts</TabTitleText>}>
          <LineChart setEndTimeArray={setEndTimeArray} endTimeArray={endTimeArray} setSREdata={setSREdata} SREdata={SREdata} setChartData={setChartData} chartData={chartData} />
        </Tab>
      </Tabs>

    </PageSection>
  )
};

export { SREAnalytics };
