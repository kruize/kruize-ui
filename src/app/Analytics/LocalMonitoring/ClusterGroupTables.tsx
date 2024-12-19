import { Button, OverflowMenu, OverflowMenuContent, OverflowMenuGroup, OverflowMenuItem, PageSection, PageSectionVariants, Tooltip, TooltipPosition } from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useEffect, useState } from 'react';
import { ClusterDataTable } from './ClusterDataTable';
import { saveSelectedClusterName } from '@reducers/DataSourceReducers';
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from '@patternfly/react-icons';
import { Link } from 'react-router-dom';
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
    dispatch(saveSelectedClusterName({ selectedClusterName: clusterName }))
  };

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Table aria-label="Data Sources Table">
        <Thead>
          <Tr>
            <Th width={45}>Datasource Name</Th>
            <Th width={45}>Cluster</Th>
            <Th width={20}>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clusterRowData.map((row, index) => (
            <Tr key={index} {...(index % 2 === 0 && { isStriped: true })}>
              <Td dataLabel="Datasource">{row.groupName}</Td>
              <Td dataLabel="Cluster">
                <Button variant="link" isInline onClick={() => handleButtonClick(row.clusterName)}>
                  {row.clusterName}
                </Button></Td>
              <Td dataLabel='Actions' isActionCell>
                <Link
                  to={{
                    pathname: '/createbulkexp',
                    state: {
                      datasourceName: dataSourceName
                    }
                  }}>
                <Tooltip content={<div>Create Bulk Experiment</div>} position={TooltipPosition.top}>
                  <PlusIcon />
                </Tooltip>
              </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {selectedClusterName.length > 0 && <ClusterDataTable dataSourceName={dataSourceName} clusterName={selectedClusterName} />}
    </PageSection>
  )
};

export { ClusterGroupTables };
