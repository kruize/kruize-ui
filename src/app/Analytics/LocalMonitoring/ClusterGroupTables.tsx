import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDatasourceMetadataURL } from '@app/CentralConfig';
import {Link} from 'react-router-dom';

interface LocationState {
  datasources: string; // Adjust the type according to the actual data you expect
}

const ClusterGroupTables = (props: { clusterGroupData }) => {
  const [clusterSpecificData, setClusterSpecificData] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [datsourcesData, setDatasourcesData] = useState([]);

  // fetching the ds name via react-router-dom
  const location = useLocation<LocationState>(); 
  const datasources = location.state?.datasources;
  // console.log(datasources);

  // calling get api with parameter ds
  const fetchDatasources = async () => {
    const response = await fetch(getDatasourceMetadataURL(datasources));
    const data = await response.json();
    setDatasourcesData(data);
    // console.log(data);

  };



  useEffect(() => {
    try {
      fetchDatasources();
    } catch {
      console.log('Datasources get URL not working');
    }
  }, []);




  // console.log(datsourcesData?.cluster_groups)
  const cluster_row_data = Object.entries(datsourcesData?.cluster_groups || {}).flatMap(
    ([groupName, groupDetail]) => {
      const clusters = (groupDetail as any).clusters || {};
      return Object.keys(clusters).map((clusterKey) => ({
        groupName: groupName,
        clusterName: clusters[clusterKey].cluster_name
      }));
    }
  );

  const clusterDataFunction = (clusterGroupName: string, clusterName: string) => {
    const clusterSpec = datasourcesData?.cluster_groups[clusterGroupName].clusters[clusterName];
    setClusterSpecificData(clusterSpec);
    // console.log(clusterGroupsData.cluster_groups[clusterGroupName])
    // console.log(clusterSpec)
    setShowComponent(true);
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
                <Link to={{
                        pathname: '/cluster',
                        state: {
                          datasource: datasources , 
                          cluster: row.clusterName}
                      }}>   {row.clusterName}
                      </Link>
                      
              </Td>
            </Tr>
          ))}
        </Tbody>
        </Table>
        <br />
        <br />
        {/* {showComponent && <ClusterDataTable clusterSpecificData={clusterSpecificData}/>} */}
      </React.Fragment>
    </PageSection>
  );
};

export { ClusterGroupTables };
