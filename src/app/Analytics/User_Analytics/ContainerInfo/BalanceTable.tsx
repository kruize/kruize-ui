import React from 'react';
import { ToggleGroup, ToggleGroupItem, ToggleGroupItemProps } from '@patternfly/react-core';
import { TableComposable, Caption, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

interface Repository {
    monitoringStartTime: string | null;
    monitoringEndTime: string | null;
    podCount: string | null;
    confidenceLevel: string | null;
    capacityConfigmmr: string | null;
    capacityConfigcpu: string | null;
}

type ExampleType = 'default' | 'compact' | 'compactBorderless';

const BalanceTable = () => {
    // In real usage, this data would come from some external source like an API via props.
    const recommendations: Repository[] = [
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0', capacityConfigmmr: '4 cores', capacityConfigcpu: '100 MiB' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0', capacityConfigmmr: '4 cores', capacityConfigcpu: '100 MiB' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0', capacityConfigmmr: '4 cores', capacityConfigcpu: '100 MiB' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0', capacityConfigmmr: '4 cores', capacityConfigcpu: '100 MiB' },
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
        <TableComposable aria-label="Simple table"  >
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
            <Tbody >
                {recommendations.map(recommendation => (
                    <Tr key={recommendation.monitoringStartTime} >
                        <Td dataLabel={columnNames.monitoringStartTime}>{recommendation.monitoringStartTime}</Td>
                        <Td dataLabel={columnNames.monitoringEndTime}>{recommendation.monitoringEndTime}</Td>
                        <Td dataLabel={columnNames.capacityConfigmmr}>{recommendation.capacityConfigmmr}</Td>
                        <Td dataLabel={columnNames.capacityConfigcpu}>{recommendation.capacityConfigcpu}</Td>
                        <Td dataLabel={columnNames.podCount}>{recommendation.podCount}</Td>
                        <Td dataLabel={columnNames.confidenceLevel}>{recommendation.confidenceLevel}</Td>
                    </Tr>
                ))}
            </Tbody>
        </TableComposable>
    );
};

export { BalanceTable };
