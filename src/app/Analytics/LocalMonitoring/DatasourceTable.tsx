import { Button, OverflowMenu, OverflowMenuContent, OverflowMenuGroup, OverflowMenuItem } from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useState } from 'react';
import { importDataSourcesMetadataURL } from '@app/CentralConfig';
import { ClusterGroupTables } from './ClusterGroupTables';
/*

  This is the Datasources table which gets display, takes data from fetchDS api call
  it also represents the data in an expandable row  and has an import metadata button 
  which calls import metadata api and redirects user to the next page, this redirection 
  is does with the help of Link tag and its state property to pass data across pages


*/

const DatasourceTable = (props: { fetchDatasourcesData }) => {
  const [clusterGroupData, setClusteGroupData] = useState<any>();
  const [expandedRows, setExpandedRows] = useState({});
  const [buttonStatus, setButtonStatus] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [dsname, setdsname] = useState('');

  const handleImportMetadata = async (dataSourceName: string) => {
    setButtonStatus(true);
    setdsname(dataSourceName);
    const payload = {
      version: 'v1.0',
      datasource_name: dataSourceName
    };
    try {
      const response = await fetch(importDataSourcesMetadataURL(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setClusteGroupData(data);
      setIsComponentVisible(true);
    } catch (error) {
      console.error('Error during data import:', error);
    }
    setButtonStatus(false);
  };

  const toggleRowExpanded = (index) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <React.Fragment>
        <Table aria-label="Data Sources Table">
          <Thead>
            <Tr>
              <Th aria-label="Select" /> 
              <Th>DataSource Name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.fetchDatasourcesData?.datasources && props.fetchDatasourcesData.datasources.map((source, index) => (
              <Tr key={index} {...(index % 2 === 0 && { isStriped: true })}>
                <Td
                  expand={{
                    rowIndex: index,
                    isExpanded: !!expandedRows[index],
                    onToggle: () => toggleRowExpanded(index)
                  }}
                />
                <Td dataLabel="DataSource Name">
                  <div>{clusterGroupData ? source.name : source.name}</div>
                  {expandedRows[index] && (
                    <div style={{ paddingTop: '10px', fontSize: 'smaller' }}>
                      URL: {source.url} <br />
                      Service Name: {source.serviceName}
                      <br />
                      Namespace: {source.namespace}
                      <br />
                      Provider: {source.provider}
                    </div>
                  )}
                </Td>
                <Td isActionCell>
                  <OverflowMenu breakpoint="lg">
                    <OverflowMenuContent>
                      <OverflowMenuGroup groupType="button">
                        <OverflowMenuItem>
                          <Button
                            variant="primary"
                            isDisabled={buttonStatus}
                            onClick={() => handleImportMetadata(source.name)}
                          >
                            Import Metadata{' '}
                          </Button>
                        </OverflowMenuItem>
                      </OverflowMenuGroup>
                    </OverflowMenuContent>
                  </OverflowMenu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {isComponentVisible && <ClusterGroupTables clusterGroupData={clusterGroupData} dsname={dsname} />}
    </React.Fragment>
  );
};

export { DatasourceTable };
