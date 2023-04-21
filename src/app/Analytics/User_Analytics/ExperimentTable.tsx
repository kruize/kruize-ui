import React, { useState } from 'react';
import { TableComposable, Thead, Tr, Th, Tbody, Td, ThProps } from '@patternfly/react-table';
import {
    Toolbar,
    ToolbarContent,
    ToolbarItem,
    OptionsMenu,
    OptionsMenuItemGroup,
    OptionsMenuItem,
    OptionsMenuSeparator,
    OptionsMenuToggle
} from '@patternfly/react-core';
import SortAmountDownIcon from '@patternfly/react-icons/dist/esm/icons/sort-amount-down-icon';

interface Repository {
    experimentName: string;
    containerName: string;
}

const ExperimentTable = () => {
    // In real usage, this data would come from some external source like an API via props.
    const repositories: Repository[] = [
        { experimentName: 'quarkus-resteasy-autotune-min-http-response-time-db4', containerName: 'tfb-server-1' },
        { experimentName: 'quarkus-resteasy-autotune-min-http-response-time-db4', containerName: 'tfb-server-0' },
        { experimentName: 'p', containerName: 'two' }
    ];

    const columnNames = {
        experimentName: 'Experiment Name',
        containerName: 'Container Name',

    };

    // Index of the currently sorted column
    // Note: if you intend to make columns reorderable, you may instead want to use a non-numeric key
    // as the identifier of the sorted column. See the "Compound expandable" example.
    const [activeSortIndex, setActiveSortIndex] = React.useState<number | null>(null);

    // Sort direction of the currently sorted column
    const [activeSortDirection, setActiveSortDirection] = React.useState<'asc' | 'desc' | null>(null);

    // Sort dropdown expansion
    const [isSortDropdownOpen, setIsSortDropdownOpen] = React.useState(false);

    // Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
    // This example is trivial since our data objects just contain strings, but if the data was more complex
    // this would be a place to return simplified string or number versions of each column to sort by.
    const getSortableRowValues = (repo: Repository): (string | number)[] => {
        const { experimentName, containerName } = repo;
        return [experimentName, containerName];
    };

    // Note that we perform the sort as part of the component's render logic and not in onSort.
    // We shouldn't store the list of data in state because we don't want to have to sync that with props.
    let sortedRepositories = repositories;
    if (activeSortIndex !== null) {
        sortedRepositories = repositories.sort((a, b) => {
            const aValue = getSortableRowValues(a)[activeSortIndex];
            const bValue = getSortableRowValues(b)[activeSortIndex];
            if (typeof aValue === 'number') {
                // Numeric sort
                if (activeSortDirection === 'asc') {
                    return (aValue as number) - (bValue as number);
                }
                return (bValue as number) - (aValue as number);
            } else {
                // String sort
                if (activeSortDirection === 'asc') {
                    return (aValue as string).localeCompare(bValue as string);
                }
                return (bValue as string).localeCompare(aValue as string);
            }
        });
    }

    const getSortParams = (columnIndex: number): ThProps['sort'] => ({
        sortBy: {
            index: activeSortIndex,
            direction: activeSortDirection
        },
        onSort: (_event, index, direction) => {
            setActiveSortIndex(index);
            setActiveSortDirection(direction);
        },
        columnIndex
    });
    const [selectedExperimentName, setSelectedExperimentName] = useState('');


    return (
        <React.Fragment>
            <Toolbar id="toolbar">
                <ToolbarContent>
                    <ToolbarItem>
                        <OptionsMenu
                            id="options-menu-multiple-options-example"
                            menuItems={[
                                <OptionsMenuItemGroup key="first group" aria-label="Sort column">
                                    {Object.values(columnNames).map((columnName, columnIndex) => (
                                        <OptionsMenuItem
                                            key={columnName}
                                            isSelected={activeSortIndex === columnIndex}
                                            onSelect={() => {
                                                setActiveSortIndex(columnIndex);
                                                setActiveSortDirection(activeSortDirection !== null ? activeSortDirection : 'asc');
                                            }}
                                        >
                                            {columnName}
                                        </OptionsMenuItem>
                                    ))}
                                </OptionsMenuItemGroup>,
                                <OptionsMenuSeparator key="separator" />,
                                <OptionsMenuItemGroup key="second group" aria-label="Sort direction">
                                    <OptionsMenuItem
                                        onSelect={() => setActiveSortDirection('asc')}
                                        isSelected={activeSortDirection === 'asc'}
                                        id="ascending"
                                        key="ascending"
                                    >
                                        Ascending
                                    </OptionsMenuItem>
                                    <OptionsMenuItem
                                        onSelect={() => setActiveSortDirection('desc')}
                                        isSelected={activeSortDirection === 'desc'}
                                        id="descending"
                                        key="descending"
                                    >
                                        Descending
                                    </OptionsMenuItem>
                                </OptionsMenuItemGroup>
                            ]}
                            isOpen={isSortDropdownOpen}
                            toggle={
                                <OptionsMenuToggle
                                    hideCaret
                                    onToggle={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                                    toggleTemplate={<SortAmountDownIcon />}
                                />
                            }
                            isPlain
                            isGrouped
                        />
                    </ToolbarItem>
                </ToolbarContent>
            </Toolbar>
            <TableComposable aria-label="Sortable table custom toolbar">
                <Thead>
                    <Tr>
                        <Th sort={getSortParams(0)}>{columnNames.experimentName}</Th>
                        <Th sort={getSortParams(1)}>{columnNames.containerName}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {sortedRepositories.map((repo, rowIndex) => (
                        <Tr key={rowIndex}
                            onRowClick={() => setSelectedExperimentName(repo.experimentName)}
                            isSelectable
                            isHoverable
                            isRowSelected={selectedExperimentName === repo.experimentName}
                            >
                     
                            <Td dataLabel={columnNames.experimentName}>{repo.experimentName}</Td>
                            <Td dataLabel={columnNames.containerName}>{repo.containerName}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </TableComposable>
        </React.Fragment>
    );
};

export { ExperimentTable };
