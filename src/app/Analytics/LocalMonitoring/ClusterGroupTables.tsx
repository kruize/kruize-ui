import { Button, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useEffect, useState } from 'react';
import { ClusterDataTable } from './ClusterDataTable';
import { saveSelectedClusterName } from '@reducers/DataSourceReducers';
import { useDispatch, useSelector } from 'react-redux';
interface DatasourceDetail {
  clusters: { [key: string]: { cluster_name: string } };
}

interface Datasources {
  [key: string]: DatasourceDetail;
}

interface LocationState {
  datasources: string;
}

/* 
  This page has all the cluster groups for selected datasource
  calls get api with parameter datasource name and a same link to redirect info to next page /cluster

*/

const ClusterGroupTables = ({ clusterGroupData, dataSourceName }) => {
  const dispatch = useDispatch()
  const dataSourceSelector: any = useSelector<any>(state => state.dataSource)
  const [selectedClusterName, setSelectedClusterName] = useState<string>(dataSourceSelector.selectedClusterName || "");

  let clusterRowData: any = [];
  if (typeof clusterGroupData === 'object' && clusterGroupData !== null) {
    if (clusterGroupData.hasOwnProperty(dataSourceName)) {
        const clustersData = clusterGroupData[dataSourceName].clusters;
        clusterRowData = Object.keys(clustersData).map(clusterKey => ({
          groupName: dataSourceName,
          clusterName: clustersData[clusterKey].cluster_name
        }))
    }
  }

  useEffect(() => {
    setSelectedClusterName(dataSourceSelector.selectedClusterName)
  }, [dataSourceSelector.selectedClusterName])

  const handleButtonClick = (clusterName: string) => {
    dispatch(saveSelectedClusterName({selectedClusterName: clusterName}))
  };

  return (
    <PageSection variant={PageSectionVariants.light}>
      <React.Fragment>
        <Table aria-label="Data Sources Table">
          <Thead>
            <Tr>
              <Th>Datasource Name</Th>
              <Th>Cluster</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clusterRowData.map((row, index) => (
              <Tr key={index} {...(index % 2 === 0 && { isStriped: true })}>
                <Td dataLabel="Cluster Group">{row.groupName}</Td>
                <Td dataLabel="Cluster">
                  <Button variant="link" isInline onClick={() => handleButtonClick(row.clusterName)}>
                    {row.clusterName}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {selectedClusterName.length > 0  && <ClusterDataTable dataSourceName={dataSourceName} clusterName={selectedClusterName} />}
      </React.Fragment>
    </PageSection>
  )
};

export { ClusterGroupTables };
