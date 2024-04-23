import {
  Button,
  OverflowMenu,
  OverflowMenuContent,
  OverflowMenuGroup,
  OverflowMenuItem,
  TextContent,
  Text,
  TextVariants
} from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import { Table, Thead, Tr, Th, Tbody, Td, ExpandableRowContent } from '@patternfly/react-table';
import React, { useState } from 'react';
import { ClusterGroupTables } from './ClusterGroupTables';
import { importDataSourcesMetadataURL } from '@app/CentralConfig';

const DatasourceTable = (props: { fetchDatasourcesData }) => {
  const [clusterGroupData, setClusteGroupData] = useState<any>();
  const [expandedRows, setExpandedRows] = useState({});
  const [buttonStatus, setButtonStatus] = useState(false);

  const handleImportMetadata = async (dataSourceName: string) => {
    setButtonStatus(true);

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
      <Text component={TextVariants.h3}>Data Sources</Text>
      <div style={{ width: '800px' }}>
        <Table aria-label="Data Sources Table">
          <Thead>
            <Tr>
              <Th />
              <Th>DataSource Name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.fetchDatasourcesData.datasources.map((source, index) => (
              <Tr key={index}>
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
                          <Link
                            to={{
                              pathname: '/datasources',
                              state: { datasources: source.name }
                            }}
                          >
                            <Button
                              variant="primary"
                              isDisabled={buttonStatus}
                              onClick={() => handleImportMetadata(source.name)}
                            >
                              Import Metadata{' '}
                            </Button>
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
      </div>
      <br /> <br />
    </React.Fragment>
  );
};

export { DatasourceTable };
