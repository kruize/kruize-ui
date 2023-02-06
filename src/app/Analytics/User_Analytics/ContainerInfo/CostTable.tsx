import React from 'react';
import { Grid, GridItem, ToggleGroup, ToggleGroupItem, ToggleGroupItemProps } from '@patternfly/react-core';
import { TableComposable, Caption, Thead, Tr, Th, Tbody, Td, InnerScrollContainer } from '@patternfly/react-table';
import { VerticalSlider } from './VerticalSlider';

interface Repository {
    monitoringStartTime: string | null;
    monitoringEndTime: string | null;
    podCount: string | null;
    confidenceLevel: string | null;
    maxConfigmmr: string | null;
    maxConfigcpu: string | null;
    capacityConfigmmr: string | null;
    capacityConfigcpu: string | null;
}

type ExampleType = 'default' | 'compact' | 'compactBorderless';

const CostTable = () => {
    // In real usage, this data would come from some external source like an API via props.
    const recommendations: Repository[] = [
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '0', maxConfigcpu: '0', capacityConfigmmr: '0', capacityConfigcpu: '0' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '0', maxConfigcpu: '0', capacityConfigmmr: '0', capacityConfigcpu: '0' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '0', maxConfigcpu: '0', capacityConfigmmr: '0', capacityConfigcpu: '0' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '0', maxConfigcpu: '0', capacityConfigmmr: '0', capacityConfigcpu: '0' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '0', maxConfigcpu: '0', capacityConfigmmr: '0', capacityConfigcpu: '0' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '0', maxConfigcpu: '0', capacityConfigmmr: '0', capacityConfigcpu: '0' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '0', maxConfigcpu: '0', capacityConfigmmr: '0', capacityConfigcpu: '0' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '0', maxConfigcpu: '0', capacityConfigmmr: '0', capacityConfigcpu: '0' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '0', maxConfigcpu: '0', capacityConfigmmr: '0', capacityConfigcpu: '0' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '0', maxConfigcpu: '0', capacityConfigmmr: '0', capacityConfigcpu: '0' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '0', maxConfigcpu: '0', capacityConfigmmr: '0', capacityConfigcpu: '0' },
        { monitoringStartTime: 'jan 01, 2023, 5:53:40 PM', monitoringEndTime: 'jan 02, 2023, 12:24:04 AM', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '0', maxConfigcpu: '0', capacityConfigmmr: '0', capacityConfigcpu: '0' },

    ];

    const columnNames = {
        monitoringStartTime: 'Start Time',
        monitoringEndTime: 'End Time',
        podCount: 'Pods Count',
        confidenceLevel: 'Confidence Level',
        maxConfigmmr: 'Max',
        maxConfigcpu: 'Max',
        capacityConfigmmr: 'Capacity',
        capacityConfigcpu: 'Capacity'
    };

    return (
        <Grid hasGutter>

            <GridItem span={1} rowSpan={3}>
                <VerticalSlider />
            </GridItem>
            <GridItem span={11} rowSpan={2}>
                <InnerScrollContainer>

                    <TableComposable aria-label="Simple table" variant="compact" gridBreakPoint="" isStickyHeader>
                        <Thead hasNestedHeader>
                            <Tr aria-hidden="true">
                                <Td colSpan={9}></Td>
                            </Tr>
                            <Tr>
                                <Th hasRightBorder colSpan={2}>
                                    Monitoring
                                </Th>
                                <Th hasRightBorder colSpan={2}>
                                    CPU
                                </Th>
                                <Th hasRightBorder colSpan={2}>
                                    Memory
                                </Th>
                                <Th modifier="fitContent" hasRightBorder colSpan={1}>
                                    Pods Count
                                </Th>
                                <Th modifier="fitContent" hasRightBorder colSpan={1}>
                                    Confidence Level
                                </Th>
                            </Tr>
                            <Tr >
                                <Th>{columnNames.monitoringStartTime}</Th>
                                <Th>{columnNames.monitoringEndTime}</Th>
                                <Th>{columnNames.capacityConfigcpu}</Th>
                                <Th>{columnNames.maxConfigcpu}</Th>
                                <Th>{columnNames.capacityConfigmmr}</Th>
                                <Th>{columnNames.maxConfigmmr}</Th>
                            </Tr>
                            <Tr isBorderRow aria-hidden="true">
                                <Td colSpan={9}></Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {recommendations.map(recommendation => (
                                <Tr key={recommendation.monitoringStartTime}>
                                    <Td dataLabel={columnNames.monitoringStartTime}>{recommendation.monitoringStartTime}</Td>
                                    <Td dataLabel={columnNames.monitoringEndTime}>{recommendation.monitoringEndTime}</Td>
                                    <Td dataLabel={columnNames.podCount}>{recommendation.podCount}</Td>
                                    <Td dataLabel={columnNames.confidenceLevel}>{recommendation.confidenceLevel}</Td>
                                    <Td dataLabel={columnNames.maxConfigmmr}>{recommendation.maxConfigmmr}</Td>
                                    <Td dataLabel={columnNames.maxConfigcpu}>{recommendation.maxConfigcpu}</Td>
                                    <Td dataLabel={columnNames.capacityConfigmmr}>{recommendation.capacityConfigmmr}</Td>
                                    <Td dataLabel={columnNames.capacityConfigcpu}>{recommendation.capacityConfigcpu}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </TableComposable>
                </InnerScrollContainer>

            </GridItem>
        </Grid>
    );
};

export { CostTable };
