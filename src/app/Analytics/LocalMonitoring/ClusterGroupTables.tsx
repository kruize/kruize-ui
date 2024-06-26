import { Button, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDatasourceMetadataURL } from '@app/CentralConfig';
import { Link } from 'react-router-dom';
import { ClusterDataTable } from './ClusterDataTable';
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

const ClusterGroupTables = (props: { clusterGroupData; dsname }) => {
  const [clusterSpecificData, setClusterSpecificData] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [datasourcesData, setDatasourcesData] = useState<Datasources | null>(null);
  const [showClusterTable, setShowClusterTable] = useState(false);
  const [selectedClusterName, setSelectedClusterName] = useState<string | null>(null);

  const datasource_name = props.dsname;

  // calling get api with parameter ds
  const fetchDatasources = async () => {
    const response = await fetch(getDatasourceMetadataURL(datasource_name));
    const data = await response.json();
    setDatasourcesData(data);
  };

  useEffect(() => {
    try {
      fetchDatasources();
    } catch {
      console.log('Datasources get URL not working');
    }
  }, []);

  const cluster_row_data = Object.entries(datasourcesData?.datasources || {}).flatMap(([groupName, groupDetail]) => {
    const clusters = (groupDetail as any).clusters || {};
    return Object.keys(clusters).map((clusterKey) => ({
      groupName: groupName,
      clusterName: clusters[clusterKey].cluster_name
    }));
  });

  const handleButtonClick = (clusterName: string) => {
    setSelectedClusterName(clusterName);
    setShowClusterTable(true);
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
            {cluster_row_data.map((row, index) => (
              <Tr key={index} {...(index % 2 === 0 && { isStriped: true })}>
                <Td dataLabel="Cluster Group">{row.groupName}</Td>
                <Td dataLabel="Cluster">
                  <Button variant="link" isInline onClick={() => handleButtonClick(row.clusterName)}>
                    {' '}
                    {row.clusterName}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {showClusterTable && <ClusterDataTable datasource={datasource_name} clustername={selectedClusterName} />}
      </React.Fragment>
    </PageSection>
  )
};

export { ClusterGroupTables };
