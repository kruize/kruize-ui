import {
  Button,
  Dropdown,
  DropdownList,
  MenuToggle,
  OverflowMenu,
  OverflowMenuContent,
  OverflowMenuControl,
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
import { PlusIcon, BlueprintIcon } from '@patternfly/react-icons';
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

interface Cluster {
  cluster_name: string;
  namespaces: Record<string, Namespace>;
}

interface ClusterGroup {
  datasource_name: string;
  clusters: Record<string, Cluster>;
}

interface ApiData {
  datasources: Record<string, ClusterGroup>;
}

interface TableData {
  containerName: string;
  projectName: string;
  workloadName: string;
  workloadType: string;
  clusterName: string;
  containerImageName: string;
}

const ClusterDataTable = (props: { clusterSpecificData }) => {
  const [clusterData, setClusterData] = useState([]);
  const [namespaceData, setNamespaceData] = useState([]);

  // fetching the ds name via react-router-dom
  const location = useLocation<LocationState>();
  const datasource = location.state?.datasource;
  const cluster = location.state?.cluster;

  const fetchCluster = async () => {
    const response = await fetch(getClusterMetadataURL(datasource, cluster));
    const data = await response.json();
    setClusterData(data);
    setNamespaceData(data.datasources[datasource].clusters[cluster]);
  };

  useEffect(() => {
    try {
      fetchCluster();
    } catch {
      console.log('Clusters get URL not working');
    }
  }, []);

  function extractTableData(apiData: ApiData): TableData[] {
    const tableData: TableData[] = [];

    if (apiData && apiData.datasources) {
      for (const clusterGroup of Object.values(apiData.datasources)) {
        for (const cluster of Object.values(clusterGroup.clusters)) {
          for (const [namespaceName, namespace] of Object.entries(cluster.namespaces)) {
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
                  clusterName: cluster.cluster_name
                });
              }
            }
          }
        }
      }
    }

    return tableData;
  }

  const tableData = extractTableData(clusterData);

  return (
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>Cluster Specific Details</TextContent>
      <Table aria-label="Cluster Details" variant='compact'>
        <Thead>
          <Tr>
            <Th>Container names</Th>
            <Th>Project names</Th>
            <Th>Workload names</Th>
            <Th>Workload types</Th>
            <Th>Cluster names</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((row_data, index) => (
            <Tr key={index} {...(index % 2 === 0 && { isStriped: true })}>
              <Td dataLabel="Container names">{row_data.containerName}</Td>
              <Td dataLabel="Project names">{row_data.projectName}</Td>
              <Td dataLabel="Workload names">{row_data.workloadName}</Td>
              <Td dataLabel="Workload types">{row_data.workloadType}</Td>
              <Td dataLabel="Cluster names">{row_data.clusterName}</Td>
              {/* <Td dataLabel="Container image names">{row_data.containerImageName}</Td> */}
              <Td isActionCell>
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
                              datasourceName: location.state.datasource
                            }
                          }}
                        >
                          <Tooltip content={<div>Create Experiment</div>} position={TooltipPosition.top}>
                            <PlusIcon />
                          </Tooltip>
                        </Link>
                      </OverflowMenuItem>
                      <OverflowMenuItem>
                        <Tooltip content={<div> List Recommendation</div>} position={TooltipPosition.top}>
                          <BlueprintIcon color='#0066CC' />
                        </Tooltip>
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
