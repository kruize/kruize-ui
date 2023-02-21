/* eslint-disable no-console */
import React from 'react';
import {
    TableComposable,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    ExpandableRowContent,
    ActionsColumn,
    IAction
} from '@patternfly/react-table';
import { TextContent, TextVariants, Text } from '@patternfly/react-core';

interface Repository {
    srno: string;
    experimentname: string;
    namespace: string;
    deployment: string;
    status: string;
    nestedComponent?: React.ReactNode;
    noPadding?: boolean;
}
interface NestedRepository {
    monitoringStartTime: string | null;
    monitoringEndTime: string | null;
    podCount: string | null;
    confidenceLevel: string | null;
    maxConfigmmr: string | null;
    maxConfigcpu: string | null;
    capacityConfigmmr: string | null;
    capacityConfigcpu: string | null;
}

const NestedReposTable = () => {
    // In real usage, this data would come from some external source like an API via props.
    const recommendations: NestedRepository[] = [
        { monitoringStartTime: '2022-01-22T18:25:43.511Z', monitoringEndTime: '2022-01-23T18:25:43.511Z', podCount: '4', confidenceLevel: '0.0', maxConfigmmr: '128.8', maxConfigcpu: '8.0', capacityConfigmmr: '100', capacityConfigcpu: '4.0' },
        { monitoringStartTime: '2022-01-16T18:25:43.511Z', monitoringEndTime: '2022-01-23T18:25:43.511Z', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '128.8', maxConfigcpu: '8.8', capacityConfigmmr: '1000', capacityConfigcpu: '8.8' },
        { monitoringStartTime: '2022-01-08T18:25:43.511Z', monitoringEndTime: '2022-01-23T18:25:43.511Z', podCount: '0', confidenceLevel: '0.0', maxConfigmmr: '128.8', maxConfigcpu: '8.0', capacityConfigmmr: '100', capacityConfigcpu: '8.0' }
    ];

    const columnNames = {
        monitoringStartTime: 'Monitoring Start Time',
        monitoringEndTime: 'Monitoring End Time',
        podCount: 'Pods Count',
        confidenceLevel: 'Confidence Level',
        maxConfigmmr: 'Memory Max',
        maxConfigcpu: 'CPU Max',
        capacityConfigmmr: 'Memory Capacity',
        capacityConfigcpu: 'CPU Capacity'
    };

    return (
        <> <TextContent>
            <Text component={TextVariants.h3}>Recommendations</Text>
        </TextContent>
            <br />
            <TableComposable aria-label="Simple table" variant="compact">
                <Thead>
                    <Tr>
                        <Th>{columnNames.monitoringStartTime}</Th>
                        <Th>{columnNames.monitoringEndTime}</Th>
                        <Th>{columnNames.podCount}</Th>
                        <Th>{columnNames.confidenceLevel}</Th>
                        <Th>{columnNames.maxConfigmmr}</Th>
                        <Th>{columnNames.maxConfigcpu}</Th>
                        <Th>{columnNames.capacityConfigmmr}</Th>
                        <Th>{columnNames.capacityConfigcpu}</Th>
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
        </>
    );
};

const Table = () => {
    // In real usage, this data would come from some external source like an API via props.
    const repositories: Repository[] = [
        { srno: '1', experimentname: 'quarkus-resteasy-autotune-min-http-response-time-db4', namespace: 'default', deployment: 'tfb-qrh-sample', status: 'active', nestedComponent: <NestedReposTable /> },
        { srno: '2', experimentname: 'quarkus-resteasy-kruize-min-http-response-time-db_3', namespace: 'default_3', deployment: 'tfb-qrh-sample_3', status: 'active' },
        {
            srno: '3',
            experimentname: 'quarkus-resteasy-kruize-min-http-response-time-db_0',
            namespace: 'default_0',
            deployment: 'tfb-qrh-sample_0',
            status: 'active',
            nestedComponent: (
                <p>
                    Loading Recommendations...
                </p>
            )

        },
        {
            srno: '4',
            experimentname: 'quarkus-resteasy-kruize-min-http-response-time-db_5',
            namespace: 'default_5',
            deployment: 'tfb-qrh-sample_5',
            status: 'active',
            nestedComponent: 'Loading Recommendations...'

        }
    ];

    const columnNames = {
        srno: 'Sr. No.',
        experimentname: 'Experiment Name',
        namespace: 'Namespace',
        deployment: 'Deployments',
        status: 'Status'
    };
    // In this example, expanded rows are tracked by the repo names from each row. This could be any unique identifier.
    // This is to prevent state from being based on row order index in case we later add sorting.
    // Note that this behavior is very similar to selection state.
    const initialExpandedRepoNames = repositories.filter(repo => !!repo.nestedComponent).map(repo => repo.srno); // Default to all expanded
    const [expandedRepoNames, setExpandedRepoNames] = React.useState<string[]>(initialExpandedRepoNames);
    const setRepoExpanded = (repo: Repository, isExpanding = true) =>
        setExpandedRepoNames(prevExpanded => {
            const otherExpandedRepoNames = prevExpanded.filter(r => r !== repo.srno);
            return isExpanding ? [...otherExpandedRepoNames, repo.srno] : otherExpandedRepoNames;
        });
    const isRepoExpanded = (repo: Repository) => expandedRepoNames.includes(repo.srno);
    return (
        <TableComposable aria-label="Simple table">
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
            {repositories.map((repo, rowIndex) => (
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
        </TableComposable>
    );
};

export { Table }