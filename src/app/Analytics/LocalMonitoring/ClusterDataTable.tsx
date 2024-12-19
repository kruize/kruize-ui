import {
  OverflowMenu,
  OverflowMenuContent,
  OverflowMenuGroup,
  OverflowMenuItem,
  PageSection,
  PageSectionVariants,
  TextContent,
  Tooltip,
  TooltipPosition
} from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getClusterMetadataURL } from '@app/CentralConfig';
import { PlusIcon } from '@patternfly/react-icons';

import { getClusterMetaData } from '@actions/DataSourceActionCreator';
import { useDispatch, useSelector } from 'react-redux';

interface LocationState {
  cluster: string;
  datasource: string;
}

interface Container {
  container_name: string;
  container_image_name: string;
}

interface Workload {
  workload_name: string;
  workload_type: string;
  containers: Record<string, Container>;
}

interface Namespace {
  namespace: string;
  workloads?: Record<string, Workload>;
}

interface ClusterDetails {
  cluster_name: string;
  namespaces: Record<string, Namespace>;
}



interface TableData {
  containerName: string;
  projectName: string;
  workloadName: string;
  workloadType: string;
  clusterName: string;
  containerImageName: string;

}

/*
  This page contains the Data for a selcted cluster the contianer name, nsp name, workload details etc.
  it take up user selected data from previous pages via the location state
  calls api with user selected datasource and cluster name. Then processes the data in the extractTableData
  function, converts it in a way that the patternfly component wants and that tabledata is passed to patternfly table.
  For each container name an Action item is avaliable which uses link to pass user selected data to another page. 

*/

interface ClusterDataTableProps {
  dataSourceName: string;
  clusterName: string;
}

const ClusterDataTable: React.FC<ClusterDataTableProps>  = ({ dataSourceName, clusterName }) => {
  const dispatch = useDispatch()
  const dataSource: any = useSelector<any>(state => state.dataSource)
 

  useEffect(() => {
    ( async () => 
      await dispatch(getClusterMetaData(dataSourceName, clusterName)) 
  )()
}, [dispatch]);

  let clusterDetials: ClusterDetails | undefined;
  if(dataSource.clusterMetaData.hasOwnProperty(`${dataSourceName}-${clusterName}`)){
    clusterDetials = dataSource.clusterMetaData[`${dataSourceName}-${clusterName}`]
  }

  function extractTableData(clusterDetails: ClusterDetails): TableData[] {
    const tableData: TableData[] = [];
        for (const [namespaceName, namespace] of Object.entries(clusterDetails.namespaces)) {
          if (!namespace.workloads) continue;
          for (const [workloadName, workload] of Object.entries(namespace.workloads)) {
            if (!workload.containers) continue;
            for (const [_, container] of Object.entries(workload.containers)) {
              tableData.push({
                containerName: container.container_name,
                containerImageName: container.container_image_name,
                projectName: namespaceName,
                workloadName: workload.workload_name,
                workloadType: workload.workload_type,
                clusterName: clusterName
              });
            }
          }
    }

    return tableData;
  }

  const tableData: TableData[] | undefined = clusterDetials !== undefined ? extractTableData(clusterDetials): []

  return (
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>Cluster Specific Details</TextContent>
      <Table aria-label="Cluster Details" variant='compact' borders >
        <Thead>
          <Tr>
            <Th width={20} modifier="wrap">Container names</Th>
            <Th width={20} modifier="wrap">Project names</Th>
            <Th width={20} modifier="wrap">Workload names</Th>
            <Th width={20} modifier="wrap">Workload types</Th>
            <Th  modifier="wrap">Cluster names</Th>
            <Th  modifier="wrap" >Action</Th>     
            </Tr>
        </Thead>
        <Tbody>
          {tableData.map((row_data, index) => (
            <Tr key={index} {...(index % 2 === 0 && { isStriped: true })}>
              <Td  dataLabel="Container names">{row_data.containerName}</Td>
              <Td  dataLabel="Project names">{row_data.projectName}</Td>
              <Td  dataLabel="Workload names">{row_data.workloadName}</Td>
              <Td  dataLabel="Workload types">{row_data.workloadType}</Td>
              <Td  dataLabel="Cluster names">{row_data.clusterName}</Td>
              <Td  dataLabel="Actions" isActionCell>
               <OverflowMenu breakpoint="lg">
                  <OverflowMenuContent>
                    <OverflowMenuGroup groupType="button">
                      <OverflowMenuItem>
                        <Link
                          to={{
                            pathname: '/createexp',
                            state: {
                              containerName: row_data?.containerName,
                              projectName: row_data?.projectName,
                              workloadName: row_data?.workloadName,
                              workloadType: row_data?.workloadType,
                              clusterName: row_data?.clusterName,
                              containerImageName: row_data?.containerImageName,
                              datasourceName: dataSourceName
                            }
                          }}
                        >
                          <Tooltip content={<div>Create Experiment</div>} position={TooltipPosition.top}>
                            <PlusIcon />
                          </Tooltip>
                        </Link>
                      </OverflowMenuItem>
                    </OverflowMenuGroup>
                  </OverflowMenuContent>
                </OverflowMenu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </PageSection>
  );
};

export { ClusterDataTable };
