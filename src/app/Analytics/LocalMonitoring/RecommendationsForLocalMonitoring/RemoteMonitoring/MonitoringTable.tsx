import React from 'react';
import { Thead, Tr, Th, Tbody, Td, ExpandableRowContent } from '@patternfly/react-table';
import { Table } from '@patternfly/react-table/deprecated';
import { Tab, Tabs, TabTitleText } from '@patternfly/react-core';

// Tables
interface Tables {
  srno: string;
  experimentname: string;
  namespace: string;
  deployment: string;
  status: string;
  nestedComponent?: React.ReactNode;
  noPadding?: boolean;
}
interface cpuColumns {
  cpuRequestSum: string | null;
  cpuRequestAvg: string | null;

  cpuLimitsSum: string | null;
  cpuLimitsAvg: string | null;

  cpuUsageSum: string | null;
  cpuUsageAvg: string | null;
  cpuUsageMin: string | null;
  cpuUsageMax: string | null;

  cpuThrottleSum: string | null;
  cpuThrottleAvg: string | null;
  cpuThrottleMax: string | null;
}
interface memoryColumns {
  memoryRequestSum: string | null;
  memoryRequestAvg: string | null;

  memoryLimitsSum: string | null;
  memoryLimitsAvg: string | null;

  memoryUsageSum: string | null;
  memoryUsageAvg: string | null;
  memoryUsageMin: string | null;
  memoryUsageMax: string | null;

  memoryThrottleSum: string | null;
  memoryThrottleAvg: string | null;
  memoryThrottleMax: string | null;
}

