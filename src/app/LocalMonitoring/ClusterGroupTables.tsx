import { Button } from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useState } from 'react';
import { ClusterDataTable } from './ClusterDataTable';

const ClusterGroupTables = (props: { clusterGroupData }) => {
  const clusterGroupsData = props.clusterGroupData;
  const [clusterSpecificData, setClusterSpecificData] = useState([]);
  const [showComponent, setShowComponent] = useState(false);


  const cluster_row_data = Object.entries(clusterGroupsData.cluster_groups || {}).flatMap(
    ([groupName, groupDetail]) => {
      const clusters = (groupDetail as any).clusters || {};
      return Object.keys(clusters).map((clusterKey) => ({
        groupName: groupName,
        clusterName: clusters[clusterKey].cluster_name
      }));
    }
  );

  const clusterDataFunction = (clusterGroupName: string, clusterName: string) => {
    const clusterSpec = clusterGroupsData.cluster_groups[clusterGroupName].clusters[clusterName];
    setClusterSpecificData(clusterSpec);
    setShowComponent(true);
  };

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
          {cluster_row_data.map((row, index) => (
            <Tr key={index} {...(index % 2 === 0 && { isStriped: true })}>
              <Td dataLabel="Cluster Group">{row.groupName}</Td>
              <Td dataLabel="Cluster">
                <Button variant="link" onClick={() => clusterDataFunction(row.groupName, row.clusterName)} isInline>
                  {row.clusterName}
                </Button>{' '}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <br/><br/>
      {showComponent && <ClusterDataTable clusterSpecificData={clusterSpecificData}/>}
    </React.Fragment>
  );
};

export { ClusterGroupTables };
