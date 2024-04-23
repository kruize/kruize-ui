import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDatasourceMetadataURL } from '@app/CentralConfig';
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

const ClusterGroupTables = (props: { clusterGroupData }) => {
  const [clusterSpecificData, setClusterSpecificData] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [datasourcesData, setDatasourcesData] = useState<Datasources | null>(null);

  // fetching the ds name via react-router-dom
  const location = useLocation<LocationState>();
  const datasource_name = location.state?.datasources;

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

  const cluster_row_data = Object.entries(datasourcesData?.datasources || {}).flatMap(
    ([groupName, groupDetail]) => {
    const clusters = (groupDetail as any).clusters || {};
    return Object.keys(clusters).map((clusterKey) => ({
      groupName: groupName,
      clusterName: clusters[clusterKey].cluster_name
    }));
    }
  );

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
                  <Link
                    to={{
                      pathname: '/cluster',
                      state: {
                        datasource: datasource_name,
                        cluster: row.clusterName
                      }
                    }}
                  >
                    {' '}
                    {row.clusterName}
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <br />
        <br />
      </React.Fragment>
    </PageSection>
  );
};

export { ClusterGroupTables };
