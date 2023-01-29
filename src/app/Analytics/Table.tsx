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

const NestedReposTable: React.FunctionComponent = () => {
    // In real usage, this data would come from some external source like an API via props.
    const recommendations: NestedRepository[] = [
        { monitoringStartTime: 'Repository 1', monitoringEndTime: '25', podCount: '25', confidenceLevel: '5', maxConfigmmr: '2 days ago', maxConfigcpu: '2', capacityConfigmmr: '33', capacityConfigcpu: '44' },
        { monitoringStartTime: 'Repository 2', monitoringEndTime: '25', podCount: '25', confidenceLevel: '5', maxConfigmmr: '2 days ago', maxConfigcpu: '3', capacityConfigmmr: '33', capacityConfigcpu: '44' },
        { monitoringStartTime: 'Repository 3', monitoringEndTime: '25', podCount: '25', confidenceLevel: '5', maxConfigmmr: '2 days ago', maxConfigcpu: '4', capacityConfigmmr: '33', capacityConfigcpu: '44' },
        { monitoringStartTime: 'Repository 4', monitoringEndTime: '25', podCount: '25', confidenceLevel: '5', maxConfigmmr: '2 days ago', maxConfigcpu: '3', capacityConfigmmr: '33', capacityConfigcpu: '44' }
    ];

    const columnNames = {
        monitoringStartTime: 'Monitoring Start Time',
        monitoringEndTime: 'Monitoring End Time',
        podCount: 'Pods Count',
        confidenceLevel: 'Confidence Level',
        maxConfigmmr: 'Max Config MMR',
        maxConfigcpu: 'Max Config CPU',
        capacityConfigmmr: 'Capacity Config MMR',
        capacityConfigcpu: 'Capacity Config CPU'
    };

    return (
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
    );
};

const Table = () => {
    // In real usage, this data would come from some external source like an API via props.
    const repositories: Repository[] = [
        { srno: '1', experimentname: 'Exp_no_01', namespace: 'default', deployment: 'tfb-database', status: 'failed', nestedComponent: <NestedReposTable /> },
        { srno: '2', experimentname: 'Exp_no_02', namespace: 'monitoring', deployment: 'autotune', status: 'active' },
        {
            srno: '3',
            experimentname: 'Exp_no_03',
            namespace: 'Kube system',
            deployment: 'coredns',
            status: 'active',
            nestedComponent: (
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                </p>
            )

        },
        {
            srno: '4',
            experimentname: 'Exp_no_4',
            namespace: 'Kube-public',
            deployment: '-',
            status: 'active',
            nestedComponent: 'Expandable row content has no padding.'

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