const CPUMetricsTable = () => {
  const cpuData: cpuColumns[] = [
    {
      cpuRequestSum: '16.11',
      cpuRequestAvg: '5.37',

      cpuLimitsSum: '24',
      cpuLimitsAvg: '8',

      cpuUsageSum: '9.24',
      cpuUsageAvg: '3.08',
      cpuUsageMin: '0.12',
      cpuUsageMax: '4.08',

      cpuThrottleSum: '0.00',
      cpuThrottleAvg: ' 4.18',
      cpuThrottleMax: ' 0.00'
    }
  ];

  const cpuColumns = {
    cpuRequestSum: 'Sum',
    cpuRequestAvg: 'Average',

    cpuLimitsSum: 'Sum',
    cpuLimitsAvg: 'Average',

    cpuUsageSum: 'Sum',
    cpuUsageAvg: 'Average',
    cpuUsageMin: 'Min',
    cpuUsageMax: 'Max',

    cpuThrottleSum: 'Sum',
    cpuThrottleAvg: 'Average',
    cpuThrottleMax: 'Max'
  };
  return (
    <Table aria-label="cpu metrics table" gridBreakPoint="" isStickyHeader>
      <Thead hasNestedHeader>
        <Tr>
          <Th hasRightBorder colSpan={2}>
            CPU Request
          </Th>
          <Th hasRightBorder colSpan={2}>
            CPU Limits
          </Th>
          <Th hasRightBorder colSpan={4}>
            CPU Usage
          </Th>
          <Th hasRightBorder colSpan={3}>
            CPU Throttle
          </Th>
        </Tr>

        <Tr>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {cpuColumns.cpuRequestSum}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {cpuColumns.cpuRequestAvg}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {cpuColumns.cpuLimitsSum}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {cpuColumns.cpuLimitsAvg}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {cpuColumns.cpuUsageSum}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {cpuColumns.cpuUsageAvg}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {cpuColumns.cpuUsageMin}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {cpuColumns.cpuUsageMax}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {cpuColumns.cpuThrottleSum}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {cpuColumns.cpuThrottleAvg}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {cpuColumns.cpuThrottleMax}
          </Th>
        </Tr>
        <Tr isBorderRow aria-hidden="true">
          <Td colSpan={11}></Td>
        </Tr>
      </Thead>
      <Tbody>
        {cpuData.map((connection) => (
          <Tr key="CPU Request">
            <Td dataLabel={cpuColumns.cpuRequestSum}>{connection.cpuRequestSum}</Td>
            <Td dataLabel={cpuColumns.cpuRequestAvg}>{connection.cpuRequestAvg}</Td>
            <Td dataLabel={cpuColumns.cpuLimitsSum}>{connection.cpuLimitsSum}</Td>
            <Td dataLabel={cpuColumns.cpuLimitsAvg}>{connection.cpuLimitsAvg}</Td>
            <Td dataLabel={cpuColumns.cpuUsageSum}>{connection.cpuUsageSum}</Td>
            <Td dataLabel={cpuColumns.cpuUsageAvg}>{connection.cpuUsageAvg}</Td>
            <Td dataLabel={cpuColumns.cpuUsageMin}>{connection.cpuUsageMin}</Td>
            <Td dataLabel={cpuColumns.cpuUsageMax}>{connection.cpuUsageMax}</Td>
            <Td dataLabel={cpuColumns.cpuThrottleSum}>{connection.cpuThrottleSum}</Td>
            <Td dataLabel={cpuColumns.cpuThrottleAvg}>{connection.cpuThrottleAvg}</Td>
            <Td dataLabel={cpuColumns.cpuThrottleMax}>{connection.cpuThrottleMax}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
const MMRMetricsTable = () => {
  const memoryData: memoryColumns[] = [
    {
      memoryRequestSum: '16.11',
      memoryRequestAvg: '5.37',

      memoryLimitsSum: '24',
      memoryLimitsAvg: '8',

      memoryUsageSum: '9.24',
      memoryUsageAvg: '3.08',
      memoryUsageMin: '0.12',
      memoryUsageMax: '4.08',

      memoryThrottleSum: '0.00',
      memoryThrottleAvg: ' 4.18',
      memoryThrottleMax: ' 0.00'
    }
  ];

  const memoryColumns = {
    memoryRequestSum: 'Sum',
    memoryRequestAvg: 'Average',

    memoryLimitsSum: 'Sum',
    memoryLimitsAvg: 'Average',

    memoryUsageSum: 'Sum',
    memoryUsageAvg: 'Average',
    memoryUsageMin: 'Min',
    memoryUsageMax: 'Max',

    memoryThrottleSum: 'Sum',
    memoryThrottleAvg: 'Average',
    memoryThrottleMax: 'Max'
  };
  return (
    <Table aria-label="mmr metrics table 2" gridBreakPoint="" isStickyHeader>
      <Thead hasNestedHeader>
        <Tr>
          <Th hasRightBorder colSpan={2}>
            Memory Request
          </Th>
          <Th hasRightBorder colSpan={2}>
            Memory Limits
          </Th>
          <Th hasRightBorder colSpan={4}>
            Memory Usage
          </Th>
          <Th hasRightBorder colSpan={3}>
            Memory Throttle
          </Th>
        </Tr>

        <Tr>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {memoryColumns.memoryRequestSum}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {memoryColumns.memoryRequestAvg}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {memoryColumns.memoryLimitsSum}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {memoryColumns.memoryLimitsAvg}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {memoryColumns.memoryUsageSum}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {memoryColumns.memoryUsageAvg}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {memoryColumns.memoryUsageMin}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {memoryColumns.memoryUsageMax}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {memoryColumns.memoryThrottleSum}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {memoryColumns.memoryThrottleAvg}
          </Th>
          <Th isSubheader modifier="fitContent" hasRightBorder>
            {memoryColumns.memoryThrottleMax}
          </Th>
        </Tr>
        <Tr isBorderRow aria-hidden="true">
          <Td colSpan={11}></Td>
        </Tr>
      </Thead>
      <Tbody>
        {memoryData.map((connection) => (
          <Tr key="Memory Request">
            <Td dataLabel={memoryColumns.memoryRequestSum}>{connection.memoryRequestSum}</Td>
            <Td dataLabel={memoryColumns.memoryRequestAvg}>{connection.memoryRequestAvg}</Td>
            <Td dataLabel={memoryColumns.memoryLimitsSum}>{connection.memoryLimitsSum}</Td>
            <Td dataLabel={memoryColumns.memoryLimitsAvg}>{connection.memoryLimitsAvg}</Td>
            <Td dataLabel={memoryColumns.memoryUsageSum}>{connection.memoryUsageSum}</Td>
            <Td dataLabel={memoryColumns.memoryUsageAvg}>{connection.memoryUsageAvg}</Td>
            <Td dataLabel={memoryColumns.memoryUsageMin}>{connection.memoryUsageMin}</Td>
            <Td dataLabel={memoryColumns.memoryUsageMax}>{connection.memoryUsageMax}</Td>
            <Td dataLabel={memoryColumns.memoryThrottleSum}>{connection.memoryThrottleSum}</Td>
            <Td dataLabel={memoryColumns.memoryThrottleAvg}>{connection.memoryThrottleAvg}</Td>
            <Td dataLabel={memoryColumns.memoryThrottleMax}>{connection.memoryThrottleMax}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

const TabOptions = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  return (
    <>
      Monitoring Data
      <br />
      <Tabs
        isFilled
        activeKey={activeTabKey}
        onSelect={handleTabClick}
        isBox={true}
        aria-label="cpu mmr tabs"
        role="region"
        mountOnEnter
      >
        <Tab eventKey={0} title={<TabTitleText>CPU Container Metrics</TabTitleText>} aria-label="cpu tab">
          <br />
          {CPUMetricsTable()}
        </Tab>
        <Tab eventKey={1} title={<TabTitleText>Memory Container Metrics</TabTitleText>}>
          <br />
          {MMRMetricsTable()}
        </Tab>
      </Tabs>
    </>
  );
};

const MonitoringTable = () => {
  // In real usage, this data would come from some external source like an API via props.
  const tables: Tables[] = [
    {
      srno: '1',
      experimentname: 'quarkus-resteasy-autotune-min-http-response-time-db4',
      namespace: 'default',
      deployment: 'tfb-qrh-sample',
      status: 'active',
      nestedComponent: (
        <>
          <TabOptions />
        </>
      )
    },
    {
      srno: '2',
      experimentname: 'quarkus-resteasy-kruize-min-http-response-time-db_3',
      namespace: 'default_3',
      deployment: 'tfb-qrh-sample_3',
      status: 'active'
    },
    {
      srno: '3',
      experimentname: 'quarkus-resteasy-kruize-min-http-response-time-db_0',
      namespace: 'default_0',
      deployment: 'tfb-qrh-sample_0',
      status: 'active',
      nestedComponent: <p>Loading Monitoring Data...</p>
    },
    {
      srno: '4',
      experimentname: 'quarkus-resteasy-kruize-min-http-response-time-db_5',
      namespace: 'default_5',
      deployment: 'tfb-qrh-sample_5',
      status: 'active',
      nestedComponent: 'Loading Monitoring Data...'
    }
  ];

  const columnNames = {
    srno: 'Sr. No.',
    experimentname: 'Experiment Name',
    namespace: 'Namespace',
    deployment: 'Deployments',
    status: 'Status'
  };

  const initialExpandedRepoNames = tables.filter((repo) => !!repo.nestedComponent).map((repo) => repo.srno); // Default to all expanded
  const [expandedRepoNames, setExpandedRepoNames] = React.useState<string[]>(initialExpandedRepoNames);
  const setRepoExpanded = (repo: Tables, isExpanding = true) =>
    setExpandedRepoNames((prevExpanded) => {
      const otherExpandedRepoNames = prevExpanded.filter((r) => r !== repo.srno);
      return isExpanding ? [...otherExpandedRepoNames, repo.srno] : otherExpandedRepoNames;
    });
  const isRepoExpanded = (repo: Tables) => expandedRepoNames.includes(repo.srno);
  return (
    <>
      <Table aria-label="experiments table">
        <Thead>
          <Tr>
            <Td />
            <Th width={20}>{columnNames.srno}</Th>
            <Th>{columnNames.experimentname}</Th>
            <Th>{columnNames.namespace}</Th>
            <Th>{columnNames.deployment}</Th>
            <Th>{columnNames.status}</Th>
          </Tr>
        </Thead>
        {tables.map((repo, rowIndex) => (
          <Tbody key={repo.srno} isExpanded={isRepoExpanded(repo)}>
            <Tr>
              <Td
                expand={
                  repo.nestedComponent
                    ? {
                        rowIndex,
                        isExpanded: isRepoExpanded(repo),
                        onToggle: () => setRepoExpanded(repo, !isRepoExpanded(repo)),
                        expandId: 'composable-nested-table-expandable-example'
                      }
                    : undefined
                }
              />
              <Td dataLabel={columnNames.srno}>{repo.srno}</Td>
              <Td dataLabel={columnNames.experimentname}>{repo.experimentname}</Td>
              <Td dataLabel={columnNames.namespace}>{repo.namespace}</Td>
              <Td dataLabel={columnNames.deployment}>{repo.deployment}</Td>
              <Td dataLabel={columnNames.status}>{repo.status}</Td>
            </Tr>
            {repo.nestedComponent ? (
              <Tr isExpanded={isRepoExpanded(repo)}>
                <Td
                  noPadding={repo.noPadding}
                  dataLabel={`${columnNames.srno} expended`}
                  colSpan={Object.keys(columnNames).length + 1}
                >
                  <ExpandableRowContent>{repo.nestedComponent}</ExpandableRowContent>
                </Td>
              </Tr>
            ) : null}
          </Tbody>
        ))}
      </Table>
    </>
  );
};

export { MonitoringTable };
