import React from 'react';
import { Grid, GridItem,  } from '@patternfly/react-core';
import { Table /* data-codemods */, Thead, Tr, Th, Tbody, Td,  } from '@patternfly/react-table';
import { VerticalSlider } from './VerticalSlider';

interface Repository {
  monitoringStartTime: string | null;
  monitoringEndTime: string | null;
  podCount: string | null;
  confidenceLevel: string | null;
  capacityConfigmmr: string | null;
  capacityConfigcpu: string | null;
}

type ExampleType = 'default' | 'compact' | 'compactBorderless';

const CostTable = () => {
  // In real usage, this data would come from some external source like an API via props.
  const recommendations: Repository[] = [
    {
      monitoringStartTime: 'jan 01, 2023, 5:53:40 PM',
      monitoringEndTime: 'jan 02, 2023, 12:24:04 AM',
      podCount: '4 cores',
      confidenceLevel: '100 MiB',
      capacityConfigmmr: '0',
      capacityConfigcpu: '0'
    },
    {
      monitoringStartTime: 'jan 01, 2023, 5:53:40 PM',
      monitoringEndTime: 'jan 02, 2023, 12:24:04 AM',
      podCount: '4 cores',
      confidenceLevel: '100 MiB',
      capacityConfigmmr: '0',
      capacityConfigcpu: '0'
    },
    {
      monitoringStartTime: 'jan 01, 2023, 5:53:40 PM',
      monitoringEndTime: 'jan 02, 2023, 12:24:04 AM',
      podCount: '4 cores',
      confidenceLevel: '100 MiB',
      capacityConfigmmr: '0',
      capacityConfigcpu: '0'
    },
    {
      monitoringStartTime: 'jan 01, 2023, 5:53:40 PM',
      monitoringEndTime: 'jan 02, 2023, 12:24:04 AM',
      podCount: '4 cores',
      confidenceLevel: '100 MiB',
      capacityConfigmmr: '0',
      capacityConfigcpu: '0'
    },
    {
      monitoringStartTime: 'jan 01, 2023, 5:53:40 PM',
      monitoringEndTime: 'jan 02, 2023, 12:24:04 AM',
      podCount: '4 cores',
      confidenceLevel: '100 MiB',
      capacityConfigmmr: '0',
      capacityConfigcpu: '0'
    },
    {
      monitoringStartTime: 'jan 01, 2023, 5:53:40 PM',
      monitoringEndTime: 'jan 02, 2023, 12:24:04 AM',
      podCount: '4 cores',
      confidenceLevel: '100 MiB',
      capacityConfigmmr: '0',
      capacityConfigcpu: '0'
    },
    {
      monitoringStartTime: 'jan 01, 2023, 5:53:40 PM',
      monitoringEndTime: 'jan 02, 2023, 12:24:04 AM',
      podCount: '4 cores',
      confidenceLevel: '100 MiB',
      capacityConfigmmr: '0',
      capacityConfigcpu: '0'
    },
    {
      monitoringStartTime: 'jan 01, 2023, 5:53:40 PM',
      monitoringEndTime: 'jan 02, 2023, 12:24:04 AM',
      podCount: '4 cores',
      confidenceLevel: '100 MiB',
      capacityConfigmmr: '0',
      capacityConfigcpu: '0'
    },
    {
      monitoringStartTime: 'jan 01, 2023, 5:53:40 PM',
      monitoringEndTime: 'jan 02, 2023, 12:24:04 AM',
      podCount: '4 cores',
      confidenceLevel: '100 MiB',
      capacityConfigmmr: '0',
      capacityConfigcpu: '0'
    },
    {
      monitoringStartTime: 'jan 01, 2023, 5:53:40 PM',
      monitoringEndTime: 'jan 02, 2023, 12:24:04 AM',
      podCount: '4 cores',
      confidenceLevel: '100 MiB',
      capacityConfigmmr: '0',
      capacityConfigcpu: '0'
    },
    {
      monitoringStartTime: 'jan 01, 2023, 5:53:40 PM',
      monitoringEndTime: 'jan 02, 2023, 12:24:04 AM',
      podCount: '4 cores',
      confidenceLevel: '100 MiB',
      capacityConfigmmr: '0',
      capacityConfigcpu: '0'
    },
    {
      monitoringStartTime: 'jan 01, 2023, 5:53:40 PM',
      monitoringEndTime: 'jan 02, 2023, 12:24:04 AM',
      podCount: '4 cores',
      confidenceLevel: '100 MiB',
      capacityConfigmmr: '0',
      capacityConfigcpu: '0'
    }
  ];

  const columnNames = {
    monitoringStartTime: 'Monitoring Start Time',
    monitoringEndTime: 'Monitoring End Time',
    podCount: 'Pods Count',
    confidenceLevel: 'Confidence Level',
    capacityConfigmmr: 'Memory Request',
    capacityConfigcpu: 'CPU Request'
  };

  return (
    <Grid hasGutter>
      <GridItem span={1} rowSpan={3}>
        <VerticalSlider />
      </GridItem>
      <GridItem span={11} rowSpan={2}>
        <Table aria-label="Simple table" variant="compact" gridBreakPoint="" isStickyHeader>
          <Thead>
            <Tr>
              <Th>{columnNames.monitoringStartTime}</Th>
              <Th>{columnNames.monitoringEndTime}</Th>
              <Th>{columnNames.capacityConfigcpu}</Th>
              <Th>{columnNames.capacityConfigmmr}</Th>
              <Th>{columnNames.podCount}</Th>
              <Th>{columnNames.confidenceLevel}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recommendations.map((recommendation, index) => (
              <Tr key={index}>
                <Td dataLabel={columnNames.monitoringStartTime}>{recommendation.monitoringStartTime}</Td>
                <Td dataLabel={columnNames.monitoringEndTime}>{recommendation.monitoringEndTime}</Td>
                <Td dataLabel={columnNames.podCount}>{recommendation.podCount}</Td>
                <Td dataLabel={columnNames.confidenceLevel}>{recommendation.confidenceLevel}</Td>
                <Td dataLabel={columnNames.capacityConfigmmr}>{recommendation.capacityConfigmmr}</Td>
                <Td dataLabel={columnNames.capacityConfigcpu}>{recommendation.capacityConfigcpu}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </GridItem>
    </Grid>
  );
};

export { CostTable };
