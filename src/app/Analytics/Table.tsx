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
import { TextContent, TextVariants, Text, Accordion, AccordionContent, AccordionItem, AccordionToggle } from '@patternfly/react-core';
import { BalanceTable } from './User_Analytics/ContainerInfo/BalanceTable';
import { CostTable } from './User_Analytics/ContainerInfo/CostTable';
import { PerformanceTable } from './User_Analytics/ContainerInfo/PerformanceTable';
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
    const [expanded, setExpanded] = React.useState('');

    const onToggle = (id: string) => {
        if (id === expanded) {
            setExpanded('');
        } else {
            setExpanded(id);
        }
    };
    return (
        <>
            <TextContent>
                <Text component={TextVariants.h6}>Recommendations</Text>
            </TextContent>
            <Accordion asDefinitionList={false}>
                <AccordionItem>
                    <AccordionToggle
                        onClick={() => {
                            onToggle('ex-toggle1');
                        }}
                        isExpanded={expanded === 'ex-toggle1'}
                        id="ex-toggle1"
                    >
                        <TextContent>
                            <Text component={TextVariants.h6}>Short Term</Text>
                        </TextContent>
                    </AccordionToggle>
                    <AccordionContent id="ex-expand1" isHidden={expanded !== 'ex-toggle1'}>
                        <CostTable />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem>
                    <AccordionToggle
                        onClick={() => {
                            onToggle('ex-toggle2');
                        }}
                        isExpanded={expanded === 'ex-toggle2'}
                        id="ex-toggle2"
                    >
                        <TextContent>
                            <Text component={TextVariants.h6}>Medium Term</Text>
                        </TextContent>
                    </AccordionToggle>
                    <AccordionContent id="ex-expand2" isHidden={expanded !== 'ex-toggle2'}>
                        <BalanceTable />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem>
                    <AccordionToggle
                        onClick={() => {
                            onToggle('ex-toggle3');
                        }}
                        isExpanded={expanded === 'ex-toggle3'}
                        id="ex-toggle3"
                    ><TextContent>
                            <Text component={TextVariants.h6}>Long Term</Text>
                        </TextContent>

                    </AccordionToggle>
                    <AccordionContent id="ex-expand3" isHidden={expanded !== 'ex-toggle3'}>
                        <PerformanceTable />
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </>
    )

}

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

function DetailedRecommendationsTable() {
    throw new Error('Function not implemented.');
}
