import { TextContent, OverflowMenu, OverflowMenuContent, OverflowMenuGroup, OverflowMenuItem, Button } from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useState } from 'react';

const ClusterDataTable = (props: { clusterGroupData }) => {
    return(
        <React.Fragment>    
         <TextContent> Cluster Table</TextContent>
      <Table aria-label="Cluster Table">
        <Thead>
          <Tr>
            <Th>Cluster Name</Th>
            <Th>Namespace</Th>
            <Th>Workloads</Th>
            <Th>Containers</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
   <Tbody>
          {props.fetchDatasourcesData.datasources.map((source, index) => (
            <Tr key={index}>
              <Td dataLabel="Cluster Name">{source.name}</Td>
              <Td dataLabel="Namespace">{source.provider}</Td>
              <Td dataLabel="Workloads">{source.serviceName}</Td>
              <Td dataLabel="Containers">{source.namespace}</Td>
              <Td isActionCell>
              <OverflowMenu breakpoint="lg">
                  <OverflowMenuContent>
                    <OverflowMenuGroup groupType="button">
                      <OverflowMenuItem>
                        <Button variant="secondary">Create Experiment</Button>
                      </OverflowMenuItem>
                      <OverflowMenuItem>
                        <Button variant="secondary" isDisabled>View Experiment</Button>
                      </OverflowMenuItem>
                      </OverflowMenuGroup>
                      </OverflowMenuContent>
                      </OverflowMenu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </React.Fragment>
    )
};

export { ClusterDataTable };
