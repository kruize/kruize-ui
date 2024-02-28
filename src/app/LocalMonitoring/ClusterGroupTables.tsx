import { Button } from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useState } from 'react';

const ClusterGroupTables = (props: { clusterGroupData }) => {
  const rows = Object.entries(props.clusterGroupData.cluster_groups || {}).flatMap(([groupName, groupDetail]) => {
    const clusters = (groupDetail as any).clusters || {};
    return Object.keys(clusters).map((clusterKey) => ({
      groupName: groupName, 
      clusterName: clusters[clusterKey].cluster_name 
    }));
  });

  return (
    <React.Fragment>
      <Table aria-label="Data Sources Table">
        <Thead>
          <Tr>
            <Th>Cluster Group</Th>
            <Th>Cluster</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, index) => (
            <Tr key={index} {...(index % 2 === 0 && { isStriped: true })}>
              <Td dataLabel="Cluster Group">{row.groupName}</Td>
             <Td dataLabel="Cluster">
             <Button variant="link" component="a" href="#" isInline>
             {row.clusterName}
               
                </Button> </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </React.Fragment>
  );
};

export { ClusterGroupTables };
